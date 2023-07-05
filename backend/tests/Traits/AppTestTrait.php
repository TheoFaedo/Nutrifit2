<?php

namespace tests\Traits;

require __DIR__ . '/../../vendor/autoload.php';


use DI\Container;
use DI\ContainerBuilder;

use app\models\User;

use Selective\TestTrait\Traits\ArrayTestTrait;
use Selective\TestTrait\Traits\ContainerTestTrait;
use Selective\TestTrait\Traits\HttpJsonTestTrait;
use Selective\TestTrait\Traits\HttpTestTrait;
use Selective\TestTrait\Traits\MockTestTrait;
use Slim\App;

use app\helpers\DBConnection;

/**
 * App Test Trait.
 */
trait AppTestTrait
{
    use ArrayTestTrait;
    use ContainerTestTrait;
    use HttpTestTrait;
    use HttpJsonTestTrait;
    use MockTestTrait;

    protected App $app;

    /**
     * Before each test.
     */
    protected function setUp(): void
    {
        DBConnection::creerConnectionTest();

        $containerBuilder = new ContainerBuilder();

        // Set up settings
        $containerBuilder->addDefinitions(__DIR__ . '/../../src/settings/container.php');

        // Build PHP-DI Container instance
        $container = $containerBuilder->build();

        $settings = require __DIR__ . '/../../src/settings/settings.php';
        $settings($container);

        $this->app = $container->get(App::class);

        $this->setUpContainer($container);

        //RUN
        $this->app->run();
    }
}