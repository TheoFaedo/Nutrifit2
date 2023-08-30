<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\Consumption;
use App\Models\Consumable;
use App\Models\User;

class ConsumptionAtDateRequestTest extends TestCase{

    protected function setUp(): void{
        parent::setUp();
    }

    protected function tearDown(): void{
        parent::tearDown();
        Consumption::query()->delete();
        Consumable::query()->delete();
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

        $request = $this->createRequest('GET', '/consumptionatdate/')
        ->withQueryParams(['date' => '2019-01-01']);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals([1 => [
            'idConsumption' => 1,
            'idConsumable' => 1,
            'idUser' => 99999,
            'consumed_on' => '2019-01-01 00:00:00',
            'last_update' => '2019-01-01 00:00:00',
            'proportion' => 1
        ]], $data);

        $request = $this->createRequest('GET', '/consumptionatdate/')
        ->withQueryParams(['date' => '2019-01-02']);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals([], $data);
    }

    public function testMissingParameters(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);
        $sessionMock->expects($this->any())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 99999]);

        $request = $this->createRequest('GET', '/consumptionatdate/')
        ->withQueryParams([]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => 'Missing parameters'], $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $this->createDataSet();

        $request = $this->createRequest('GET', '/consumptionatdate/')
        ->withQueryParams([]);
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
        
        $consumable = new Consumable();
        $consumable->idConsumable = 1;
        $consumable->name = 'test1';
        $consumable->author = 99999;
        $consumable->is_public = 1;
        $consumable->energy = 100;
        $consumable->proteins = 100;
        $consumable->fats = 100;
        $consumable->carbohydrates = 100;
        $consumable->quantity_label = '100g';
        $consumable->type = 'MEAL';
        $consumable->save();

        $recipecomposition = new Consumption();
        $recipecomposition->idConsumption = 1;
        $recipecomposition->idConsumable = 1;
        $recipecomposition->idUser = 99999;
        $recipecomposition->consumed_on = '2019-01-01';
        $recipecomposition->last_update = '2019-01-01';
        $recipecomposition->proportion = 1;
        $recipecomposition->save();

    }

} 