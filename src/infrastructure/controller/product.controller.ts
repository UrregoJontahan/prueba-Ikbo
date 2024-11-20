import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProductDto } from "src/application/dto/product.dto";
import { ProductApplicationService } from "src/application/service/product.application.service";

@Controller("products")
export class ProductController {
    constructor( private readonly productApplicationService: ProductApplicationService ){};

    @Post()
    async create( @Body() productDto:ProductDto ): Promise<ProductDto>{
        return this.productApplicationService.create(productDto);
    }
    
    @Get()
    async getProducts(): Promise<ProductDto[]>{
        return this.productApplicationService.getProducts()
    }

    @Get(":id")
    async getProductById(@Param("id") id:string): Promise<ProductDto>{
        return this.productApplicationService.getProduct(id);
    }

    @Put(":id")
    async updatePorduct(@Param("id") id:string, @Body() productDto: ProductDto): Promise<ProductDto>{
        return this.productApplicationService.updateProduct(id, productDto);
    }
}