export class FieldStatus {
  constructor(public valid: boolean, public messageId?: number) {
    this.valid = valid;
    this.messageId = messageId;
  }

  get message() {
    return this.messageId || 1000;
  }
}

/* eslint-disable no-useless-escape */
export function validConsumableName(name: string): FieldStatus {
  if(name.length < 3 || name.length > 40){
    return new FieldStatus(false, 1001);
  }else if(!(/^[a-zA-Z\d éèàŒœ]{1,40}$/.test(name))){
    return new FieldStatus(false, 1002);
  }
  return new FieldStatus(true, 0);
}

/*
 * Format of serving size : {number}{unit}
 */
export function validConsumableServingSize(serving_size: string): FieldStatus {
  if(serving_size.length <= 0 || serving_size.length > 16){
    return new FieldStatus(false, 1011);
  }else if(!(/^[1-9]\d* ?[a-zA-Z]+$/.test(serving_size))){
    return new FieldStatus(false, 1012);
  }
  return new FieldStatus(true, 0);
}

export function validUsername(username: string): FieldStatus {
  if(username.length < 3 || username.length > 20){
    return new FieldStatus(false, 1021);
  }else if(!(/^[a-zA-Z0-9_]{3,20}$/.test(username))){
    return new FieldStatus(false, 1022);
  }
  return new FieldStatus(true, 0);
}

export function validEmail(email: string): FieldStatus {
  return /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ?
    new FieldStatus(true, 0)
    :
    new FieldStatus(false, 1031);
}

export function validPassword(password: string): FieldStatus {
  if(password.length < 8 || password.length > 40){
    return new FieldStatus(false, 1041);
  }
  return /^[\w~`!@#$%^&*()_\-+={[}\]\|\:;\"\'<,>\.\?\/]{8,40}$/.test(password) ?
    new FieldStatus(true, 0)
    :
    new FieldStatus(false, 1042);
}

export function validGender(gender: string): FieldStatus {
  return /^(M|F)$/.test(gender) ?
    new FieldStatus(true, 0)
    :
    new FieldStatus(false, 1000);
}

export function validGoal(goal: string): FieldStatus {
  return /^(1|2|3)$/.test(goal) ?
    new FieldStatus(true, 0)
    :
    new FieldStatus(false, 1000);
}

export function numberFieldFormat(fieldValue: number, exponent: number = 3): string {
  if(fieldValue === 0) return '';
  if(fieldValue >= Math.pow(10, exponent)) return (Math.pow(10, exponent)-1).toString();
  return fieldValue.toString();
}

export function stringToNumberFormat(fieldValue: string): number {
  if(fieldValue.length === 0) return 0;
  if(isNaN(Number(fieldValue))) return 0;
  return parseFloat(fieldValue);
}

/**
 * Function who format a string to an abbreviation like :
 * Hello World => Hello Wo...
 * @param stringToFormat : string to format
 * @param length : length of the abbreviation
 * @returns desired abbreviation
 */
export function stringAbreviationFormat(stringToFormat: string, length: number = 10): string {
  if(stringToFormat.length <= length) return stringToFormat;
  return stringToFormat.substring(0, length-3) + '...' ;
}
