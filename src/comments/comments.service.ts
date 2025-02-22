import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
import { Commentaries } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Twitt } from 'src/twitts/entities/twitt.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Commentaries)
    private readonly commentRepository: Repository<Commentaries>,
  
    @InjectRepository(Twitt) // 👈 Inyecta el repositorio de Twitt
    private readonly twittRepository: Repository<Twitt>,
  ) {}
  async create(createCommentDto: CreateCommentDto, user: User, twittId: string) {
    try {
      // Busca el tweet al que se asociará el comentario
      const twitt = await this.twittRepository.findOneBy({ twitt_id: twittId });
  
      if (!twitt) throw new NotFoundException(`Twitt with id ${twittId} not found`);
  
      // Crea el comentario con el tweet y el usuario
      const comment = this.commentRepository.create({
        ...createCommentDto,
        user,
        twitt, // Asigna el tweet
      });
  
      await this.commentRepository.save(comment);
      return comment;
  
    } catch (error) {
      throw new InternalServerErrorException('Error al crear comentario');
    }
  }
  

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;

    return this.commentRepository.find({
      take: limit,
      skip: offset
    })

  }

  async findOne(term:string) {
  
      let comment: Commentaries;
  
      if(isUUID(term)){
        comment = await this.commentRepository.findOneBy({comment_id:term})
      } else{
        const queryBuilder = this.commentRepository.createQueryBuilder('tw');
        comment = await queryBuilder
        .where(`content ILIKE :term`,{
          term: `%${term}%`
        }).getOne();
      }
  
      if (!comment) 
        throw new NotFoundException(`Twitt with id ${term} not found`)
      return comment;
    }
  
  async update(id: string, updateCommentDto: UpdateCommentDto, user: User) {

    const currentTimestamp: Date = new Date();
    const offset = 5; // Diferencia de +5 horas entre el sistema y PostgreSQL
    currentTimestamp.setHours(currentTimestamp.getHours() + offset);

    const comment = await this.commentRepository.preload({
      comment_id: id,
      EditedAt: currentTimestamp,
      ...updateCommentDto
    });

    if(!comment) throw new NotFoundException(`Twitt with id ${id} not found`);
    comment.user = user;
    try {
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new InternalServerErrorException('dominó2')
    }
  }

  async findCommentsByTwittId(twittId: string) {
    try {
      const comments = await this.commentRepository.find({
        where: { twitt: { twitt_id: twittId } },
        relations: ['user', 'twitt'], 
      });
  
      return comments;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener comentarios');
    }
  }
  async remove(id: string) {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);

  }
}
