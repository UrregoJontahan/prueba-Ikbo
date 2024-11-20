import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; 
import { Product } from 'src/domain/entity/product.entity';
import { productInterfacePortOut } from 'src/domain/ports/out/product.interface.portOut';
import { MongoProductMapper } from './mongo/mapper/mongo.product.mapper';
import { MongoProduct } from './mongo/entity/products.entity.repository'; // Importamos el tipo MongoProductDocument

@Injectable()
export class ProductRepository implements productInterfacePortOut {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<MongoProduct>,
  ) {}

  async saveProduct(product: Product): Promise<Product> {
    const mongoEntity = MongoProductMapper.toMongoEntity(product);
    const createdProduct = new this.productModel(mongoEntity);
    const saveProduct = await createdProduct.save();
    return MongoProductMapper.toDomain(saveProduct);
  }

  async findProductById(id: string): Promise<Product> {
    const mongoProduct = await this.productModel.findById(id).exec();
    
    if (!mongoProduct) throw new Error('Producto no encontrado.');

    return MongoProductMapper.toDomain(mongoProduct);
  }

  async getProducts(): Promise<Product[]> { 
    const mongoProducts = await this.productModel.find().exec();
    return mongoProducts.map(MongoProductMapper.toDomain);
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    const mongoEntity = MongoProductMapper.toMongoEntity(product);
    const updatedMongoProduct = await this.productModel.findByIdAndUpdate(id, mongoEntity, { new: true }).exec();
    
    if (!updatedMongoProduct) throw new Error('Producto no encontrado');
    
    return MongoProductMapper.toDomain(updatedMongoProduct);
  }
}
