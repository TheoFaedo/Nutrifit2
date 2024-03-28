<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumption;
use App\Models\Consumable;

require __DIR__ . '/../../vendor/autoload.php';

class ConsumeController extends Controller{

    public function __construct($container){
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
            if(isset($params['idConsumable']) && isset($params['proportion']) && isset($params['consumed_on'])){
                $idUser = $authhelper->getIdUserAuthentified();
                $user = $authhelper->getUserAuthentified();

                $consumable = Consumable::where('idConsumable', $params['idConsumable'])->first();
                if(!$consumable){
                    $res['error'] = "Consumable not found";
                    $rs= $rs->withStatus(404);
                    $rs->getBody()->write(json_encode($res));

                    return $rs->withHeader('Content-Type', 'application/json');
                }

                if($consumable->author != $idUser && !$consumable->is_public){
                    $res['error'] = "Private consumable cannot be added";
                    $rs = $rs->withStatus(403);
                    $rs->getBody()->write(json_encode($res));

                    return $rs->withHeader('Content-Type', 'application/json');
                }

                $consumable->update_time = date('Y-m-d H:i:s');
                $consumable->save();

                $consumption = new Consumption();
                $consumption->idUser = $idUser;
                $consumption->idConsumable = $params['idConsumable'];
                $consumption->proportion = $params['proportion'];
                $consumption->consumed_on = $params['consumed_on'];
                $consumption->last_update = date('Y-m-d H:i:s');

                if(isset($params['meal'])){
                    $consumption->meal = $params['meal'];
                }else{
                    $consumption->meal = 'LUNCH';
                }

                $consumption->save();

                $canConfirm = $this->container->get('xpHelper')->goalCanBeDone($idUser, $user, $params['consumed_on']) && !$this->container->get('xpHelper')->goalIsAlreadyDone($idUser, $params['consumed_on']);
                $res['canConfirm'] = $canConfirm;
                
                $res['success'] = true;
                $res['idConsumption'] = $consumption->idConsumption;
                $rs= $rs->withStatus(200);
            }else{
                $res['error'] = "Missing parameters";
                $rs= $rs->withStatus(400);
            }
        }else{
            $res['error'] = "Not authentified";

            $rs= $rs->withStatus(401);
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');
    }

}