<?php

namespace app\controllers;

use app\controllers\Controller;

require 'vendor/autoload.php';

class RegisterController extends Controller{

    public function __construct($container){
        parent::__construct($container);
    }

    /**
     * Authenticate the user
     * @return Result json with sucess value, json with error message if error
     */
    public function perform($rq, $rs, $args){
        
    }

}