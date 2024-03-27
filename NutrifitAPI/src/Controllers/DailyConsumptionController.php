<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use App\Models\Consumption;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class DailyConsumptionController extends Controller{

    public function __construct($container){
        parent::__construct($container);
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $res = [];

        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));

        $idUser = $authhelper->getIdUserAuthentified();
        $user = $authhelper->getUserAuthentified();

        $date = date('Y-m-d');
        if($authhelper->authentified()){
            $consumptionToday = Consumption::whereDate('consumed_on', '=', $date)->where('idUser', $idUser)->get();
            
            foreach($consumptionToday as $consumption){
                $res[$consumption->idConsumption] = $consumption;
            }

            $canConfirm = $this->container->get('xpHelper')->goalCanBeDone($idUser, $user, $date) && !$this->container->get('xpHelper')->goalIsAlreadyDone($idUser, $date);
            $res['canConfirm'] = $canConfirm;
            $res['locked'] = $this->container->get('xpHelper')->goalIsAlreadyDone($idUser, $date);

            $res['success'] = true;
            $rs= $rs->withStatus(200);
        }else{
            $res['error'] = "Not authentified";
            
            $rs= $rs->withStatus(401);  
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

    
}