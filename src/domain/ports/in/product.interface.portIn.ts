import { Product } from "src/domain/entity/product.entity";

export interface ProductInterfacePortIn{
    create(product: Product): Promise<Product>
    getProductById(id: string): Promise<Product>
    getProducts(): Promise<Product[]>
    updateProduct(id: string, product: Product): Promise<Product>
}