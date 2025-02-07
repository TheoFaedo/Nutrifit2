import Consumable from "../models/Consumable";
import { formatDate } from "../helpers/dateHelper";
import Consumption from "../models/Consumption";
import Mail from "../models/valueObjects/Mail";
import User from "../models/User";
import {
  NutrifitError
} from "../errors/Errors";
import { EnergyInKcal } from "../models/valueObjects/Energy";
import { WeightInGrams } from "../models/valueObjects/Weight";
import NutritionalGoal from "../models/NutritionalGoal";

type ErrorResponse = {
  error: {
    message: string;
  };
};

type ErrorsResponse = {
  errors: any;
};

type SuccessResponse = {
  success: boolean;
};

const api_url = process.env.REACT_APP_API_URI;

function executeQuery(
  url: string,
  method: string = "GET",
  { ...options }: any = {}
) {
  return fetch(api_url + url, {
    ...options,
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      throw new NutrifitError(2002);
    });
}

export const connect = (
  username: string,
  password: string
): Promise<User | ErrorResponse> => {
  return executeQuery(`/connect?pseudo=${username}&password=${password}`).then(
    (response) => {
      if (response.error) {
        throw response.error.messageId ? new NutrifitError(response.error.messageId) : new NutrifitError(2000);
      }
      if (
        response.username &&
        response.mail &&
        response.gender &&
        response.token
      ) {
        try {
          const mail: Mail = Mail.create(response.mail);
          return new User(
            response.username,
            response.gender,
            response.token,
            mail,
            response.exp,
            response.level,
            response.pp
          );
        } catch (err) {
          throw new NutrifitError(2003);
        }
      }
      throw new NutrifitError(2004);
    }
  );
};

export const register = (user: {
  pseudo: string;
  password: string;
  mail: Mail;
  gender: string;
  goal: number;
}): Promise<ErrorsResponse | SuccessResponse> => {
  return executeQuery("/register/", "POST", {
    body: JSON.stringify({
      ...user,
      mail: user.mail.value,
    }),
  }).then((response) => {
    return response;
  });
};

export const logout = (): Promise<any> => {
  return executeQuery("/disconnect").then((response) => {
    return response;
  });
};

export const getnutritionalgoal = (): Promise<NutritionalGoal> => {
  return executeQuery("/nutritionalgoal").then((response) => {
    return {
      energy_goal: EnergyInKcal.create(response.energy_goal),
      proteins_goal: WeightInGrams.create(response.proteins_goal),
      fats_goal: WeightInGrams.create(response.fats_goal),
      carbohydrates_goal: WeightInGrams.create(response.carbohydrates_goal),
      active_eg: response.active_eg === 1 ? true : false,
      active_pg: response.active_pg === 1 ? true : false,
      active_cg: response.active_cg === 1 ? true : false,
      active_fg: response.active_fg === 1 ? true : false
    };
  });
};

export const changenutritionalgoal = (
  newGoal: NutritionalGoal
): Promise<any> => {
  return executeQuery("/changenutritionalgoal", "PUT", {
    body: JSON.stringify({
      energy_goal: newGoal.energy_goal.value,
      proteins_goal: newGoal.proteins_goal.value,
      fats_goal: newGoal.fats_goal.value,
      carbohydrates_goal: newGoal.carbohydrates_goal.value,
      active_eg: newGoal.active_eg ? 1 : 0,
      active_pg: newGoal.active_pg ? 1 : 0,
      active_cg: newGoal.active_cg ? 1 : 0,
      active_fg: newGoal.active_fg ? 1 : 0
    }),
  });
};

export const addConsumable = (consumable: Consumable): Promise<any> => {
  return executeQuery("/addconsumable", "POST", {
    body: JSON.stringify({
      name: consumable.name,
      energy: consumable.energy.value,
      fats: consumable.fats.value,
      proteins: consumable.proteins.value,
      carbohydrates: consumable.carbohydrates.value,
      quantity_label: consumable.quantity_label,
      is_public: consumable.is_public,
      type: consumable.type,
      ingredients: consumable.ingredients,
    }),
  });
};

