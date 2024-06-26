<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use App\Models\Consumption;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class RemoveConsumptionController extends Controller{

    public function __construct(\DI\Container $container){
        parent::__construct($container);
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $res = [];

        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));

        if($authhelper->authentified()){
            $idUser = $authhelper->getIdUserAuthentified();
            $user = $authhelper->getUserAuthentified();

            $consumption = Consumption::where('idConsumption', $args['id_cons'])->where('idUser', $idUser)->first();
            
            if($consumption !== null){
                $date = $consumption->consumed_on;
                
                if(!$this->container->get('xpHelper')->goalIsAlreadyDone($idUser, $date)){
                    $consumption->delete();

                    $canConfirm = $this->container->get('xpHelper')->goalCanBeDone($idUser, $user, $date);
                    $res['canConfirm'] = $canConfirm;

                    $res['success'] = true;
                    $rs= $rs->withStatus(200);
                }else{
                    $res['error'] = "Day locked";
                    $rs= $rs->withStatus(401);
                }
            }else{
                $res['error'] = "Consumption not found or user not authorized";
                $rs= $rs->withStatus(401);
            }
        }else{
            $res['error'] = "Not authentified";
            
            $rs= $rs->withStatus(401);  
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

}