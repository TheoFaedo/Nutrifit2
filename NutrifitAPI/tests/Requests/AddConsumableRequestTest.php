<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\RecipeComposition;
use App\Models\Consumable;
use App\Models\User;

class AddConsumableRequestTest extends TestCase{

    protected function setUp(): void{
        parent::setUp();
    }

    protected function tearDown(): void{
        parent::tearDown();
        RecipeComposition::query()->delete();
        Consumable::query()->delete();
        User::query()->delete();
    }

    public function testSuccessForMeal(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);
        $sessionMock->expects($this->any())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 99999]);

        $request = $this->createRequest('POST', '/addconsumable/')
        ->withParsedBody([
            'name' => 'test1',
            'energy' => 100,
            'proteins' => 100,
            'fats' => 100,
            'carbohydrates' => 100,
            'quantity_label' => '100g',
            'public' => 1,
            'type' => 'MEAL'
        ]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['success' => true], $data);
    }

    public function testSuccessForRecipe(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);
        $sessionMock->expects($this->any())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 99999]);

        $request = $this->createRequest('POST', '/addconsumable/')
        ->withParsedBody([
            'name' => 'test3',
            'energy' => 100,
            'proteins' => 100,
            'fats' => 100,
            'carbohydrates' => 100,
            'quantity_label' => '100g',
            'public' => 1,
            'type' => 'RECIPE',
            'ingredients' => [
                [
                    'idConsumable' => 1,
                    'proportion' => 2.5
                ],
                [
                    'idConsumable' => 2,
                    'proportion' => 1
                ]
            ]
        ]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $consumable = Consumable::query()->where('name', 'test3')->first();

        $this->assertEquals(['success' => true], $data);
        $this->assertNotNull($consumable);
        $this->assertEquals(450, $consumable->energy);
        $this->assertEquals(450, $consumable->proteins);
        $this->assertEquals(450, $consumable->fats);
        $this->assertEquals(450, $consumable->carbohydrates);
    }

    public function testMissingParameters(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('POST', '/addconsumable/')
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
        
        $consumable = new Consumable();
        $consumable->idConsumable = 1;
        $consumable->name = 'test1';
        $consumable->author = 99999;
        $consumable->public = 1;
        $consumable->energy = 100;
        $consumable->proteins = 100;
        $consumable->fats = 100;
        $consumable->carbohydrates = 100;
        $consumable->quantity_label = '100g';
        $consumable->save();

        $consumable = new Consumable();
        $consumable->idConsumable = 2;
        $consumable->name = 'test2';
        $consumable->author = 99999;
        $consumable->public = 1;
        $consumable->energy = 200;
        $consumable->proteins = 200;
        $consumable->fats = 200;
        $consumable->carbohydrates = 200;
        $consumable->quantity_label = '100g';
        $consumable->save();

    }

} 