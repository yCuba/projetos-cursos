import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Isso define que o endereço será localhost:3000/users
export class UserController {
  // Aqui "avisamos" ao controller que ele vai usar o serviço de usuários
  constructor(private readonly usersService: UsersService) {}

  @Get() // Define que quando alguém pedir dados (GET), essa função roda
  async getAllUsers() {
    // Chama a função findAll que criamos no nosso arquivo service
    return await this.usersService.findAll();
  }
}
