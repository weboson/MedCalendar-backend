import { IsEmail, MinLength } from "class-validator"; // валидатор данных

// какие поля ожидаются при создании (POST) новой сущности (email: rishat@gmail.com)
export class CreateUserDto {
    @IsEmail() // валитор email
    email: string;

    @MinLength(4, {message: 'Пароль должен быть больше 4-х символов'}) // валидация на длинну строки, и если непройдет валидацию - будет сообщение
    password: string;
}
