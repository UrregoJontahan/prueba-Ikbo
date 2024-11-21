import { ProductDto } from "../dto/product.dto";
import { ProductMapper } from "../mapper/product.mapper";
import { Injectable, Inject } from "@nestjs/common";
import { productInterfacePortOut } from "../../domain/ports/out/product.interface.portOut";

@Injectable()
export class ProductApplicationService {
  constructor(
    @Inject('productInterfaceRepositoryPortOut') private readonly productInterfacePortOut: productInterfacePortOut
  ) {}

  async create(productDto: ProductDto): Promise<ProductDto> {
    const product = ProductMapper.toEntity(productDto);
    const createProduct = await this.productInterfacePortOut.saveProduct(product);
    return ProductMapper.toDto(createProduct);
  }

  async getProducts(): Promise<ProductDto[]> {
    const products = await this.productInterfacePortOut.getProducts();
    return ProductMapper.toDtoArray(products);
  }

  async getProduct(id: string): Promise<ProductDto> {
    const product = await this.productInterfacePortOut.findProductById(id);
    return ProductMapper.toDto(product);
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<ProductDto> {
    const product = ProductMapper.toEntity(productDto);
    const updateProduct = await this.productInterfacePortOut.updateProduct(id, product);
    return ProductMapper.toDto(updateProduct);
  }
}
