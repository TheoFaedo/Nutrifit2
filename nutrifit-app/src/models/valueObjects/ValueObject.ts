export default interface ValueObject<TypeOfValue>{
    equals<T extends ValueObject<TypeOfValue>>(object: T): boolean
    get value(): TypeOfValue
}