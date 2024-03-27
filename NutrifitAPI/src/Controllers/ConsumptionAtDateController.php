<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;
use App\Helpers\XpHelper;

use App\Controllers\Controller;

use App\Models\Consumption;
use App\Models\Consumable;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class ConsumptionAtDateController extends Controller{

    public function __construct(\DI\Container $container){
        parent::__construct($container);    
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $res = [];

        $params = $rq->getQueryParams();

        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));

        if($authhelper->authentified()){
            $idUser = $authhelper->getIdUserAuthentified();
            $user = $authhelper->getUserAuthentified();

            if(isset($params['date'])){
                $consumptionAtDay = Consumption::whereDate('consumed_on', '=', $params['date'])->where('idUser', $idUser)->get();
            
                $res["consumableList"] = [];
                foreach($consumptionAtDay as $consumption){
                    $consumable = Consumable::where('idConsumable', $consumption->idConsumable)->first();
                    array_push($res["consumableList"], [...$consumption->toArray(), 'consumable' => $consumable->toArray()]);
                }

                $canConfirm = $this->container->get('xpHelper')->goalCanBeDone($idUser, $user, $params['date']) && !$this->container->get('xpHelper')->goalIsAlreadyDone($idUser, $params['date']);
                $res['canConfirm'] = $canConfirm;
            }else{
                $res['error'] = "Missing parameters";
                $rs= $rs->withStatus(400);
                $rs->getBody()->write(json_encode($res));
                return $rs->withHeader('Content-Type', 'application/json');
            }
            $rs= $rs->withStatus(200);
        }else{
            $res['error'] = "Not authentified";
            
            $rs= $rs->withStatus(401);  
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

    
}