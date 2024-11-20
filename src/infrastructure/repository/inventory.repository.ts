import { InventoryEntry } from "src/domain/entity/invnetory.entity";
import { Injectable } from "@nestjs/common";
import { InventoryInterfacePortOut } from "src/domain/ports/out/inventory.interface.portOut";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { MongoInventory } from "./mongo/entity/inventory.entity.repositoy";
import { MongoInventoryMapper } from "./mongo/mapper/mongo.inventory.mapper";


@Injectable()
export class InventoryRepository implements InventoryInterfacePortOut {
    constructor(
        @InjectModel('Inventory') private readonly inventoryModel: Model<MongoInventory>,
      ) {}

      async saveEntry(entry: InventoryEntry): Promise<InventoryEntry> {
        const mongoEntity = MongoInventoryMapper.toMongoEntity(entry);
        const createdEntry = new this.inventoryModel(mongoEntity);
        const savedEntry = await createdEntry.save();
    
        return MongoInventoryMapper.toDomain(savedEntry);
      }
    

    async findEntriesByProductId(id: string[]): Promise<InventoryEntry[]> {
        const mongoInventory = await this.inventoryModel.find({ productId: id }).exec(); 
    
        if (!mongoInventory || mongoInventory.length === 0) throw new Error('Producto no encontrado.');
    
        return mongoInventory.map(MongoInventoryMapper.toDomain);
    }
    
    
    async updateEntryQuantity(id: string, quantity: number): Promise<void> {
        const updatedMongoInventory = await this.inventoryModel.findByIdAndUpdate(
            id, 
            { $set: { quantity } },
            { new: false }
        ).exec();
    
        if (!updatedMongoInventory) throw new Error('Producto no encontrado');
        return; 
    }
    
}
