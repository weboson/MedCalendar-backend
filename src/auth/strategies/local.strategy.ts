// стратегия проверки входных данных при авторизации (валидация): из гайда: https://docs.nestjs.com/recipes/passport#implementing-passport-local
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // присваиваем этому классу (LocalStrategy) весь constructor (и его свойства) от родителя "PassportStrategy"
  }

  async validate(email: string, password: string): Promise<any> {
    // validateUser() <= AuthService <= userService(findOne)
    // validateUser из PassportStrategy lib @nestjs/passport
    const user = await this.authService.validateUser(email, password); //! проверка на соответствие входных полей с полями в БД
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}