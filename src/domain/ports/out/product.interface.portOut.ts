import { Product } from "src/domain/entity/product.entity";

export interface productInterfacePortOut{
    saveProduct(product: Product): Promise<Product>;
    findProductById(id: string): Promise<Product | null>;
    getProducts(): Promise<Product[]>;
    updateProduct(id: string, product:Product): Promise<Product>;
}