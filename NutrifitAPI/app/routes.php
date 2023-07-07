<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

//Controllers
use App\Controllers\ConnectController;
use App\Controllers\RegisterController;

return function (App $app) {

    $c = $app->getContainer();

    $app->options('/{routes:.*}', function (Request $request, Response $response, $args) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response, $args) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->get('/connect', function (Request $request, Response $response, $args) {
        $controller = new ConnectController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->post('/register', function (Request $request, Response $response, $args) {
        $controller = new RegisterController();

        return $controller->__invoke($request, $response, $args);
    });
};
