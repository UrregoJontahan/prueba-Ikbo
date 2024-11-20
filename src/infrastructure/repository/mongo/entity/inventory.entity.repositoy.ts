import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MongoInventory extends Document {
  
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: Date })
  expiryDate: Date;
}

export const InventorySchema = SchemaFactory.createForClass(MongoInventory);
