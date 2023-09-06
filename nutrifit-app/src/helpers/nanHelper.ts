export function zeroIfIsNaN(value: any){
    return isNaN(value) ? 0 : value;
}