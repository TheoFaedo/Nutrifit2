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

class ChangeConsumableRequestTest extends TestCase{

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

        $request = $this->createRequest('PUT', '/changeconsumable/1/')
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

    public function testMissingParameters(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('PUT', '/changeconsumable/1/')
        ->withParsedBody([]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => 'Missing parameters'], $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $this->createDataSet();

        $request = $this->createRequest('PUT', '/changeconsumable/1/')
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
        $consumable->type = 'MEAL';
        $consumable->save();

        $recipecomposition = new RecipeComposition();
        $recipecomposition->idRecipe = 1;
        $recipecomposition->idIngredient = 1;
        $recipecomposition->proportion = 2;

    }

} 