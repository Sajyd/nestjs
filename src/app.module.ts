import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { UserModule } from './user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
    }),

    // feature module
    UserModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}