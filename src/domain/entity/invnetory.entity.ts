export class InventoryEntry {
  private id: string;
  private productId: string;
  private quantity: number;
  private expiryDate: Date;

  constructor(id: string, productId: string, quantity: number, expiryDate: Date) {
      this.id = id;
      this.productId = productId;
      this.quantity = quantity;
      this.expiryDate = expiryDate;
  }

  public getId(): string {
      return this.id;
  }

  public getProductId(): string {
      return this.productId;
  }

  public getQuantity(): number {
      return this.quantity;
  }

  public getExpiryDate(): Date {
      return this.expiryDate;
  }

  public setQuantity(quantity: number): void {
      this.quantity = quantity;
  }

}
