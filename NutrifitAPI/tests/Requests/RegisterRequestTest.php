<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;
use App\Models\User;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

class RegisterRequestTest extends TestCase{

    private User|null $userSaved = null;

    protected function setUp(): void{
        parent::setUp();
    }

    protected function tearDown(): void{
        parent::tearDown();
        if($this->userSaved !== null){
            $this->userSaved->delete();
        }
    }

    public function testValidIdentifiers(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();
    
        $staticexecutorMock = $container->get('staticexecutor');
        $staticexecutorMock->expects($this->any())
            ->method('execute')
            ->with('App\Models\User', 'register', [
                'pseudo' => 'test',
                'password' => 'test',
            ])
            ->willReturn(true);
    
        $request = $this->createRequest('POST', '/register')
        ->withParsedBody([
            'pseudo' => 'test',
            'password' => 'test',
        ]);
    
        $response = $app->handle($request);
    
        $json = (string) $response->getBody();
        $data = json_decode($json, true);
    
        $this->assertEquals(['success' => true], $data);
    }

    public function testInvalidFormatParameterized(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();
    }


}
