<?php

namespace app\controllers;

require 'vendor/autoload.php';

class Controller {

    private $container;

    public function __construct($container){
        $this->container = $container;
    }

    public function perform($rq, $rs, $args){
        return $rs->withJson(['error' => "Internal Server Error"], 500);
    }
}