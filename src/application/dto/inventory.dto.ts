import { IsInt, Min, IsNotEmpty, IsString } from 'class-validator';

export class InventoryEntryDto {
    
    @IsString()
    productId: string;
    
    @IsInt({ message: 'La cantidad debe ser un número entero.' })
    @Min(1, { message: 'La cantidad debe ser al menos 1.' })
    quantity: number;

    @IsNotEmpty({ message: 'La fecha de expiración no puede estar vacía.' })
    expiryDate: Date;
}
