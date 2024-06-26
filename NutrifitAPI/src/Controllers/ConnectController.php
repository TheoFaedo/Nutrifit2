<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;
use App\Helpers\ErrorHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class ConnectController extends Controller{

    public function __construct(\DI\Container $container){
        parent::__construct($container);
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $params = $rq->getQueryParams();

        $res = [];

        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));
        
        if(!isset($params['pseudo']) || !isset($params['password'])){
            $res = ['error' => "need identifiers"];
            
            
            $rs->getBody()->write(json_encode($res));
            $rs= $rs->withStatus(400);
            return $rs->withHeader('Content-Type', 'application/json');
        }

        $pseudo = $params['pseudo'];
        $password = $params['password'];

        if(($user = $authhelper->authentify($pseudo, $password)) !== false){
            $res = [
                'username' => $user->pseudo,
                'mail'=> $user->mail,
                'gender' => $user->gender,
                'token'=> $user->token,
                'level' => $user->level,
                'exp' => $user->xp,
                'lang' => $user->lang,
                'pp' => $user->profile_path
            ];

            $rs->getBody()->write(json_encode($res));
            $rs = $rs->withStatus(200);
            return $rs->withHeader('Content-Type', 'application/json');
        }else{
            $res = ErrorHelper::error_to_json_format(401, "Wrong login or password", 2001);

            $rs->getBody()->write(json_encode(["error" => $res], true));
            $rs = $rs->withStatus(401);
            return $rs->withHeader('Content-Type', 'application/json');
        }
    }

}