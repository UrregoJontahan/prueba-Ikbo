import { Inject, Injectable } from "@nestjs/common";
import { InventoryEntry } from "../entity/invnetory.entity";
import { InventoryInterfacePortIn } from "../ports/in/inventory.interface.portIn";
import { InventoryInterfacePortOut } from "../ports/out/inventory.interface.portOut";
import * as moment from "moment";

@Injectable()
export class InventoryDomainService implements InventoryInterfacePortIn{
    constructor( @Inject("inventoryInterfacePortOut")private readonly inventoryInterfacePortOut: InventoryInterfacePortOut) {}

    async addEntry(productId: number, quantity: number, expiryDate: Date): Promise<void> {
        
        const entry = new InventoryEntry(Date.now(), Number(productId), quantity, new Date(expiryDate));
        await this.inventoryInterfacePortOut.saveEntry(entry);
    }

    async processOutput(productId: number, quantity: number): Promise<void> {
        const entries = await this.inventoryInterfacePortOut.findEntriesByProductId([productId]);
        let remainingQuantity = quantity;

        for (const entry of entries) {
            if (entry.getQuantity() >= remainingQuantity) {
                await this.inventoryInterfacePortOut.updateEntryQuantity(entry.getId(), entry.getQuantity() - remainingQuantity);
                break;
            } else {
                remainingQuantity -= entry.getQuantity();
                await this.inventoryInterfacePortOut.updateEntryQuantity(entry.getId(), 0);
            }
        }

        if (remainingQuantity > 0) {
            throw new Error('Insufficient inventory to process output');
        }
    }

    async getProductState(productId: number): Promise<string> {
        const now = moment();
        const entries = await this.inventoryInterfacePortOut.findEntriesByProductId([productId]);
        
        let isExpired = false;
        let isSoonToExpire = false;
    
        for (const entry of entries) {
            const expiryDate = moment(entry.getExpiryDate());
    
            if (expiryDate.isBefore(now)) {
                isExpired = true;
                break;
            }
    
            const diffDays = expiryDate.diff(now, 'days');
            console.log(`Diferencia en días: ${diffDays}`);
    
            if (diffDays > 0 && diffDays <= 3) {
                isSoonToExpire = true;
            }
        }
    
        if (isExpired) {
            return 'Vencido';
        } else if (isSoonToExpire) {
            return 'Por vencer';
        } else {
            return 'Vigente';
        }
    }
    
}
