<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use App\Models\Consumption;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class ConsumptionAtDateController extends Controller{

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $res = [];

        $params = $rq->getQueryParams();

        $authhelper = new AuthHelper();

        if($authhelper->authentified()){
            $idUser = $authhelper->getIdUserAuthentified();

            $date = date('Y-m-d');
            $consumptionAtDay = Consumption::whereDate('consumed_on', '=', $params['date'])->where('idUser', $idUser)->get();
            
            foreach($consumptionAtDay as $consumption){
                $res[$consumption->idConsumption] = $consumption;
            }

            $rs= $rs->withStatus(200);
        }else{
            $res['error'] = "Not authenticated";
            
            $rs= $rs->withStatus(401);  
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

    
}