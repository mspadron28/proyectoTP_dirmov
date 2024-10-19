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
      select: {
        name: true,  
        axes: {
          select: {
            name: true,  
            criteria: {
              select: {
                name: true,  
                questions: {
                  select: {
                    description: true, 
                    question_options: {
                      include: {
                        options: true
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
      throw new NotFoundException({ message: `System id ${id} not found`, status: 404 });
    }
  
    return system;
  }
  
}
