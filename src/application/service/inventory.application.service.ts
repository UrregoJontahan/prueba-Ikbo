import { Inject, Injectable } from "@nestjs/common";
import { InventoryEntryDto } from "../dto/inventory.dto";
import { InventoryInterfacePortIn } from "src/domain/ports/in/inventory.interface.portIn";

@Injectable()
export class InventoryApplicationService  {
    constructor(@Inject("inventoryInterfacePortIn")private readonly inventroyInterfacePortIn: InventoryInterfacePortIn) {}

    async addEntry(entryDto: InventoryEntryDto): Promise<void> {
        await this.inventroyInterfacePortIn.addEntry(entryDto.productId, entryDto.quantity, entryDto.expiryDate);
    }

    async processOutput(outputDto: InventoryEntryDto): Promise<void> {
        await this.inventroyInterfacePortIn.processOutput(outputDto.productId, outputDto.quantity);
    }

    async getProductState(productId: string): Promise<string> {
        return this.inventroyInterfacePortIn.getProductState(productId);
    }
}
