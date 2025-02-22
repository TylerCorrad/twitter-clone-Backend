import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Twitt } from 'src/twitts/entities/twitt.entity';

@Entity()
export class Retweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.retweets, { eager: true })
  user: User;

  @ManyToOne(() => Twitt, (twitt) => twitt.retweets, { eager: true })
  twitt: Twitt;
}