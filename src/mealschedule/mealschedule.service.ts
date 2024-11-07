// логика GET,POST и т.д для графика приёма пищи, пример: {"weekday":[8,22],"weekend":[9,22]}
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealscheduleDto } from './dto/create-mealschedule.dto';
import { UpdateMealscheduleDto } from './dto/update-mealschedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mealschedule } from './entities/mealschedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MealscheduleService {
  constructor(
    @InjectRepository(Mealschedule) // внедрить схему, для работы TypeORM с ней
    private mealscheduleRepository: Repository<Mealschedule>) { }

  //! POST (new Mealschedule)
  async create(createMealscheduleDto: CreateMealscheduleDto, id: number) {
    const isExist = await this.mealscheduleRepository.findBy({
      user: { id: id }, // есть ли такой рецепт у текущего user (чтобы не дублировать)
    })

    if (isExist.length) throw new BadRequestException('У вас уже есть график, вы можете его удалить или изменить')

    // если принятый график и его title уникален, то сохранить его со всеми полями :
    // createMealscheduleDto - уточнение входящих полей.
    const newMealschedule = {
      weekday: createMealscheduleDto.weekday,
      weekend: createMealscheduleDto.weekend,
      user: { id },// присвоить в колонку user == текущего user
      relations: { // связь с user
        user: true,
      },
    }
    return await this.mealscheduleRepository.save(newMealschedule); // сохранить в БД
  }

  //! GetAll - использую, так как данная таблица должна быть одной в БД (@OneByOne: MedCalendar-backend\src\mealschedule\entities\mealschedule.entity.ts)
  async findAll(id: number) { // все графики, которые имеют связь с текущим user (с его id)
    return await this.mealscheduleRepository.find({
      where: {
        user: { id: id }, // где столбец связи user.id == id
      },
      relations: { // связь с user (принадлежит текущему user)
        user: true,
      },
    })
  }

  // Get(id) - отказался от использования, т.к. нужно хранить id - при создании графика в LocalStorage, а он хранится только на одной машине
  // exemle: http://localhost:3000/api/mealschedules/mealschedule/80
  async findOne(id: number) {
    const mealscheduleOne = await this.mealscheduleRepository.findOne({    
      where: { id: id }, // Искать по id, т.е. где id в БД == api/mealschedules/:id
      relations: { // связь с user и recipes
        user: true,
        recipes: true,
      },
    })
    // если найден, то =>
    if (!mealscheduleOne) throw new NotFoundException('График питания не найден')
    return mealscheduleOne; 
  }

  //! PATCH(id)
  // exemle: http://localhost:3000/api/mealschedules/mealschedule/1
  async update(id: number, updateMealscheduleDto: UpdateMealscheduleDto) {
    const mealscheduleOne = await this.mealscheduleRepository.findOne({
      where: { id: id },
    })

    if (!mealscheduleOne) throw new NotFoundException('График питания не найден')

    return await this.mealscheduleRepository.update(id, updateMealscheduleDto); //update(id, поля которые принимаем)
  }

  //! DELETE
  async remove(id: number) {
    const mealscheduleOne = await this.mealscheduleRepository.findOne({
      where: { id: id },
    })

    if (!mealscheduleOne) throw new NotFoundException('График питания не найден')

    return await this.mealscheduleRepository.delete(id); 
  }
}
