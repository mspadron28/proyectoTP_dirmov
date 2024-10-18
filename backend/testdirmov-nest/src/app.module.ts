import { Module } from '@nestjs/common';
import { OptionsModule } from './modules/options/options.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { QuestionsModule } from './modules/questions/questions.module';
@Module({
  imports: [OptionsModule, PrismaModule, QuestionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
