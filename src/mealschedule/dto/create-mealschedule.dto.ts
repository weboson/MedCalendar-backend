//! Схема входящих данных
// какие поля ожидаются при создании графика приёма пищи, пример: {"weekday":[8,22],"weekend":[9,22]}

import { IsNotEmpty } from "class-validator";

export class CreateMealscheduleDto {

    @IsNotEmpty() // поле не должно быть пустым при отправке на сервер
    weekday: [] 

    @IsNotEmpty()
    weekend: []
}
