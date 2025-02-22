import { ArgumentMetadata, Injectable, PipeTransform, NotFoundException } from "@nestjs/common";
import { TwittsService } from "src/twitts/twitts.service";

@Injectable()
export class TwittByIdPipe implements PipeTransform {
  constructor(private readonly twittsService: TwittsService) {}

  async transform(twittId: string, metadata: ArgumentMetadata) {
    const twitt = await this.twittsService.findOne(twittId);

    if (!twitt) {
      throw new NotFoundException(`Twitt with ID ${twittId} not found`);
    }

    return twitt;
  }
}