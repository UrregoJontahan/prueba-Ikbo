import { InventoryEntry } from '../../domain/entity/invnetory.entity';
import { InventoryEntryDto } from '../dto/inventory.dto';

export class InventoryMapper {
  static toDto(inventory: InventoryEntry): InventoryEntryDto {
    return {
      productId: inventory.getId(),
      quantity: inventory.getQuantity(),
      expiryDate: inventory.getExpiryDate()
    };
  }

  static toEntity(inventoryDto: InventoryEntryDto): InventoryEntry {
    return new InventoryEntry(
      Date.now().toString(), 
      inventoryDto.productId,
      inventoryDto.quantity,
      inventoryDto.expiryDate,
    );
  }
}
