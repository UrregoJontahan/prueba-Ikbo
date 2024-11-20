import { Injectable, Inject } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { ProductInterfacePortIn } from "../ports/in/product.interface.portIn";
import { productInterfacePortOut } from "../ports/out/product.interface.portOut";

@Injectable()
export class ProductServicesDomain implements ProductInterfacePortIn {
    constructor( @Inject('productInterfaceRepositoryPortOut') private readonly productInterfacePortOut: productInterfacePortOut){}
    
    async getProducts(): Promise<Product[]> {
        return await this.productInterfacePortOut.getProducts()
    }
    
    //implementa el metodo de la interfaz de entrada para guardar el producto en la de salida.
    async create(product: Product): Promise<Product> {
       return await this.productInterfacePortOut.saveProduct(product);
    }

    async getProductById(id: string): Promise<Product> {
        return await this.productInterfacePortOut.findProductById(id);
    }

    async updateProduct(id: string, product: Product): Promise<Product> {
        return await this.productInterfacePortOut.updateProduct(id, product);
    }
    
}