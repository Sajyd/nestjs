import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose'
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { Auth, AuthSchema } from './auth.schema';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeatureAsync([
        { 
            name: User.name, 
            useFactory: () => {
                const schema = UserSchema;
                schema.plugin(require('mongoose-unique-validator'), { message: `Can't be duplicate` }); // or you can integrate it without the options   schema.plugin(require('mongoose-unique-validator')
                return schema;
              } 
        }
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    UserService,
  ],
  exports: [AuthService]
})
export class AuthModule {}