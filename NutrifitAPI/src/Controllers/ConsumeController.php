<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumption;

require __DIR__ . '/../../vendor/autoload.php';

class ConsumeController extends Controller{
    
    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $params = $rq->getParsedBody();

        $res = [];

        $authhelper = new AuthHelper();

        if($authhelper->authentified()){
            if(isset($params['idConsumable']) && isset($params['proportion'])){
                $user = $authhelper->getIdUserAuthentified();

                $consumption = new Consumption();
                $consumption->idUser = $user;
                $consumption->idConsumable = $params['idConsumable'];
                $consumption->proportion = $params['proportion'];
                $consumption->consumed_on = date('Y-m-d H:i:s');
                $consumption->last_update = date('Y-m-d H:i:s');
                $consumption->save();

                $res['success'] = true;
                $rs= $rs->withStatus(200);
            }else{
                $res['error'] = "Missing parameters";
                $rs= $rs->withStatus(400);
            }
        }else{
            $res['error'] = "Not authenticated";

            $rs= $rs->withStatus(401);
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

}