<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumable;

require __DIR__ . '/../../vendor/autoload.php';

class ConsumableByIdController extends Controller{

    public function __construct($container){
        parent::__construct($container);
    }
    
    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){

        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));

        if($authhelper->authentified()){
            $consumable = Consumable::where('idConsumable', $args['id'])->first();

            if($consumable !== null && $consumable !== false){
                $idUser = $authhelper->getIdUserAuthentified();

                if($idUser !== $consumable->author){
                    $res['error'] = "Not authorized";
                    $rs= $rs->withStatus(401);
                }else{
                    $res['consumable'] = $consumable;
                    $rs= $rs->withStatus(200);
                }

                $rs->getBody()->write(json_encode($res));
                return $rs->withHeader('Content-Type', 'application/json');
            }else{
                $res['error'] = "Consumable don't exist.";

                $rs->getBody()->write(json_encode($res));
                $rs= $rs->withStatus(400);
                return $rs->withHeader('Content-Type', 'application/json');
            }

            
        }else{
            $res['error'] = "Not authentified";

            $rs->getBody()->write(json_encode($res));
            $rs= $rs->withStatus(401);
            return $rs->withHeader('Content-Type', 'application/json');
        }
    }

}