export const consumables = (keyword: string, orderBy?: string): Promise<Consumable[]> => {
  return executeQuery("/consumables/?q=" + keyword + (orderBy ? "&orderby=" + orderBy : ""))
    .then((response) => {
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
      });
    })
    .then((consumables) => {
      return consumables;
    });
};

export const consumablesOfAuthor = (
  keyword: string,
  idToken: string,
  orderBy?: string
): Promise<Consumable[]> => {
  return executeQuery(`/consumables/${idToken}/?q=${keyword}${orderBy ? "&orderby=" + orderBy : ""}`)
    .then((response) => {
      return response.consumables.map((consumable: any) => {
        // eslint-disable-next-line array-callback-return
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
          consumable.ingredients
            ? consumable.ingredients.map((ingredient: any) => {
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
                  type: ingredient.type,
                };
              })
            : []
        );
      });
    })
    .then((consumables) => {
      return consumables;
    });
};

export const consumptionListAtDate = (date: Date): Promise<any> => {
  const formatedDate = formatDate(date);
  return executeQuery(`/consumptionatdate/?date=${formatedDate}`).then(
    (response) => {

      const consumptionList = response["consumableList"].map((consumption: any) => {
        return {
          ...consumption,
          consumable: {
            ...consumption.consumable,
            energy: EnergyInKcal.create(consumption.consumable.energy),
            fats: WeightInGrams.create(consumption.consumable.fats),
            proteins: WeightInGrams.create(consumption.consumable.proteins),
            carbohydrates: WeightInGrams.create(
              consumption.consumable.carbohydrates
            ),
          },
        };
      });

      return {
        consumptionList: consumptionList,
        canConfirmGoal: response["canConfirm"],
        locked: response["locked"],
      }
    }
  );
};

export const removeConsumption = (idConsumption: number): Promise<any> => {
  return executeQuery(`/removeconsumption/${idConsumption}`, "DELETE");
};

export const changeConsumption = (idConsumption: number, proportion: number): Promise<any> => {
  return executeQuery(
    `/changeconsumption/${idConsumption}`,
    "PUT",
    {
      body: JSON.stringify({
        proportion: proportion
      }),
    }
  );
};

export const addConsumption = (consumption: Consumption): Promise<any> => {
  return executeQuery("/consume/", "POST", {
    body: JSON.stringify({
      idConsumable: consumption.consumable.idConsumable,
      proportion: consumption.proportion,
      consumed_on: formatDate(consumption.consumed_on),
      meal: consumption.meal
    }),
  });
};

export const removeConsumable = (idConsumable: number): Promise<any> => {
  return executeQuery("/removeconsumable/" + idConsumable, "DELETE").then(
    (response) => {
      return response;
    }
  );
};

export const changeConsumable = (consumable: Consumable): Promise<any> => {
  return executeQuery("/changeconsumable/" + consumable.idConsumable, "PUT", {
    body: JSON.stringify({
      name: consumable.name,
      energy: consumable.energy.toKcals,
      fats: consumable.fats.toGrams,
      proteins: consumable.proteins.toGrams,
      carbohydrates: consumable.carbohydrates.toGrams,
      quantity_label: consumable.quantity_label,
      is_public: consumable.is_public,
      type: consumable.type,
      ingredients: consumable.ingredients,
    }),
  });
};

export const isAuthenticated = (): Promise<any> => {
  return executeQuery("/me").then((response) => {
    return response;
  });
};

export const updateProfile = (data: any): Promise<any> => {
  return executeQuery("/updateprofile", "PUT", {
    body: JSON.stringify(data),
  }).then((response) => {
    return response;
  });
};

export const confirmdailyconsumption = (data: any): Promise<any> => {
  return executeQuery("/confirmdailyconsumption", "POST", {
    body: JSON.stringify(data),
  }).then((response) => {
    return response;
  });
};

export const getInformationFromBarCode = (barCode: string): Promise<any> => {
  return fetch(
    `https://world.openfoodfacts.org/api/v0/product/${barCode}.json`
  ).then((response) => {
    return response.json();
  });
};
