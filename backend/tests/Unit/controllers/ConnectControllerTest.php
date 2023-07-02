<?php

namespace app\constrollers;

require 'vendor/autoload.php';

use PHPUnit\Framework\TestCase;

use app\helpers\DBConnection;

class ConnectControllerTest extends TestCase
{

    protected $userMock;

    public function test()
    {
        start_session();
        if(isset($_SESSION['user'])){
            unset($_SESSION['user']);
        }

        $app = new \Slim\App();
        // Configure the app and dependencies
        DBConnection::creerConnectionTest();

        $user = new User();
        $user->pseudo = "test";
        $user->mail = "test";
        $user->password = password_hash("test", PASSWORD_DEFAULT);
        $user->save();

        $request = $this->createRequest('GET', '/connect?pseudo=test&password=test');
        $response = $app->handle($request);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('{"success":"true"}', (string) $response->getBody());
        $this->assertTrue(isset($_SESSION['user']));

        if(isset($_SESSION['user'])){
            unset($_SESSION['user']);
        }
    }
}