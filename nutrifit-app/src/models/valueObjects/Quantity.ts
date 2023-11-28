import ValueObject from "./ValueObject";

export default abstract class Quantity implements ValueObject<Number> {
    private readonly _value: number = 0;

    protected constructor(value: number){
        this._value = value;
    }
    equals(object: ValueObject<Number>): boolean {
        throw new Error("Method not implemented.");
    }

    public abstract remains<T extends Quantity>(quantity: T): Quantity;

    get value(): number{
        return this._value;
    };

    abstract get unitLabel(): string;
}