import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SystemsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return `This action returns all systems`;
  }

  async findSystemHierarchy(id: string) {
    const system = await this.prisma.systems.findUnique({
      where: { system_id: id },
      include: {
        axes: {
          include: {
            criteria: {
              include: {
                questions: {
                  include: {
                    question_options: {
                      include: {
                        options: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!system) {
      throw new NotFoundException({
        message: `System id ${id} not found`,
        status: 404,
      });
    }

    return system;
  }
}
