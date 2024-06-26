<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

//Models
use App\Models\User;

require __DIR__ . '/../../vendor/autoload.php';

class NutritionalGoalController extends Controller{

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

        if($authhelper->authentified()){
            $user = User::find($authhelper->getIdUserAuthentified());

            $res['idUser'] = $user->idUser;
            $res['energy_goal'] = $user->energy_goal;
            $res['proteins_goal'] = $user->proteins_goal;
            $res['carbohydrates_goal'] = $user->carbohydrates_goal;
            $res['fats_goal'] = $user->fats_goal;

            $res['active_eg'] = $user->active_eg;
            $res['active_pg'] = $user->active_pg;
            $res['active_cg'] = $user->active_cg;
            $res['active_fg'] = $user->active_fg;

            $rs= $rs->withStatus(200);
        }else{
            $res['error'] = "Not authentified";

            $rs= $rs->withStatus(401);
        }

        $rs->getBody()->write(json_encode($res));
        return $rs->withHeader('Content-Type', 'application/json');

        
    }

}