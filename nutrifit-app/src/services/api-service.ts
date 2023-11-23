import Consumable from "../models/Consumable";
import { formatDate } from "../helpers/dateHelper";
import Consumption from "../models/Consumption";
import Mail from "../models/valueObjects/Mail";
import User from "../models/User";
import { AccountProblemError, ServerDontRespondError, ServerResponseError } from "../errors/Errors";

const apiDomain = "http://localhost:8080";

type ErrorResponse =  {
    error: {
        message: string,
    };
}

type ErrorsResponse = {
    errors: any
}

type SuccessResponse = {
    success: boolean
}

function executeQuery(url: string, method: string = 'GET', {...options}: any = {}) {
    return fetch(apiDomain+url, {
        ...options,
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        throw new ServerDontRespondError();
    })
}


export const connect = (username: string, password: string): Promise<User|ErrorResponse> => {
    return executeQuery(`/connect?pseudo=${username}&password=${password}`).then(response => {
        if(response.error) {
            throw new Error(response.error);
        }
        if(response.username && response.mail && response.gender && response.token){
            try{
                const mail: Mail = Mail.create(response.mail);
                return new User(response.username, response.gender, response.token, mail);
            }catch(err){
                throw new AccountProblemError();
            }
        }
        throw new ServerResponseError();
    })
}

export const register = (user: { pseudo: string, password: string, mail: Mail, gender: string, goal: number }): Promise<ErrorsResponse|SuccessResponse> => {
    return executeQuery("/register/", 'POST', {
        body: JSON.stringify({
            ...user,
            mail: user.mail.value
        }),
    }).then(response => {
        return response;
    });
}

export const logout = (): Promise<any> => {
    return executeQuery("/disconnect").then(response => {
        return response;
    });
}

export const getnutritionalgoal = (): Promise<any> => {
    return executeQuery("/nutritionalgoal").then(response => {
        return response;
    });
}

export const changenutritionalgoal = (newGoal: any): Promise<any> => {
    return executeQuery("/changenutritionalgoal", 'PUT', {
        body: JSON.stringify(newGoal)
    });
}

export const addConsumable = (consumable: Consumable): Promise<any> => {
    return executeQuery("/addconsumable", 'POST', {
        body: JSON.stringify(consumable)
    })
}

export const consumables = (keyword: string): Promise<any> => {
    return executeQuery("/consumables/?q="+keyword);
}

export const consumablesOfAuthor = (keyword: string, idToken: string): Promise<any> => {
    return executeQuery(`/consumables/${idToken}/?q=${keyword}`);
}

export const consumptionListAtDate = (date: Date): Promise<any> => {
    const formatedDate = formatDate(date);
    return executeQuery(`/consumptionatdate/?date=${formatedDate}`);
}

export const removeConsumption = (idConsumption: number): Promise<any> => {
    return executeQuery(`/removeconsumption/${idConsumption}`, 'DELETE');
}

export const changeConsumption = (consumption: Consumption): Promise<any> => {    
    return executeQuery(`/changeconsumption/${consumption.idConsumption}`, 'PUT', {
        body: JSON.stringify({
            idConsumable: consumption.consumable.idConsumable,
            proportion: consumption.proportion
        })
    })
}

export const addConsumption = (consumption: Consumption): Promise<any> => {
    return executeQuery("/consume/", 'POST', {
        body: JSON.stringify({
            idConsumable: consumption.consumable.idConsumable,
            proportion: consumption.proportion,
            consumed_on: formatDate(consumption.consumed_on)
        })
    })
}

export const removeConsumable = (idConsumable: number): Promise<any> => {
    return executeQuery("/removeconsumable/"+idConsumable, 'DELETE').then(response => {
        return response;
    });
}

export const changeConsumable = (consumable: Consumable): Promise<any> => {
    return executeQuery("/changeconsumable/"+consumable.idConsumable, 'PUT', {
        body: JSON.stringify(consumable)
    })
}

export const isAuthenticated = (): Promise<any> => {
    return executeQuery("/me").then(response => {
        return response;
    })
}