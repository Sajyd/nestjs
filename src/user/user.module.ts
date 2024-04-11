import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'

@Module({
  imports: [
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
  providers: [UserService],
  controllers: [],
})
export class UserModule {}