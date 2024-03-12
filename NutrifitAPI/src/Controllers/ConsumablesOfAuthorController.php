<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumable;
use App\Models\Consumption;
use App\Models\User;

require __DIR__ . '/../../vendor/autoload.php';

class ConsumablesOfAuthorController extends Controller{

    public function __construct($container){
        parent::__construct($container);
    }
    
    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $params = $rq->getQueryParams();

        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));

        if($authhelper->authentified()){
            $idFromIdToken = User::where('token', $args['author_id'])->first()->idUser;

            $consumables = Consumable::where('author', $idFromIdToken);
            if(isset($params['q'])){
                if(strlen($params['q']) >= 3){
                    $consumables = $consumables->where('name', 'LIKE', '%'.$params['q'].'%');
                }
            }

            if(isset($params['orderby'])){
                switch ($params['orderby']) {
                    case 'lastupdated':
                        $consumables = $consumables->orderBy('update_time', 'DESC');
                        break;
                    case 'mostrecent':
                        $consumables = $consumables->orderBy('creation_time', 'DESC');
                        break;
                    case 'oldest':
                        $consumables = $consumables->orderBy('creation_time');
                        break;
                    case 'nameAZ':
                        $consumables = $consumables->orderBy('name');
                        break;
                    case 'nameZA':
                        $consumables = $consumables->orderBy('name', 'DESC');
                        break;
                    case 'recommended':
                        //TODO
                    default:
                        $consumables = $consumables->orderBy('update_time', 'DESC');
                }
            }else{
                $consumables = $consumables->orderBy('update_time', 'DESC');
            }

            $consumables = $consumables->skip(0)->take(10);

            $consumablesArray = [];

            foreach ($consumables->get() as $key => $consumable) {
                $consArray = $consumable->toArray();
                if($consumable->type == "RECIPE"){
                    $newIngredients = [];
                    $ingredients = $consumable->ingredients;
                    foreach ($ingredients as $value) {
                        $cons = Consumable::where('idConsumable', $value->idIngredient)->first();
                        $newIngredients[] = [...$cons->toArray(), 'proportion' => $value->proportion];
                    }
                    $consArray['ingredients'] = $newIngredients;
                }
                $consumablesArray[] = $consArray;
            }
            
            

            

            $res['consumables'] = $consumablesArray;

            $rs->getBody()->write(json_encode($res));
            $rs= $rs->withStatus(200);
            return $rs->withHeader('Content-Type', 'application/json');
        }else{
            $res['error'] = "Not authentified";

            $rs->getBody()->write(json_encode($res));
            $rs= $rs->withStatus(401);
            return $rs->withHeader('Content-Type', 'application/json');
        }

        
    }

}