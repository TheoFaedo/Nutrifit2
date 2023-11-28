import Quantity from "./Quantity";

export abstract class Weight extends Quantity{

    protected constructor(value: number){
        super(value);
    }

    abstract get toGrams(): number;

    abstract get unitLabel(): string;

    equals<Weight>(anotherObject: Weight): boolean {
        if(anotherObject instanceof Weight){
            return this.toGrams === anotherObject.toGrams;
        }
        return false;
    }
}

export class WeightInGrams extends Weight{

    public static create(weightValue: number): WeightInGrams{
        if(weightValue>=0 && weightValue<=999){
            return new WeightInGrams(weightValue);
        }
        throw new Error('Invalid quantity (must be between 0 and 999)');
    }
    
    protected constructor(value: number){
        super(value);
    }

    get toGrams(): number {
        return this.value;
    }

    get unitLabel(): string{
        return "g";
    }

    public remains<WeightInGrams>(quantity: WeightInGrams): Quantity {
        if(quantity instanceof WeightInGrams && this.value >= quantity.toGrams){
            return new WeightInGrams(this.value - quantity.toGrams);
        }
        throw new Error('Quantity is not enough');
    }

}

export class WeightInOnce extends Weight{

    public static create(weightValue: number): WeightInOnce{
        if(weightValue>=0 && weightValue<=999){
            return new WeightInOnce(weightValue);
        }
        throw new Error('Invalid quantity (must be between 0 and 999)');
    }

    public remains<WeightInOnce>(quantity: WeightInOnce): Quantity {
        if(quantity instanceof WeightInOnce && this.value >= quantity.toGrams){
            return new WeightInOnce(this.value - quantity.toGrams);
        }
        throw new Error('Quantity is not enough');
    }
    
    protected constructor(value: number){
        super(value);
    }

    get toGrams(): number {
        return this.value * 28.3495;
    }

    get unitLabel(): string{
        return "oz";
    }

}