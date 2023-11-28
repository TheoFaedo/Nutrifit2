export function zeroIfIsNaN(value: number){
    return isNaN(value) ? 0 : value;
}