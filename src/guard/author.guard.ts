//! Проверка на авторство
// наш кастомный Guard - для проверки на авторство созданных данных (рецепты, графики)
// Чтобы один user не удалил / получил / изменил данные другого user, введя в url id=4 данных: http://localhost:3000/api/mealschedules/4
// Guard - это прослойка, которая если вернет true - то дальше код будет выполяться, если false - то код остановится.
import { Injectable, CanActivate, ExecutionContext, NotFoundException, BadRequestException } from '@nestjs/common';
import { MealscheduleService } from 'src/mealschedule/mealschedule.service';
import { RecipeService } from 'src/recipe/recipe.service';

// код - заготовка (нами изменный) из гайда: https://docs.nestjs.com/guards#authorization-guard 
@Injectable()
export class AuthorGuard implements CanActivate { // implements - наследования интерфейса (правил) в TypeScript: https://www.typescriptlang.org/docs/handbook/2/classes.html#class-heritage или в доке "Pet проект 2023-2024"

    constructor(
        //! прежде, чем внедрять сторонние сервисы, нужно подключить их и в их модулях
        private readonly recipeService: RecipeService, // чтобы иметь доступ к методам findAll/findOne/update/remove в recipe
        private readonly mealscheduleService: MealscheduleService // чтобы иметь доступ к методам findAll/findOne/update/remove в mealschedule
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // запрос получаем от context (nest)
        const request = context.switchToHttp().getRequest() // url/.../recipe or mealschedule/ id
        // type = recipe / mealschedule
        const { id, type } = request.params

        let entity
        //*1 существет запрашиваемая ли сущность
        switch (type) {
            case 'recipe':
                // существует ли такой рецепт под вводимым в url - id?
                entity = await this.recipeService.findOne(id)
                break;
            case 'mealschedule':
                // существует ли такой график под вводимым в url - id?
                entity = await this.mealscheduleService.findOne(id)
                break;
            default:
                throw new NotFoundException('Что-то пошло не так...')
        }
        //*2 авторизирован ли user
        const user = request.user
        //*3 и главное, совпадают ли user.id в таблице (recipe или mealschedule) с id текущего user?
        // теперь совместим эти 3 шага
        if (entity && user && entity.user.id == user.id) {
            return true
        }

        // вместо false
        throw new BadRequestException('Данный рецепт недоступен для Вас'); 
        // return false; 
    }
}
