<?php

namespace App\Controllers;

use App\Controllers\Controller;

use App\Models\User;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

use App\Helpers\AuthHelper;

require __DIR__ . '/../../vendor/autoload.php';

class RegisterController extends Controller{

    public function __construct(\DI\Container $container){
        parent::__construct($container);
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $staticexecutor = $this->container->get('staticexecutor');

        $authhelper = new AuthHelper($this->container->get('session'), $staticexecutor);

        $input = $rq->getParsedBody();

        $user = $staticexecutor->execute('App\Models\User', 'register', $input);

        if(is_array($user)){
            $res = $user;
            
            $rs->getBody()->write(json_encode(["errors" => $res], TRUE));
            $rs= $rs->withStatus(400);
            return $rs->withHeader('Content-Type', 'application/json');
        }else{
            $res = ['success' => true];
            
            $rs->getBody()->write(json_encode($res));
            $rs = $rs->withStatus(200);
            return $rs->withHeader('Content-Type', 'application/json');
        }
    }

}