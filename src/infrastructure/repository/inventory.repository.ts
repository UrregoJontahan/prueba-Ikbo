import { InventoryEntry } from "src/domain/entity/invnetory.entity";
import { Injectable } from "@nestjs/common";
import { InventoryInterfacePortOut } from "src/domain/ports/out/inventory.interface.portOut";

@Injectable()
export class InventoryRepository implements InventoryInterfacePortOut {
    private inventory: InventoryEntry[] = [];

    async saveEntry(entry: InventoryEntry): Promise<InventoryEntry> {

        this.inventory.push(entry);
        return entry;
    }

    async findEntriesByProductId(productId: number[]): Promise<InventoryEntry[]> {
        const result = this.inventory.filter(entry => {
            return entry.getProductId() === Number(productId);
        });
        return result;
    }

    async updateEntryQuantity(id: number, quantity: number): Promise<void> {
        const entry = this.inventory.find(e => e.getId() === id);
        if (entry) {
            entry.setQuantity(quantity);
        }
    }
}
