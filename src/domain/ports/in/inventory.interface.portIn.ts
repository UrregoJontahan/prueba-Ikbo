export interface InventoryInterfacePortIn {
    addEntry(productId: number, quantity: number, expiryDate: Date): Promise<void>
    processOutput(productId: number, quantity: number): Promise<void>
    getProductState(productId: number): Promise<string>
}