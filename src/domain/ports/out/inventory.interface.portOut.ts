import { InventoryEntry } from "src/domain/entity/invnetory.entity"

export interface InventoryInterfacePortOut {
    saveEntry(entry: InventoryEntry): Promise<InventoryEntry>
    findEntriesByProductId(productId: number[]): Promise<InventoryEntry[]>
    updateEntryQuantity(id: number, quantity: number): Promise<void>
}