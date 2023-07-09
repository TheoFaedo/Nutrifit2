<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class ConnectController extends Controller{

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $params = $rq->getQueryParams();

        $res = [];

        $authhelper = new AuthHelper();
        
        if(!isset($params['pseudo']) || !isset($params['password'])){
            $res = ['error' => "need identifiers"];
            
            $rs->getBody()->write(json_encode($res));
            $rs= $rs->withStatus(400);
            return $rs->withHeader('Content-Type', 'application/json');
        }

        $pseudo = $params['pseudo'];
        $password = $params['password'];

        if($authhelper->authentify($pseudo, $password)){
            $res = ['success' => true];

            $rs->getBody()->write(json_encode($res));
            $rs = $rs->withStatus(200);
            return $rs->withHeader('Content-Type', 'application/json');
        }else{
            $res = ['error' => "Invalid username or password"];

            $rs->getBody()->write(json_encode($res));
            $rs = $rs->withStatus(401);
            return $rs->withHeader('Content-Type', 'application/json');
        }
    }

}