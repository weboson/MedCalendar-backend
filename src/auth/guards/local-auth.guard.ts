import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // доп. lib: https://docs.nestjs.com/recipes/passport#implementing-passport-strategies

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}