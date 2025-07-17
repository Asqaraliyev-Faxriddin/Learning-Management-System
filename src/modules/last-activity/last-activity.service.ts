import { Injectable } from '@nestjs/common';
import { CreateLastActivityDto } from './dto/create-last-activity.dto';
import { UpdateLastActivityDto } from './dto/update-last-activity.dto';

@Injectable()
export class LastActivityService {
  create(createLastActivityDto: CreateLastActivityDto) {
    return 'This action adds a new lastActivity';
  }

  findAll() {
    return `This action returns all lastActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lastActivity`;
  }

  update(id: number, updateLastActivityDto: UpdateLastActivityDto) {
    return `This action updates a #${id} lastActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} lastActivity`;
  }
}
