<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;
use App\Helpers\XpHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumption;
use App\Models\Consumable;
use App\Models\User;
use App\Models\DailyGoal;



require __DIR__ . '/../../vendor/autoload.php';

class ConfirmDailyConsumption extends Controller{

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
            if(isset($params['day'])){
                $userId = $authhelper->getIdUserAuthentified();
                $user = $authhelper->getUserAuthentified();

                if($this->container->get('xpHelper')->goalIsAlreadyDone($userId, $params['day'])){
                    $res['error'] = "Already done";
                    $rs= $rs->withStatus(400);
                    $rs->getBody()->write(json_encode($res));
                    return $rs->withHeader('Content-Type', 'application/json');
                }

                if($this->container->get('xpHelper')->goalCanBeDone($userId, $user, $params['day'])){
                    $dailyGoal = new DailyGoal();
                    $dailyGoal->idUser = $userId;
                    $dailyGoal->date = $params['day'];
                    $dailyGoal->save();

                    $this->container->get('xpHelper')->addXp($user, 10);

                    $res['level'] = $user->level;
                    $res['xp'] = $user->xp;
                    $res['success'] = true;
                    $rs= $rs->withStatus(200);
                }else{
                    $res['error'] = "Not done";
                    $rs= $rs->withStatus(400);
                }

                
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