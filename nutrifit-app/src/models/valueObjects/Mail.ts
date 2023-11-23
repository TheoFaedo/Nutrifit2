export default class Mail{

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

    public equals(anotherMail: Mail): boolean{
        return this._value === anotherMail.value
    }

    get value(): string{
        return this._value;
    }
}