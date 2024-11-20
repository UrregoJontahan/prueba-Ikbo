import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controller/product.controller';
import { InventoryController } from './infrastructure/controller/inventory.controller';
import { ProductApplicationService } from './application/service/product.application.service';
import { InventoryApplicationService } from './application/service/inventory.application.service';
import { ProductServicesDomain } from './domain/service/product.service.domain';
import { InventoryDomainService } from './domain/service/inventory.service.domain';
import { ProductRepository } from './infrastructure/repository/product.repository';
import { InventoryRepository } from './infrastructure/repository/inventory.repository';
import { MongoProductSchema } from './infrastructure/repository/mongo/entity/products.entity.repository';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Ikbo-db-products'),
    MongooseModule.forFeature([{ name: 'Product', schema: MongoProductSchema }]),
  ],
  controllers: [ProductController, InventoryController],
  providers: [
    ProductApplicationService,
    InventoryApplicationService,
    { provide: 'productInterfacePortIn', useClass: ProductServicesDomain },
    { provide: 'inventoryInterfacePortIn', useClass: InventoryDomainService },
    {provide:'Product', useClass:ProductRepository},
    { provide: 'productInterfaceRepositoryPortOut', useClass: ProductRepository },
    { provide: 'inventoryInterfacePortOut', useClass: InventoryRepository },
  ],
})
export class AppModule {}

