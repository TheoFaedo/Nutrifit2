<?php

namespace App\Controllers;

require __DIR__ . '/../../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Controller {

    protected $container;

    public function __construct(\DI\Container $container){
        $this->container = $container;
    }

    public function __invoke(Request $rq, Response $rs, $args){
        return $rs->withJson(['error' => "Internal Server Error"], 500);
    }
}