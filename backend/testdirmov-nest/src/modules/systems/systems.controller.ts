import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemsService } from './systems.service';


@Controller('systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

 

  @Get()
  findAll() {
    return this.systemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemsService.findSystemHierarchy(id);
  }

 
}
