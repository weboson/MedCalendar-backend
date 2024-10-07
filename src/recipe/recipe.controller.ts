import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard'; // наш гуард проверки авторство (сверка Mealschedule.user.id c текущим User.id)

@Controller('recipes') // http://localhost:3000/api/recipes
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  @Post()
  // сторож - если не пройти проверку, то дальше код не пойдет
  @UseGuards(JwtAuthGuard) // проверка на JWT-токен, есть ли он и действителен, т.е. авторизован ли user (в системе ли)
  @UsePipes(new ValidationPipe()) // class-validator - проверят на соответсвтие условие полей в create-recipe.dto.ts
  create(@Body() createRecipeDto: CreateRecipeDto, @Req() req) { // @Req() - это ответ сервера (поля id и email user-а ) на входящий валидный JWT-токен 
    return this.recipeService.create(createRecipeDto, +req.user.id);
  }

  //* данный формат Get('') должен быть после POST и перед пустым Get() - иначе Nest не пропускает (не дотягивается)
  // url/recipes/pagination?page=1&limit=3
  @Get('pagination')
  @UseGuards(JwtAuthGuard) // AuthorGuard - потому что нет type
  // декоратор @Query() позволяет получить параметры из URL (page и limit)
  findAllWithPagination(@Req() req, @Query('page') page: number = 1, @Query('limit') limit: number = 3) { // =1, =3 это значения по-умолчанию
    return this.recipeService.findAllWithPagination(+req.user.id, +page, +limit)
  }

  @UseGuards(JwtAuthGuard) // AuthorGuard - потому что нет type
  @Get()
  findAll(@Req() req) {
    return this.recipeService.findAll(+req.user.id); // все рецепты, которые создал текущий user
  }

  // url/recipes/recipe/1
  @Get(':type/:id') // type = может быть любым словом (это как переменная) - просто в AuthorGuard есть switch на 'recipe' или 'mealschedule'
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }
  // url/recipes/recipe/1
  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) { //UpdateRecipeDto extends CreateRecipeDto
    return this.recipeService.update(+id, updateRecipeDto);
  }
  // url/recipes/recipe/1
  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
