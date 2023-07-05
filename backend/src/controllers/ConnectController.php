<?php

namespace app\controllers;

use app\controllers\Controller;

use app\helpers\AuthHelper;

require 'vendor/autoload.php';

class ConnectController extends Controller{

    public function __construct($container){
        parent::__construct($container);
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function perform($rq, $rs, $args){
        $params = $rq->getQueryParams();

        $res = [];

        if(!isset($params['pseudo']) || !isset($params['password'])){
            $res = ['error' => "need identifiers"];
            
            $rs->getBody()->write(json_encode($res));
            $rs= $rs->withStatus(400);
            return $rs->withHeader('Content-Type', 'application/json');
        }

        $pseudo = $params['pseudo'];
        $password = $params['password'];

        if(AuthHelper::authenticate($pseudo, $password)){
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