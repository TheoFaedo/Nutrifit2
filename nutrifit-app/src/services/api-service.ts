import Consumable from "../models/Consumable";

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