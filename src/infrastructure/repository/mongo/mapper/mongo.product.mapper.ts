import { Product } from '../../../../domain/entity/product.entity';
import { MongoProduct } from '../entity/products.entity.repository';

export class MongoProductMapper {
  static toDomain(mongoProduct: MongoProduct): Product {
    const product = new Product(
      mongoProduct._id.toString(), 
      mongoProduct.name,
      mongoProduct.description,
      mongoProduct.category,
    );
    return product;
  }

  static toMongoEntity(product: Product) {
    return {
      name: product.getName(),
      description: product.getDescription(),
      category: product.getCategory(),
    };
  }
}
