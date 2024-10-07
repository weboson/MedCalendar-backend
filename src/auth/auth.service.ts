//! для ВОЙТИ: поиск на схожесть входящих email и password с полями в БД (сущесвтует ли данный user, который вводится в форму)
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2' // для расшифровки пароля (ведь мы его зашифровали в user.service)
import { JwtService } from '@nestjs/jwt'; // для JWT токена 
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  // https://docs.nestjs.com/recipes/passport 
  constructor(
    private userService: UserService,
    private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> { // используется в Guard "@UseGuards(LocalAuthGuard)" (server\src\auth\guards\local-auth.guard.ts) и сама логика (server\src\auth\strategies\local.strategy.ts)
    const user = await this.userService.findOne(email);
    // verify - расшифровывет и сравнивает на схожесть входящего проверяемого пароля с имеющимся в БД
    const passwordIsMatch = await argon2.verify(user.password, password)

    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Имя или пароль введены не верно');
  }

  // при удачном login - мы отправляем сгенерируемый JWT-ключ и поля id, email
  async login(user: IUser) {
    const { id, email } = user
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }), //* на основе полей - СОЗДАЕМ JWT-ключ
    };
  }

}
