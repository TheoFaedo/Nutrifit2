export function validConsumableName(name: string) : boolean {
    return name.length > 0 && name.length <= 20;
}

export function validConsumableServingSize(serving_size: string) : boolean {
    return serving_size.length > 0 && serving_size.length <= 10;
}