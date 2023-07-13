<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\Consumable;
use App\Models\User;

class ConsumableRequestTest extends TestCase{

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

        $request = $this->createRequest('GET', '/consumable/1/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['consumable' => 
        [
            'idConsumable' => 1,
            'name' => 'test1',
            'energy' => 0,
            'fats' => 0,
            'carbohydrates' => 0,
            'proteins' => 0,
            'quantity_label' => '',
            'public' => 1,
            'type' => 'RECIPE',
            'author' => 99999
        ]
        ], $data);
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
            ->willReturn(['idUser' => 99999]);

        $request = $this->createRequest('GET', '/consumable/564/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => "Consumable don't exist."], $data);
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
            ->willReturn(['idUser' => 99999]);

        $request = $this->createRequest('GET', '/consumable/2/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => "Not authorized"], $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $request = $this->createRequest('GET', '/consumables/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['error' => "Not authentified"], $data);
    }

    function createDataSet(){
        $consumableData = [
            ['idConsumable' => 1, 'name' => 'test1', 'author' => 99999],
            ['idConsumable' => 2, 'name' => 'test2', 'author' => 99998]
        ];
        
        $user = new User();
        $user->idUser = 99999;
        $user->pseudo = 'test';
        $user->mail = 'test@gmail.com';
        $user->save();

        $user2 = new User();
        $user2->idUser = 99998;
        $user2->pseudo = 'test2';
        $user2->mail = 'test2@gmail.com';
        $user2->save();

        foreach ($consumableData as $data) {
            $consumable = new Consumable();
            $consumable->idConsumable = $data['idConsumable'];
            $consumable->name = $data['name'];
            $consumable->author = $data['author'];
            $consumable->public = 1;
            $consumable->save();
            array_push($this->models, $consumable);
        }

        array_push($this->models, $user);
        array_push($this->models, $user2);

    }

}