import { IsInt, IsPositive, IsDate, Min, IsNotEmpty, IsInstance } from 'class-validator';

export class InventoryEntryDto {
    
    @IsInt({ message: 'El ID del producto debe ser un número entero.' })
    @IsPositive({ message: 'El ID del producto debe ser un número positivo.' })
    productId: number;
    
    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @Min(1, { message: 'La cantidad debe ser al menos 1.' })
    quantity: number;

    @IsNotEmpty({ message: 'La fecha de expiración no puede estar vacía.' })
    expiryDate: Date;
}
