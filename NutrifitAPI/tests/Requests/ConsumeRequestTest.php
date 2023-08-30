<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\RecipeComposition;
use App\Models\Consumption;
use App\Models\Consumable;
use App\Models\User;

class ConsumeRequestTest extends TestCase{

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

        $request = $this->createRequest('POST', '/consume/')
        ->withParsedBody([
            'idConsumable' => 1,
            'proportion' => 2,
        ]);
        $response = $app->handle($request);

        $consumptionCreated = Consumption::where(['idConsumable' => 1])->first();

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['success' => true], $data);
        $this->assertNotNull($consumptionCreated);
    }

    public function testMissingParameters(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('POST', '/consume/')
        ->withParsedBody([]);
        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => 'Missing parameters'], $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $this->createDataSet();

        $request = $this->createRequest('POST', '/consume/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => "Not authentified"], $data);
    }

    function createDataSet(){

        $consumableData = [
            ['idConsumable' => 1, 'name' => 'test1', 'author' => 99999],
            ['idConsumable' => 2, 'name' => 'test1', 'author' => 99999]
        ];

        $user = new User();
        $user->idUser = 99999;
        $user->pseudo = 'test';
        $user->mail = 'test@gmail.com';
        $user->energy_goal = 2000;
        $user->fats_goal = 70;
        $user->carbohydrates_goal = 210;
        $user->proteins_goal = 140;
        $user->save();

        foreach ($consumableData as $consumabledata) {
            $consumable = new Consumable();
            $consumable->idConsumable = $consumabledata['idConsumable'];
            $consumable->name = $consumabledata['name'];
            $consumable->author = $consumabledata['author'];
            $consumable->is_public = 1;
            $consumable->save();
        }
        
    }

} 