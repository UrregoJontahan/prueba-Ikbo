import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // Decorador para indicar que esta clase será un esquema de Mongoose
export class MongoProduct extends Document {
  @Prop({ required: true }) // Define la propiedad 'name' como requerida
  name: string;

  @Prop({ required: true }) // Define la propiedad 'description' como requerida
  description: string;

  @Prop({ required: true }) // Define la propiedad 'category' como requerida
  category: string;
}

// Crea el esquema usando SchemaFactory
export const MongoProductSchema = SchemaFactory.createForClass(MongoProduct);
