export interface InventoryInterfacePortIn {
    addEntry(productId: string, quantity: number, expiryDate: Date): Promise<void>
    processOutput(productId: string, quantity: number): Promise<void>
    getProductState(productId: string): Promise<string>
}