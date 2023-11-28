import ValueObject from "./ValueObject";

export default class Mail implements ValueObject<String>{

    private readonly _value: string;
    // eslint-disable-next-line no-useless-escape
    private static readonly _regex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/

    private constructor(value: string){
        this._value = value;
    }

    public static create(email: string): Mail
    {
        if(Mail._regex.test(email)){
            return new Mail(email);
        }else{
            throw new Error('Invalid email');
        }
    }

    public equals<Mail>(anotherMail: Mail): boolean{
        if(anotherMail instanceof Mail){
            return this._value === anotherMail.value;
        }
        return false;        
    }

    get value(): string{
        return this._value;
    }
}