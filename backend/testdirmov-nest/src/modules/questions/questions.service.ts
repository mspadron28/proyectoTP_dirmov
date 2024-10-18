import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.questions.findMany();
  }

  async findQuestionWithOptions(id: string) {

    const info = await this.prisma.question_options.findMany({
      where: { question_id: id },
      include: {
        options: true,
        questions: {
          select: {
            description: true
          }
        }
      }
    });
    if(!info){
      throw new NotFoundException({message:`Question id ${id} not found`, status: 404})
    }
    return info;
  }
}
