import { Controller, Post, Get, Body, Param, Put } from "@nestjs/common";
import { InventoryApplicationService } from "../../application/service/inventory.application.service";
import { InventoryEntryDto } from "../../application/dto/inventory.dto";

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryAppService: InventoryApplicationService) {}

    @Post('entry')
    async addEntry(@Body() entryDto: InventoryEntryDto): Promise<void> {
        await this.inventoryAppService.addEntry(entryDto);
    }

    @Put('output')
    async processOutput(@Body() outputDto: InventoryEntryDto): Promise<void> {
        await this.inventoryAppService.processOutput(outputDto);
    }

    @Get(':productId/state')
    async getProductState(@Param('productId') productId: string): Promise<string> {
        return this.inventoryAppService.getProductState(productId);
    }
}
