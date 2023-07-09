<?php

namespace App\Controllers;

use App\Controllers\Controller;

use App\Models\User;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../../vendor/autoload.php';

class RegisterController extends Controller{

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function __invoke(Request $rq, Response $rs, $args){
        $authhelper = new AuthHelper();

        if($authhelper->authentified()){
            $input = $rq->getParsedBody();

            $user = User::register($input);

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
            
        }else{
            $res = ['error' => "Not authenticated"];
            
            $rs->getBody()->write(json_encode($res));
            $rs = $rs->withStatus(401);
            return $rs->withHeader('Content-Type', 'application/json');
        }
    }

}