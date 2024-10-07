import { PartialType } from '@nestjs/mapped-types';
import { CreateMealscheduleDto } from './create-mealschedule.dto';

export class UpdateMealscheduleDto extends PartialType(CreateMealscheduleDto) {}
