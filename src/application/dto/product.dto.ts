import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ProductDto {
    @IsString()
    _id: string

    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío.' })
    name: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto.' })
    @MinLength(8, { message: 'La descripción debe tener al menos 8 caracteres.' })
    description: string;

    @IsString({ message: 'La categoría debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La categoría no puede estar vacía.' })
    category: string;
}