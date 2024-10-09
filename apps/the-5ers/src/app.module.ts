import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FinancialsModule } from './financials/financials.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    FinancialsModule
  ],
})
export class AppModule { }
