export function validConsumableName(name: string) : boolean {
    return name.length > 0 && name.length <= 20;
}

export function validConsumableServingSize(serving_size: string) : boolean {
    return serving_size.length > 0 && serving_size.length <= 10;
}

export function validUsername(username: string) : boolean {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function validEmail(email: string) : boolean {
    return /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);;
}

export function validPassword(password: string) : boolean {
    return /^[\w~`!@#$%^&*()_\-+={[}\]\|\:;\"\'<,>\.\?\/]{3,}$/.test(password);
}

export function validGender(gender: string) : boolean {
    return /^(M|F)$/.test(gender);
}

export function validGoal(goal: string) : boolean {
    return /^(1|2|3)$/.test(goal);
}