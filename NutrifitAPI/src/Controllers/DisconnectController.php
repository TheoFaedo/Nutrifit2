<?php

namespace App\Controllers;

use App\Helpers\AuthHelper;

use App\Controllers\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../../vendor/autoload.php';

class DisconnectController extends Controller{

    public function __construct($container){
        parent::__construct($container);
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $authhelper = new AuthHelper($this->container->get('session'), $this->container->get('staticexecutor'));

        if(!$authhelper->authentified()){
            $res['error'] = json_encode($_SESSION['user']);

            $rs->getBody()->write(json_encode($res));
            $rs= $rs->withStatus(401);
            return $rs->withHeader('Content-Type', 'application/json');
        }

        $authhelper->logout();

        $res['success'] = true;
        $rs->getBody()->write(json_encode($res));
        $rs= $rs->withStatus(200);
        return $rs->withHeader('Content-Type', 'application/json');
    }
}