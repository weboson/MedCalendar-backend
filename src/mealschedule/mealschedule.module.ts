import { Module } from '@nestjs/common';
import { MealscheduleService } from './mealschedule.service';
import { MealscheduleController } from './mealschedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mealschedule } from './entities/mealschedule.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { RecipeService } from 'src/recipe/recipe.service';

// Recipe и RecipeService нужны для использования "AuthorGuard"(server\src\guard\author.guard.ts) в server\src\recipe\recipe.controller.ts: https://youtu.be/N7mOLvEpGHU?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1132
@Module({
  imports: [TypeOrmModule.forFeature([Mealschedule, Recipe])], // подключили таблицу (схему)
  controllers: [MealscheduleController],
  providers: [MealscheduleService, RecipeService],
})
export class MealscheduleModule {}
