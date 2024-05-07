<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\Consumption;

require __DIR__ . '/../../vendor/autoload.php';

class ChangeNutritionalGoalController extends Controller{

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
            if(isset($params['energy_goal']) && isset($params['proteins_goal']) 
            && isset($params['carbohydrates_goal']) && isset($params['fats_goal'])
            && isset($params['active_eg']) && isset($params['active_pg']) 
            && isset($params['active_cg']) && isset($params['active_fg'])){
                $user = $authhelper->getUserAuthentified();

                $user->energy_goal = $params['energy_goal'];
                $user->proteins_goal = $params['proteins_goal'];
                $user->carbohydrates_goal = $params['carbohydrates_goal'];
                $user->fats_goal = $params['fats_goal'];

                $user->active_eg = $params['active_eg'];
                $user->active_pg = $params['active_pg'];
                $user->active_cg = $params['active_cg'];
                $user->active_fg = $params['active_fg'];

                $user->save();

                $res['success'] = true;
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