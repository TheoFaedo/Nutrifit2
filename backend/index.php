<?php

use DI\Container;
use Slim\Factory\AppFactory;

use app\models\User;

use app\helpers\DBConnection;

session_start();

require __DIR__ . '/vendor/autoload.php';

$container = new Container();

DBConnection::creerConnection();

$settings = require __DIR__ . '/src/settings/settings.php';
$settings($container);

AppFactory::setContainer($container);
$app = AppFactory::create();

$middleware = require __DIR__ . '/src/settings/middleware.php';
$middleware($app);

$routes = require __DIR__ . '/src/settings/routes.php';
$routes($app);

//RUN
$app->run();