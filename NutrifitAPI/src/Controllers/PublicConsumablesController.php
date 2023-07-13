<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumable;

require __DIR__ . '/../../vendor/autoload.php';

class PublicConsumablesController extends Controller{

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
            $publicConsumables = Consumable::where('public', 1);

            if(isset($params['q'])){
                if(strlen($params['q']) >= 3){
                    $publicConsumables = $publicConsumables->where('name', 'LIKE', '%'.$params['q'].'%');
                }
            }

            $res['publicConsumables'] = $publicConsumables->get();

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