/* eslint-disable no-useless-escape */
export function validConsumableName(name: string): boolean {
  return name.length > 0 && name.length <= 30;
}

export function validConsumableServingSize(serving_size: string): boolean {
  return serving_size.length > 0 && serving_size.length <= 10;
}

export function validUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function validEmail(email: string): boolean {
  return /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export function validPassword(password: string): boolean {
  return /^[\w~`!@#$%^&*()_\-+={[}\]\|\:;\"\'<,>\.\?\/]{3,}$/.test(password);
}

export function validGender(gender: string): boolean {
  return /^(M|F)$/.test(gender);
}

export function validGoal(goal: string): boolean {
  return /^(1|2|3)$/.test(goal);
}

export function numberFieldFormat(fieldValue: number, exponent: number = 3): string {
  console.log(fieldValue, exponent);
  if(fieldValue === 0) return '';
  if(fieldValue >= Math.pow(10, exponent)) return (Math.pow(10, exponent)-1).toString();
  return fieldValue.toString();
}

export function stringToNumberFormat(fieldValue: string): number {
  if(fieldValue.length === 0) return 0;
  if(isNaN(Number(fieldValue))) return 0;
  return parseFloat(fieldValue);
}
