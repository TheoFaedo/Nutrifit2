<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\User;

class ChangeNutritionnalGoalRequestTest extends TestCase{

    protected function setUp(): void{
        parent::setUp();
    }

    protected function tearDown(): void{
        parent::tearDown();
        User::query()->delete();
    }

    public function testSuccess(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);
        $sessionMock->expects($this->any())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 99999]);

        $user = User::where('idUser', 99999)->first();

        $staticexecutor = $container->get('staticexecutor');
        $staticexecutor->expects($this->any())
            ->method('execute')
            ->with('App\Models\User', 'find', 99999)
            ->willReturn($user);

        $request = $this->createRequest('PUT', '/changenutritionalgoal/')
        ->withParsedBody([
            'energy_goal' => 100,
            'proteins_goal' => 100,
            'fats_goal' => 100,
            'carbohydrates_goal' => 100
        ]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['success' => true], $data);
        $this->assertNotNull($user);
        $this->assertEquals(100, $user->energy_goal);
        $this->assertEquals(100, $user->proteins_goal);
        $this->assertEquals(100, $user->fats_goal);
        $this->assertEquals(100, $user->carbohydrates_goal);
    }

    public function testMissingParameters(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('PUT', '/changenutritionalgoal/')
        ->withParsedBody([]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => 'Missing parameters'], $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $this->createDataSet();

        $request = $this->createRequest('PUT', '/changenutritionalgoal/')
        ->withParsedBody([]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => "Not authentified"], $data);
    }

    function createDataSet(){
        $user = new User();
        $user->idUser = 99999;
        $user->pseudo = 'test';
        $user->mail = 'test@gmail.com';
        $user->energy_goal = 2000;
        $user->fats_goal = 70;
        $user->carbohydrates_goal = 210;
        $user->proteins_goal = 140;
        $user->save();  
    }

} 