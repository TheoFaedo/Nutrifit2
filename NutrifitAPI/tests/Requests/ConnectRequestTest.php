<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;
use App\Models\User;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

class ConnectRequestTest extends TestCase{

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

    public function testNeedIdentifier(){
        $sessionMock = $this->createMock(Session::class);

        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $container->set('session', $sessionMock);

        $request = $this->createRequest('GET', '/connect');
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => 'need identifiers'], $data);
    }

    public function testIncorectIdentifiers(){
        $sessionMock = $this->createMock(Session::class);

        $app = $this->getAppInstance($sessionMock);

        $request = $this->createRequest('GET', '/connect');
        $queryParams = ['pseudo' => 'fds', 'password' => '7475'];
        $request = $request->withQueryParams($queryParams);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => 'Invalid username or password'], $data);
    }

    public function testValidIdentifiers(){
        $pseudo = 'test';
        $password = 'test';

        $this->userSaved = new User();
        $this->userSaved->pseudo = $pseudo;
        $this->userSaved->pwdhash = $password;
        $this->userSaved->save();
        

        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $sessionMock = $container->get('session');
        $sessionMock->expects($this->any())
            ->method('setItem')
            ->with('user', $this->userSaved->toArray());
        

        $staticexecutorMock = $container->get('staticexecutor');
        $staticexecutorMock->expects($this->any())
            ->method('execute')
            ->with('App\Models\User', 'authentify', $pseudo, $password)
            ->willReturn($this->userSaved);

        $request = $this->createRequest('GET', '/connect');
        $queryParams = ['pseudo' => 'test', 'password' => 'test'];
        $request = $request->withQueryParams($queryParams);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals([
            'success' => true,
            'pseudo' => $this->userSaved->pseudo,
            'idToken' => $this->userSaved->token]
        , $data);
    }

}