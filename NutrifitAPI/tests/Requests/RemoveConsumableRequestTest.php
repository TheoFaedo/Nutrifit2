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

class RemoveConsumableRequestTest extends TestCase{

    protected function setUp(): void{
        parent::setUp();
    }

    protected function tearDown(): void{
        parent::tearDown();
        RecipeComposition::query()->delete();
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

        $request = $this->createRequest('DELETE', '/removeconsumable/1/');
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $consumable1 = Consumable::query()->where('idConsumable', 1)->first();
        $consumable2 = Consumable::query()->where('idConsumable', 2)->first();

        $this->assertEquals(['success' => true], $data);
        $this->assertNull($consumable1);
        $this->assertNotNull($consumable2);
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

        $request = $this->createRequest('DELETE', '/removeconsumable/2/');
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $consumable = Consumable::query()->where('idConsumable', 2)->first();
        $consumable2 = Consumable::query()->where('idConsumable', 1)->first();
        $recipecomposition = RecipeComposition::query()->where('idRecipe', 2)->first();

        $this->assertEquals(['success' => true], $data);
        $this->assertNull($consumable);
        $this->assertNull($recipecomposition);
        $this->assertNotNull($consumable2);
    }

    public function testNotAuthorized(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);
        $sessionMock->expects($this->any())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 99998]);
        
        $request = $this->createRequest('DELETE', '/removeconsumable/1/');
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => "Consumable not found or user not authorized"], $data);
    }

    public function testConsumableDontExist(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);
        $sessionMock->expects($this->any())
            ->method('getItem')
            ->with('user')
            ->willReturn(['idUser' => 99998]);
        
        $request = $this->createRequest('DELETE', '/removeconsumable/3/');
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => "Consumable not found or user not authorized"], $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $this->createDataSet();

        $request = $this->createRequest('DELETE', '/removeconsumable/1/')
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

        $user2 = new User();
        $user2->idUser = 99998;
        $user2->pseudo = 'test2';
        $user2->mail = 'test2@gmail.com';
        $user2->energy_goal = 2000;
        $user2->fats_goal = 70;
        $user2->carbohydrates_goal = 210;
        $user2->proteins_goal = 140;
        $user2->save();


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

        $consumable = new Consumable();
        $consumable->idConsumable = 2;
        $consumable->name = 'test2';
        $consumable->author = 99999;
        $consumable->is_public = 1;
        $consumable->energy = 200;
        $consumable->proteins = 200;
        $consumable->fats = 200;
        $consumable->carbohydrates = 200;
        $consumable->quantity_label = '100g';
        $consumable->type = 'RECIPE';
        $consumable->save();

        $recipecomposition = new RecipeComposition();
        $recipecomposition->idRecipe = 1;
        $recipecomposition->idIngredient = 1;
        $recipecomposition->proportion = 2.5;
        $recipecomposition->save();

    }

} 