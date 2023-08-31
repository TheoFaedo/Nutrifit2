import Consumable from "../models/Consumable";
import { formatDate } from "../helpers/dateHelper";
import Consumption from "../models/Consumption";

const apiDomain = "http://localhost:8080";


export const connect = (username: string, password: string): Promise<any> => {
    return fetch(`${apiDomain}/connect?pseudo=${username}&password=${password}`, {credentials: 'include'}).then(response => {
        return response.json();
    }).catch(error => {
        return {error: "Connection problem"};
    });
}

export const logout = (): Promise<any> => {
    return fetch(`${apiDomain}/disconnect`, {credentials: 'include'}).then(response => {
        return response.json();
    }).catch(error => {
        return {error: "Connection problem"};
    });
}

export const getnutritionalgoal = (): Promise<any> => {
    return fetch(`${apiDomain}/nutritionalgoal`, {credentials: 'include'}).then(response => {
        return response.json();
    }).catch(error => {
        return {error: "Connection problem"};
    });
}

export const changenutritionalgoal = (newGoal: any): Promise<any> => {
    return fetch(`${apiDomain}/changenutritionalgoal`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(newGoal),
    }).then(response => {
        return response.json();
    }).catch(() => {
        return {error: "Connection problem"};
    });
}

export const addConsumable = (consumable: Consumable): Promise<any> => {
    return fetch(`${apiDomain}/addconsumable`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(consumable),
    }).then(response => {
        return response.json();
    }).catch(() => {
        return {error: "Connection problem"};
    });
}

export const consumables = (keyword: string): Promise<any> => {
    return fetch(`${apiDomain}/consumables/?q=${keyword}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    }).then(response => {
        return response.json();
    }).catch(() => {
        return {error: "Connection problem"};
    });
}

export const consumablesOfAuthor = (keyword: string, idToken: string): Promise<any> => {
    return fetch(`${apiDomain}/consumables/${idToken}/?q=${keyword}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
    }).then(response => {
        return response.json();
    }).catch(() => {
        return {error: "Connection problem"};
    });
}

export const consumptionListAtDate = (date: Date): Promise<any> => {

    const formatedDate = formatDate(date);

    return fetch(`${apiDomain}/consumptionatdate/?date=${formatedDate}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        }).then(response => {
            return response.json();
        }).catch(() => {
            return {error: "Connection problem"};
        });
}

export const removeConsumption = (idConsumption: number): Promise<any> => {

    return fetch(`${apiDomain}/removeconsumption/${idConsumption}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        }).then(response => {
            return response.json();
        }).catch(() => {
            return {error: "Connection problem"};
        });
}

export const changeConsumption = (consumption: Consumption): Promise<any> => {

    return fetch(`${apiDomain}/changeconsumption/${consumption.idConsumption}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            idConsumable: consumption.consumable.idConsumable,
            proportion: consumption.proportion
        })
        }).then(response => {
            return response.json();
        }).catch(() => {
            return {error: "Connection problem"};
        });
}