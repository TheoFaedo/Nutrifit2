import Quantity from "./Quantity";
import { Weight } from "./Weight";

export abstract class Energy extends Quantity{

    protected constructor(energy: number) {
        super(energy);
    }

    abstract get toKcals(): number;

    abstract get unitLabel(): string;

    equals<Energy>(anotherEnergy: Energy): boolean{
        if(anotherEnergy instanceof Energy){
            return this.toKcals === anotherEnergy.toKcals
        }
        return false;
    }
}

export class EnergyInKcal extends Energy {

    public static create(energyValue: number): EnergyInKcal {
        if(energyValue >= 0){
            return new EnergyInKcal(energyValue);
        }
        throw new Error('Energy value must be positive');
    }

    public static fromMacros(carbos: Weight, proteins: Weight, fats: Weight): EnergyInKcal {
        return new EnergyInKcal(carbos.toGrams * 4 + proteins.toGrams * 4 + fats.toGrams * 9);
    }

    public remains<EnergyInKcal>(quantity: EnergyInKcal): Quantity {
        if(quantity instanceof EnergyInKcal && this.value >= quantity.toKcals){
            return new EnergyInKcal(this.value - quantity.toKcals);
        }
        throw new Error('Quantity is not enough');
    }

    get unitLabel(){
        return "kcal";
    }

    protected constructor(energy: number) {
        super(energy);
    }

    get toKcals(){
        return Number(this.value.toFixed(1));
    }

}

export class EnergyInKJ extends Energy {

    public static create(energyValue: number): EnergyInKJ {
        if(energyValue >= 0){
            return new EnergyInKJ(energyValue);
        }
        throw new Error('Energy value must be positive');
    }

    public remains<EnergyInKJ>(quantity: EnergyInKJ): Quantity {
        if(quantity instanceof EnergyInKJ && this.value >= quantity.toKcals){
            return new EnergyInKJ(this.value - quantity.toKcals);
        }
        throw new Error('Quantity is not enough');
    }

    get unitLabel(){
        return "kJ";
    }

    protected constructor(energy: number) {
        super(energy);
    }

    get toKcals(){
        return this.value / 4.184;
    }

}