<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use App\Models\Consumption;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class RemoveConsumptionController extends Controller{

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $res = [];

        if(AuthHelper::authentified()){
            $idUser = AuthHelper::getIdUserAuthentified();

            $consumption = Consumption::where('idConsumption', $args['id_cons'])->where('idUser', $idUser)->first();

            if($consumption !== null){
                $consumption->delete();

                $res['success'] = true;
                $rs= $rs->withStatus(200);
            }else{
                $res['error'] = "Consumption not found or user not authorized";
                $rs= $rs->withStatus(401);
            }
        }else{
            $res['error'] = "Not authenticated";
            
            $rs= $rs->withStatus(401);  
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

    
}