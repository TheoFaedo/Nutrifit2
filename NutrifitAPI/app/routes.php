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

    $app->get('/connect[/]', function (Request $request, Response $response, $args) {
        $controller = new ConnectController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/disconnect[/]', function (Request $request, Response $response, $args) {
        $controller = new DisconnectController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->post('/register[/]', function (Request $request, Response $response, $args) {
        $controller = new RegisterController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->group('/consumables', function (Group $group) {

        // Get all consumables who are public
        $group->get('/', function ($request, $response, array $args) {
            $controller = new PublicConsumablesController();

            return $controller->__invoke($request, $response, $args);
        });

        // Get all consumables created by the specified user
        $group->get('/{author_id:[0-9]+}[/]', function ($request, $response, array $args) {

            $controller = new ConsumablesOfAuthorController();

            return $controller->__invoke($request, $response, $args);
        });
    });

    $app->get('/consumable/{id:[0-9]+}[/]', function (Request $request, Response $response, $args) {
        $controller = new ConsumableByIdController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/dailyconsumption[/]', function (Request $request, Response $response, $args) {
        $controller = new DailyConsumptionController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/nutritionalgoal[/]', function (Request $request, Response $response, $args) {
        $controller = new NutritionalGoalController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->post('/consume[/]', function (Request $request, Response $response, $args) {
        $controller = new ConsumeController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->put('/changenutritionalgoal[/]', function (Request $request, Response $response, $args) {
        $controller = new ChangeNutritionalGoalController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->post('/addconsumable[/]', function (Request $request, Response $response, $args) {
        $controller = new AddConsumableController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->put('/changeconsumable/{id_cons:[0-9]+}[/]', function (Request $request, Response $response, $args) {
        $controller = new ChangeConsumableController();

        return $controller->__invoke($request, $response, $args);
    });

    $app->get('/consumptionatdate[/]', function (Request $request, Response $response, $args) {
        $controller = new ConsumptionAtDateController();

        return $controller->__invoke($request, $response, $args);
    });
};
