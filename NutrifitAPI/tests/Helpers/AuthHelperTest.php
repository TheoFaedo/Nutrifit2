<?php

use Tests\TestCase;
use App\Helpers\AuthHelper;
use App\Models\User;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

class AuthHelperTest extends TestCase
{

    protected function setUp(): void{
        parent::setUp();

        DBConnection::creerConnectionTest();
    }

    public function testAuthentify()
    {
        $userMock = $this->createMock(User::class);

        $sessionMock = $this->createMock(Session::class);
        $sessionMock->expects($this->any())
            ->method('setItem')
            ->with('user', $userMock->toArray());

        $staticExecutoMock = $this->createMock(StaticExecutor::class);
        $staticExecutoMock->expects($this->any())
            ->method('execute')
            ->with('App\Models\User', 'authentify', 'john_doe', 'password123')
            ->willReturn($userMock);

        $authHelper = new AuthHelper($sessionMock, $staticExecutoMock);

        $result = $authHelper->authentify('john_doe', 'password123');

        $this->assertTrue($result);
    }

    public function testGetIdUserAuthentified()
    {
        $sessionMock = $this->createMock(Session::class);
        $sessionMock->expects($this->once())
            ->method('has')
            ->with('user')
            ->willReturn(true);
        $sessionMock->expects($this->once())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 1]);

        $authHelper = new AuthHelper($sessionMock);

        $result = $authHelper->getIdUserAuthentified();

        $this->assertSame(1, $result);
    }

    public function testGetUserAuthentified(){

        $userMock = $this->createMock(User::class);

        $sessionMock = $this->createMock(Session::class);
        $sessionMock->expects($this->any())
        ->method('has')
        ->with('user')
        ->willReturn(true);
        $sessionMock->expects($this->any())
        ->method('getItem')
        ->with('user')
        ->willReturn(['idUser' => 1]);

        $staticExecutoMock = $this->createMock(StaticExecutor::class);
        $staticExecutoMock->expects($this->any())
        ->method('execute')
        ->with('App\Models\User', 'find', 1)
        ->willReturn($userMock);

        $authHelper = new AuthHelper($sessionMock, $staticExecutoMock);

        $result = $authHelper->getUserAuthentified();

        $this->assertEquals($userMock, $result);
    }

    public function testAuthentified()
    {
        $sessionMock = $this->createMock(Session::class);
        $sessionMock->expects($this->once())
            ->method('has')
            ->with('user')
            ->willReturn(true);

        $authHelper = new AuthHelper($sessionMock);

        $result = $authHelper->authentified();

        $this->assertTrue($result);
    }

    public function testLogout()
    {
        $sessionMock = $this->createMock(Session::class);
        $sessionMock->expects($this->once())
            ->method('unset')
            ->with('user')
            ->willReturnSelf();
        $sessionMock->expects($this->once())
            ->method('end');

        $authHelper = new AuthHelper($sessionMock);

        $result = $authHelper->logout();

        $this->assertTrue($result);
    }
}