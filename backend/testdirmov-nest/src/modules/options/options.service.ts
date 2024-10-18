import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.options.findMany();
  }

  async findOne(id: string) {
    const option = await this.prisma.options.findUnique({
      where: { option_id: id },
    });
    if(!option){
      throw new NotFoundException(`Option with id ${id} not found`)
    }
    return option;
  }
}
