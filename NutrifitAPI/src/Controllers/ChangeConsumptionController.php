<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumption;
use App\Models\RecipeComposition;

require __DIR__ . '/../../vendor/autoload.php';

class ChangeConsumptionController extends Controller{

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
            if(isset($params['idConsumable']) && isset($params['proportion'])){

                $user = $authhelper->getIdUserAuthentified();

                $consumption = Consumption::where('idConsumption', $args['id_cons'])->first();

                if($consumption->idUser == $user){
    
                    $consumption->idConsumable = $params['idConsumable'];
                    $consumption->proportion = $params['proportion'];
                    $consumption->last_update = date('Y-m-d H:i:s');
                    $consumption->save();
    
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