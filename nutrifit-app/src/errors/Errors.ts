export class AccountError extends Error {

}

export class AccountProblemError extends AccountError {
    constructor() {
        super("There is a problem with your account");
    }
}

export class AccountNotFoundError extends AccountError {
    constructor() {
        super("Account not found");
    }
}

export class AccountAlreadyExistsError extends AccountError {
    constructor() {
        super("Account already exists");
    }
}

export class ServerError extends Error {

}

export class ServerDontRespondError extends ServerError {
    constructor() {
        super("Server doesn't respond");
    }
}

export class ServerResponseError extends ServerError {
    constructor() {
        super("Server response error");
    }
}

export class ServerRequestError extends ServerError {
    
}