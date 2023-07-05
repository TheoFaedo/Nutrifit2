<?php

use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

use app\helpers\DBConnection;

use app\controllers\ConnectController;

return function (App $app) {
    $app->setBasePath("/Nutrifit2/backend");

    $app->get('/connect[/]', function(Request $rq, Response $rs, $args) {
        $cont = new ConnectController($this);
        return $cont->perform($rq, $rs, $args);
    });
    
    $app->post('/register[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->get('/consumables[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->get('/consumables/{id_user}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->get('/consumable/{id_consumable}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->get('/dailyconsumption[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->get('/nutrionalgoal[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->post('/consume/{id_consumable}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->put('/changenutrionalgoal/{id_user}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->post('/addconsumable[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->put('/changeconsumable/{id_consumable}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->get('/consuptionondate/{date}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->delete('/removeconsumable/{id_consumable}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
    
    $app->delete('/removeconsumption/{id_consumption}[/]', function(Request $rq, Response $rs, $args) {
        return "must be written";
    });
};