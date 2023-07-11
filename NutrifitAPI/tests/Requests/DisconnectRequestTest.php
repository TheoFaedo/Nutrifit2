<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;
use App\Models\User;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

class DisconnectRequestTest extends TestCase{

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

    public function test(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $staticexecutorMock = $container->get('staticexecutor');
        $sessionMock = $container->get('session');

        $sessionMock->expects($this->any())
            ->method('has')
            ->with('user')
            ->willReturn(true);
        $sessionMock->expects($this->any())
            ->method('unset')
            ->with('user')
            ->willReturnSelf();

        $request = $this->createRequest('GET', '/disconnect');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['success' => true], $data);
    }
}
