import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AuthDocument = HydratedDocument<Auth>

@Schema({ collection: 'Auth', timestamps: true })
export class Auth {
  @Prop()
  fullName: string

  @Prop()
  email: string

  @Prop()
  bio: string

  @Prop()
  password: string

  @Prop()
  token: string
}

export const AuthSchema = SchemaFactory.createForClass(Auth)