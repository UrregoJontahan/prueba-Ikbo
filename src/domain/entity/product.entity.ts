export class Product {
    id: string;
    name: string;
    description: string;
    category: string;

    constructor(id: string, name: string, description: string, category: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
    }

    public getId(){
        return this.id;
    }

    public setName (name){
        this.name = name;
    }

    public getName (){
        return this.name;
    }

    public setDescription(description){
        this.description = description;
    }

    public getDescription (){
        return this.description;
    }

    public setCategory (category){
        this.category = category;
    }

    public getCategory(){
        return this.category;
    }

}