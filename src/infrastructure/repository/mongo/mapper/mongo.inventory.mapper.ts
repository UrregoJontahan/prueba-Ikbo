import { InventoryEntry } from "src/domain/entity/invnetory.entity";
import { InventoryEntryDto } from "src/application/dto/inventory.dto";

export class MongoInventoryMapper {
  
  static toDomain(inventory: InventoryEntryDto): InventoryEntry {
    return new InventoryEntry(
      "", 
      inventory.productId,
      inventory.quantity,
      inventory.expiryDate,
    );
  }

  static toMongoEntity(inventory: InventoryEntry) {
    return {
      productId: inventory.getProductId(),
      quantity: inventory.getQuantity(),
      expiryDate: inventory.getExpiryDate(),
    };
  }
}
