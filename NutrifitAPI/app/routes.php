<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

use App\Application\Session;
use App\Application\StaticExecutor;

//Controllers
use App\Controllers\ConnectController;
use App\Controllers\DisconnectController;
use App\Controllers\RegisterController;
use App\Controllers\PublicConsumablesController;
use App\Controllers\ConsumablesOfAuthorController;
use App\Controllers\ConsumableByIdController;
use App\Controllers\DailyConsumptionController;
use App\Controllers\NutritionalGoalController;
use App\Controllers\ConsumeController;
use App\Controllers\ChangeNutritionalGoalController;
use App\Controllers\AddConsumableController;
use App\Controllers\ChangeConsumableController;
use App\Controllers\ConsumptionAtDateController;
use App\Controllers\RemoveConsumptionController;
use App\Controllers\RemoveConsumableController;

return function (App $app) {

    $container = $app->getContainer();

    $app->options('/{routes:.*}', function (Request $request, Response $response, $args) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response, $args) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->get('/connect[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new ConnectController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/disconnect[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new DisconnectController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->post('/register[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new RegisterController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->group('/consumables', function (Group $group) use ($container) {

        // Get all consumables created by the specified user
        $group->get('/{author_id}[/]', function ($request, $response, array $args) use ($container) {

            $controller = new ConsumablesOfAuthorController($container);

            return $controller->__invoke($request, $response, $args);
        });

    
        // Get all consumables who are public
        $group->get('/', function ($request, $response, array $args) use ($container) {
            $controller = new PublicConsumablesController($container);

            return $controller->__invoke($request, $response, $args);
        });

    });

    $app->get('/consumable/{id:[0-9]+}[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new ConsumableByIdController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/dailyconsumption[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new DailyConsumptionController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/nutritionalgoal[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new NutritionalGoalController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->post('/consume[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new ConsumeController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->put('/changenutritionalgoal[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new ChangeNutritionalGoalController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->post('/addconsumable[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new AddConsumableController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->put('/changeconsumable/{id_cons:[0-9]+}[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new ChangeConsumableController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/consumptionatdate[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new ConsumptionAtDateController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->delete('/removeconsumption/{id_cons:[0-9]+}[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new RemoveConsumptionController($container);

        return $controller->__invoke($request, $response, $args);
    });

    $app->delete('/removeconsumable/{id_cons:[0-9]+}[/]', function (Request $request, Response $response, $args) use ($container) {
        $controller = new RemoveConsumableController($container);

        return $controller->__invoke($request, $response, $args);
    });
};
