import { Inject, Injectable } from "@nestjs/common";
import { InventoryEntry } from "../entity/invnetory.entity";
import { InventoryInterfacePortIn } from "../ports/in/inventory.interface.portIn";
import { InventoryInterfacePortOut } from "../ports/out/inventory.interface.portOut";
import * as moment from "moment";

@Injectable()
export class InventoryDomainService implements InventoryInterfacePortIn{
    constructor( 
        @Inject("inventoryInterfacePortOut")private readonly inventoryInterfacePortOut: InventoryInterfacePortOut,
    ) {}

    async addEntry(productId: string, quantity: number, expiryDate: Date): Promise<void> {
        const entry = new InventoryEntry(
          "", 
          productId,
          quantity,
          moment(expiryDate).toDate(),
        );
        
        await this.inventoryInterfacePortOut.saveEntry(entry);
    }

    async processOutput(productId:string, quantity: number): Promise<void> {
        return await this.inventoryInterfacePortOut.updateInventoryOut(productId, quantity);
    }

    async getProductState(productId: string): Promise<string> {
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
    
            if (diffDays > 0 && diffDays <= 3) {
                isSoonToExpire = true;
            }
        }
    
        if (isExpired) {
            return `Vencido ${JSON.stringify(entries.map(x => x.getExpiryDate()))}`;
        } else if (isSoonToExpire) {
            return `Por vencer ${JSON.stringify(entries.map(x => x.getExpiryDate()))}`;
        } else {
            return `Vigente ${JSON.stringify(entries.map(x => x.getExpiryDate()))}`;
        }
    }
    
}
