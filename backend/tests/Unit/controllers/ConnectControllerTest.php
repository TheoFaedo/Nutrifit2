<?php

namespace test\Unit\controllers;

require 'vendor/autoload.php';

use Slim\Psr7\Factory\ServerRequestFactory;

use Slim\Http\Environment;
use Slim\Http\Request;
use Slim\Http\Response;

use PHPUnit\Framework\TestCase;

use app\helpers\DBConnection;

use app\models\User;

use app\controllers\ConnectController;

use tests\Traits\AppTestTrait;

class ConnectControllerTest extends TestCase
{
    use AppTestTrait;

    protected $userSaved;


    protected function tearDown(): void
    {
        if($this->userSaved != null){
            $this->userSaved->delete();
        }
        if(isset($_SESSION['user'])){
            unset($_SESSION['user']);
        }
    }

    public function test()
    {
        $this->userSaved = new User();
        $this->userSaved->pseudo = "test";
        $this->userSaved->mail = "test";
        $this->userSaved->pwdhash = password_hash("test", PASSWORD_DEFAULT);
        $this->userSaved->save();

        $request = $this->createJsonRequest('GET', '/Nutrifit2/backend/connect?pseudo=test&password=test');
        $response = $this->app->handle($request);

        $payload = (string) $response->getBody();
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('{"success":true}', (string) $response->getBody());
        $this->assertTrue(isset($_SESSION['user']));
    }

    public function testIfNoValueError()
    {
        $request = $this->createJsonRequest('GET', '/Nutrifit2/backend/connect');
        $response = $this->app->handle($request);

        $payload = (string) $response->getBody();

        $this->assertEquals(400, $response->getStatusCode());
        $this->assertEquals('{"error":"need identifiers"}', (string) $response->getBody());
        $this->assertFalse(isset($_SESSION['user']));
    }

    public function testIfIdsError()
    {
        $this->userSaved = new User();
        $this->userSaved->pseudo = "test";
        $this->userSaved->mail = "test";
        $this->userSaved->pwdhash = password_hash("test", PASSWORD_DEFAULT);
        $this->userSaved->save();

        $request = $this->createJsonRequest('GET', '/Nutrifit2/backend/connect?pseudo=a&password=a');
        $response = $this->app->handle($request);

        $payload = (string) $response->getBody();

        $this->assertEquals(401, $response->getStatusCode());
        $this->assertEquals('{"error":"Invalid username or password"}', (string) $response->getBody());
        $this->assertFalse(isset($_SESSION['user']));
    }
}