import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.getConnectedUser(req.user.email); // The user object is attached by the guard
    }
}
