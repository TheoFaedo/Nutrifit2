<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\Consumable;
use App\Models\User;

class NutritionalGoalRequestTest extends TestCase{

    private $models = [];

    protected function setUp(): void{
        parent::setUp();
    }

    protected function tearDown(): void{
        parent::tearDown();
        foreach ($this->models as $model) {
            $model->delete();
        }
    }

    public function test(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);
        $sessionMock->expects($this->any())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 99999]);

        $request = $this->createRequest('GET', '/nutritionalgoal/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(
            array(
                'idUser' => 99999,
                'energy_goal' => 2000,
                'proteins_goal' => 140,
                'carbohydrates_goal' => 210,
                'fats_goal' => 70
             ), $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $request = $this->createRequest('GET', '/nutritionalgoal/');

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

        array_push($this->models, $user);
    }
    
}