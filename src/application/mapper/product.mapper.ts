import { Product } from '../../domain/entity/product.entity';
import { ProductDto } from '../dto/product.dto';

export class ProductMapper {
  static toDto(product: Product): ProductDto {
    return {
      name: product.name,
      description: product.description,
      category: product.category,
    };
  }

  static toEntity(productDto: ProductDto): Product {
    return new Product(
      '', 
      productDto.name,
      productDto.description,
      productDto.category,
    );
  }

  static toDtoArray(products: Product[]): ProductDto[] {
    return products.map(product => this.toDto(product));
  }
}
