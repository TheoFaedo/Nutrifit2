import { Energy, EnergyInKcal } from "./Energy";
import Quantity from "./Quantity";

export enum MACRO_TYPES {
    CARBOHYDRATE = 1,
    PROTEIN = 2,
    FAT = 3
}


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

    public toKcal(macroType: MACRO_TYPES): Energy{
        switch(macroType){
            case MACRO_TYPES.CARBOHYDRATE:
                return EnergyInKcal.create(this.toGrams * 4);
            case MACRO_TYPES.PROTEIN:
                return EnergyInKcal.create(this.toGrams * 4);
            case MACRO_TYPES.FAT:
                return EnergyInKcal.create(this.toGrams * 9);
            default:
                throw new Error('Invalid macro type');
        }
    }

    get value(): number{
        if(this._value > 999){
            return 999;
        }
        return Number(this._value.toFixed(1));
    }
}

export class WeightInGrams extends Weight{

    public static create(weightValue: number): WeightInGrams{
        if(!isNaN(weightValue) && weightValue>=0){
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
        if(!isNaN(weightValue) && weightValue>=0){
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
        return Number((this.value * 28.3495).toFixed(1));
    }

    get unitLabel(): string{
        return "oz";
    }

}