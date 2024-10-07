import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // ! для ВОЙТИ существуещему user (регистарция в server\src\user\user.service.ts)
  // код из https://docs.nestjs.com/recipes/passport#login-route
  // локальная стратегия Passport имеет имя по умолчанию «local». 
  // Мы ссылаемся на это имя в декораторе @UseGuards(AuthGuard('local')), чтобы связать его с кодом, предоставленным пакетом passport-local. 
  // если мы НЕ пройдем проверку у Guards, то НЕ сможем выполнить код дальше
  @UseGuards(LocalAuthGuard) //! валидация - проверка на существования user при 'войти' --- LocalAuthGuard содержит AuthGuard('local')  из lib 'passport'
  @Post('login') // на этот url: auth/login
  async login(@Request() req) {
    // return req.user;
    return this.authService.login(req.user); // id, email, JWT токен (ключ) 
  }

  // ! для проверки на АВТОРИЗИРОВАН ли user в системе (проверяется текущий токен в UserGuards)
  // чтобы в приложении было актуальное состояние авторизации user (то есть, при обновлении страницы авторизация не слетала)
  // фронт приложение при операциях, будет проверять состояние авторизации будем обращатся к роуту (http://localhost:3000/api/auth/profile) 
  // и  проверять в системе ли пользователь (и вообще есть у него действующий JWT-ключ)
  @UseGuards(JwtAuthGuard) //! JWT-guard (охранник) - при авторизации (быть в системе) нужно передать действующий токен
  @Get('profile') // на этот url: auth/profile
  getProfile(@Request() req) {
    return req.user; // id, email
  }
}
