import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // private, readonly это от TypeScript 

  // http://localhost:3000/ + [global prefix - api в server\src\main.ts]
  @Get() // Get-запрос по адресу в скобках, например: @Get('/rishat')
  getHello(): string { // метод, который отработает при get-запросе
    return this.appService.getHello(); // запустить метод класса
  }
}

// пример конструкции класса:
// const appService = new AppService()
// const a = new AppController(appService).getHello()

