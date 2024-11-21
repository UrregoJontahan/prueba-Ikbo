import { InventoryEntry } from "../../domain/entity/invnetory.entity";
import { Injectable } from "@nestjs/common";
import { InventoryInterfacePortOut } from "../../domain/ports/out/inventory.interface.portOut";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { MongoInventory } from "./mongo/entity/inventory.entity.repositoy";
import { MongoInventoryMapper } from "./mongo/mapper/mongo.inventory.mapper";

@Injectable()
export class InventoryRepository implements InventoryInterfacePortOut {
    constructor(
        @InjectModel('Inventory') private readonly inventoryModel: Model<MongoInventory>,
    ){}

    //Método para crear o agregar una entrada de cantidad
    async saveEntry(entry: InventoryEntry): Promise<InventoryEntry> {
        const productExist = await this.inventoryModel.findOne({productId: entry.getProductId()})
        const quantityCurrent = entry.getQuantity()

        if(!productExist){
            const mongoEntity = MongoInventoryMapper.toMongoEntity(entry);
            const createdEntry = new this.inventoryModel(mongoEntity);
            const savedEntry = await createdEntry.save();
        
            return MongoInventoryMapper.toDomain(savedEntry);
        } 

        const newQuantity = productExist.quantity + quantityCurrent;
        console.log(newQuantity )

        if(newQuantity < 0){
            throw new Error("La cantidad debe ser mayor a cero.")
        }

        await this.inventoryModel.updateOne(
            {productId:entry.getProductId()},
            {$set:{quantity:newQuantity}}
        )

        const updatedProduct = await this.inventoryModel.findOne({productId:entry.getProductId()}) 
        console.log(updatedProduct)

        return MongoInventoryMapper.toDomain(updatedProduct)
    }

    //Método para traer entradas por id.
    async findEntriesByProductId(id: string[]): Promise<InventoryEntry[]> {
        const mongoInventory = await this.inventoryModel.find({ productId: id }).exec(); 
        if (!mongoInventory || mongoInventory.length === 0) throw new Error('Producto no encontrado.');
    
        return mongoInventory.map(MongoInventoryMapper.toDomain);
    }
    
    //Método para sacar cantidad del inventario.
    async updateInventoryOut(id: string, quantity: number): Promise<void> {
        const product = await this.inventoryModel.find({productId: id})
        const inventoryOut = product.map( entry => {
            const newQuantity = entry.quantity - quantity

            if(newQuantity < 0) {
                throw new Error("no hay suficiente inventario para realizar esta operacion")
            }
            return{...entry, quantity: newQuantity}
        })

        for( const updateInventory of inventoryOut){
            await this.inventoryModel.updateOne(
                {id: updateInventory.id},
                {$set: {quantity: updateInventory.quantity}}
            )
        }
        if (!product) throw new Error('Producto no encontrado');
        return; 
    }
    
}
