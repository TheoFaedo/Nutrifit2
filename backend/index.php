<?php

require 'vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use app\models\User;

use app\helpers\DBConnection;

start_session();

$c = new \Slim\Container(['settings'=>['displayErrorDetails'=>true]]);
$app = new \Slim\App($c);

$app->get('/connect[/]', function( $rq, $rs, $args ) {
    DBConnection::creerConnection();

    $user = new User();
    $user->pseudo = "testjghjg";
    $user->idUser = 12;
    $user->mail = "zskjhgjgffgsdf";

    return $user->exist()."";
});

$app->post('/register[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->get('/consumables[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->get('/consumables/{id_user}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->get('/consumable/{id_consumable}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->get('/dailyconsumption[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->get('/nutrionalgoal[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->post('/consume/{id_consumable}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->put('/changenutrionalgoal/{id_user}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->post('/addconsumable[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->put('/changeconsumable/{id_consumable}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->get('/consuptionondate/{date}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->delete('/removeconsumable/{id_consumable}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});

$app->delete('/removeconsumption/{id_consumption}[/]', function( $rq, $rs, $args ) {
    return "must be written";
});


//RUN
$app->run();