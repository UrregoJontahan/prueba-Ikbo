import { InventoryEntry } from "src/domain/entity/invnetory.entity"

export interface InventoryInterfacePortOut {
    saveEntry(entry: InventoryEntry): Promise<InventoryEntry>
    findEntriesByProductId(productId: string[]): Promise<InventoryEntry[]>
    updateInventoryOut(id: string, quantity: number): Promise<void>
}