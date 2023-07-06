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
    }

    public function test()
    {
        $request = $this->createJsonRequest(
            'POST', 
            '/Nutrifit2/backend/register',
            [
                'pseudo' => 'Michael', 
                'pwd' => 'awesomepassword', 
                'mail' => 'test.d@gmail.com', 
                'gender' => 'M', 
                'goal' => '1'

            ]);
        
        $response = $this->app->handle($request);

        $payload = (string) $response->getBody();
        
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('{"success":true}', (string) $response->getBody());
        $this->assertTrue(isset($_SESSION['user']));
    }

    public function testIfNoValueError()
    {
        $request = $this->createJsonRequest('POST', '/Nutrifit2/backend/register', []);
        $response = $this->app->handle($request);

        $payload = (string) $response->getBody();

        $this->assertEquals(400, $response->getStatusCode());
        $this->assertEquals('{"errors":["pseudo" => "This field is required.","password" => "This field is required.","mail" => "This field is required.","gender" => "Gender is required","goal" => "Goal required."]}', 
        (string) $response->getBody());
    }

    public function testIfFormatError()
    {
        $request = $this->createJsonRequest(
            'POST', 
            '/Nutrifit2/backend/register', 
            [
                'pseudo' => 'Mi', 
                'pwd' => '@Mkj', 
                'mail' => 'michael.dagmail.com', 
                'gender' => 'Md', 
                'goal' => '4'
            ]);
        $response = $this->app->handle($request);

        $payload = (string) $response->getBody();

        $this->assertEquals(401, $response->getStatusCode());

        $this->assertEquals('{"errors":["pseudo" => "This field need minimum 3 characters.","password" => "This field need minimum 5 characters.","mail" => "This field need the @ symbol. (name@mail.com)","gender" => "gender is invalid","goal" => "invalid goal label."]}', 
        (string) $response->getBody());
    }
}