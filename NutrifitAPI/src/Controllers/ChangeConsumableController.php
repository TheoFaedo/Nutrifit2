<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;
use App\Helpers\FormatHelper;
use App\Helpers\ErrorHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumable;
use App\Models\RecipeComposition;

require __DIR__ . '/../../vendor/autoload.php';

class ChangeConsumableController extends Controller{

    public function __construct(\DI\Container $container){
        parent::__construct($container);
    }
    
    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $params = $rq->getParsedBody();

        $res = [];

        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));

        if($authhelper->authentified()){
            if(isset($params['name']) && isset($params['energy']) 
            && isset($params['fats']) && isset($params['carbohydrates']) 
            && isset($params['proteins']) && isset($params['quantity_label'])
            && isset($params['is_public']) && isset($params['type'])){

                if(!FormatHelper::verify_ConsumableName($params['name']) || !FormatHelper::verify_ConsumableServingSize($params['quantity_label'])) {
                    $rs->getBody()->write(json_encode(["error" => ErrorHelper::error_to_json_format(400, 2005, "Invalid name or serving size format")]));
                    $rs= $rs->withStatus(400);
                    return $rs->withHeader('Content-Type', 'application/json');
                }

                $user = $authhelper->getIdUserAuthentified();

                $consumable = Consumable::where('idConsumable', $args['id_cons'])->first();
                $consumable->deleteAllIngredientsRelations();
                
                if($consumable->author == $user){
                    $consumable->name = $params['name'];
                    $consumable->quantity_label = $params['quantity_label'];
                    $consumable->is_public = $params['is_public'];
                    $consumable->type = $params['type'];
                    $consumable->update_time = date('Y-m-d H:i:s');
                    $consumable->save();

                    $energy = 0;
                    $fats = 0;
                    $carbohydrates = 0;
                    $proteins = 0;
    
                    if($params['type'] == 'RECIPE'){
                        if(isset($params['ingredients'])){
                            $ingredients = $params['ingredients'];
                            foreach ($ingredients as $ingredient) {
                                $proportion = $ingredient['proportion'];
    
                                $recipeIngredient = new RecipeComposition();
                                $recipeIngredient->idRecipe = $consumable->idConsumable;
                                $recipeIngredient->idIngredient = $ingredient['idConsumable'];
                                $recipeIngredient->proportion = $ingredient['proportion'];
    
                                $consumableIsIngredient = Consumable::where('idConsumable', $ingredient['idConsumable'])->first();
                                
                                $energy += ($consumableIsIngredient->energy * $proportion);
                                $fats += ($consumableIsIngredient->fats * $proportion);
                                $carbohydrates += ($consumableIsIngredient->carbohydrates * $proportion);
                                $proteins += ($consumableIsIngredient->proteins * $proportion);
    
                                $recipeIngredient->save();
                            }
    
                            $consumable->energy = $energy;
                            $consumable->fats = $fats;
                            $consumable->carbohydrates = $carbohydrates;
                            $consumable->proteins = $proteins;
    
                            $consumable->save();
                        }else{
                            $consumable->delete();
    
                            return self::missingParameters($res, $rs);
                        }
    
                    }else{
                        if(isset($params['energy']) && isset($params['fats']) 
                        && isset($params['carbohydrates']) && isset($params['proteins'])){
    
                            $consumable->energy = $params['energy'];
                            $consumable->fats = $params['fats'];
                            $consumable->carbohydrates = $params['carbohydrates'];
                            $consumable->proteins = $params['proteins'];
    
                            $consumable->save();
                        }else{
                            return self::missingParameters($res, $rs);
                        }
                    }
    
                    $res['success'] = true;
                    $rs= $rs->withStatus(200);
                }else{
                    $res['error'] = "Not authorized";
                    $rs->getBody()->write(json_encode($res));
                    $rs= $rs->withStatus(401);
                    return $rs->withHeader('Content-Type', 'application/json');
                }
            }else{
                return self::missingParameters($res, $rs);
            }
        }else{
            $res['error'] = "Not authentified";

            $rs= $rs->withStatus(401);
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

    /**
     * A function that handles missing parameters.
     *
     * @param mixed $res The response array.
     * @param mixed $rs The response object.
     * @throws Some_Exception_Class Description of exception.
     * @return mixed The modified response object with added header.
     */
    private static function missingParameters($res, $rs){
        $res['error'] = "Missing parameters";
        $rs= $rs->withStatus(400);
        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

}