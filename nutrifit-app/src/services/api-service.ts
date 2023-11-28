import Consumable from "../models/Consumable";
import { formatDate } from "../helpers/dateHelper";
import Consumption from "../models/Consumption";
import Mail from "../models/valueObjects/Mail";
import User from "../models/User";
import { AccountProblemError, ServerDontRespondError, ServerResponseError } from "../errors/Errors";
import { EnergyInKcal } from "../models/valueObjects/Energy";
import { WeightInGrams } from "../models/valueObjects/Weight";
import NutritionalGoal from "../models/NutritionalGoal";

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

export const getnutritionalgoal = (): Promise<NutritionalGoal> => {
    return executeQuery("/nutritionalgoal").then(response => {
        return {
            energy_goal: EnergyInKcal.create(response.energy_goal),
            proteins_goal: WeightInGrams.create(response.proteins_goal),
            fats_goal: WeightInGrams.create(response.fats_goal),
            carbohydrates_goal: WeightInGrams.create(response.carbohydrates_goal),
        }
    });
}

export const changenutritionalgoal = (newGoal: NutritionalGoal): Promise<any> => {
    return executeQuery("/changenutritionalgoal", 'PUT', {
        body: JSON.stringify({
            energy_goal: newGoal.energy_goal.value,
            proteins_goal: newGoal.proteins_goal.value,
            fats_goal: newGoal.fats_goal.value,
            carbohydrates_goal: newGoal.carbohydrates_goal.value
        })
    });
}

export const addConsumable = (consumable: Consumable): Promise<any> => {
    console.log(consumable);
    return executeQuery("/addconsumable", 'POST', {
        body: JSON.stringify({
            name: consumable.name,
            energy: consumable.energy.value,
            fats: consumable.fats.value,
            proteins: consumable.proteins.value,
            carbohydrates: consumable.carbohydrates.value,
            quantity_label: consumable.quantity_label,
            is_public: consumable.is_public,
            type: consumable.type,
            ingredients: consumable.ingredients
        })
    })
}

export const consumables = (keyword: string): Promise<Consumable[]> => {
    return executeQuery("/consumables/?q="+keyword).then((response) => {
        return response.consumables.map((consumable: any) => {
            return new Consumable(
                consumable.idConsumable, 
                consumable.name, 
                EnergyInKcal.create(consumable.energy), 
                WeightInGrams.create(consumable.fats), 
                WeightInGrams.create(consumable.carbohydrates),
                WeightInGrams.create(consumable.proteins),
                consumable.quantity_label,
                consumable.is_public,
                consumable.type,
                consumable.author
            );
        })
    }).then((consumables) => {
        console.log(consumables)
        return consumables;
    });
}

export const consumablesOfAuthor = (keyword: string, idToken: string): Promise<(Consumable)[]> => {
    return executeQuery(`/consumables/${idToken}/?q=${keyword}`).then((response) => {
        return response.consumables.map((consumable: any) => {
            // eslint-disable-next-line array-callback-return
            console.log(consumable.name, consumable.ingredients ? consumable.ingredients.map((ingredient: any) => {
                console.log(ingredient)
            }) : []);
            return new Consumable(
                consumable.idConsumable, 
                consumable.name, 
                EnergyInKcal.create(consumable.energy), 
                WeightInGrams.create(consumable.fats), 
                WeightInGrams.create(consumable.carbohydrates),
                WeightInGrams.create(consumable.proteins),
                consumable.quantity_label,
                consumable.is_public,
                consumable.type,
                consumable.author,
                consumable.ingredients ? consumable.ingredients.map((ingredient: any) => {
                    return {
                        author: ingredient.author,
                        energy: EnergyInKcal.create(ingredient.energy),
                        fats: WeightInGrams.create(ingredient.fats),
                        proteins: WeightInGrams.create(ingredient.proteins),
                        carbohydrates: WeightInGrams.create(ingredient.carbohydrates),
                        idConsumable: ingredient.idConsumable,
                        is_public: ingredient.is_public,
                        name: ingredient.name,
                        proportion: ingredient.proportion,
                        quantity_label: ingredient.quantity_label,
                        type: ingredient.type
                    }
                })
                :
                []
            );
        })
    }).then((consumables) => {
        console.log(consumables)
        return consumables;
    });
}

export const consumptionListAtDate = (date: Date): Promise<any> => {
    const formatedDate = formatDate(date);
    return executeQuery(`/consumptionatdate/?date=${formatedDate}`).then(response => {
        return response.map((consumption: any) => {
            return {
                ...consumption,
                consumable: {
                    ...consumption.consumable,
                    energy: EnergyInKcal.create(consumption.consumable.energy),
                    fats: WeightInGrams.create(consumption.consumable.fats),
                    proteins: WeightInGrams.create(consumption.consumable.proteins),
                    carbohydrates: WeightInGrams.create(consumption.consumable.carbohydrates)
                }
            }
        })
    });
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