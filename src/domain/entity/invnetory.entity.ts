export class InventoryEntry {
  private id: number;
  private productId: number;
  private quantity: number;
  private expiryDate: Date;

  constructor(id: number, productId: number, quantity: number, expiryDate: Date) {
      this.id = id;
      this.productId = productId;
      this.quantity = quantity;
      this.expiryDate = expiryDate;
  }

  public getId(): number {
      return this.id;
  }

  public getProductId(): number {
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
