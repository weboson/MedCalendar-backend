import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity'; // таблица рецепт
import { Mealschedule } from 'src/mealschedule/entities/mealschedule.entity';
import { MealscheduleService } from 'src/mealschedule/mealschedule.service';

// Mealschedule и MealscheduleService нужны для использования "AuthorGuard"(server\src\guard\author.guard.ts) в server\src\recipe\recipe.controller.ts: https://youtu.be/N7mOLvEpGHU?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1132
@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Mealschedule])], // подключили таблицу (схему)
  controllers: [RecipeController],
  providers: [RecipeService, MealscheduleService],
})
export class RecipeModule {}
