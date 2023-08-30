<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\Consumable;
use App\Models\User;

class ConsumablesRequestTest extends TestCase{

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

    public function testForPublic(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('GET', '/consumables/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['consumables' => array(
            [
                'idConsumable' => 1,
                'name' => 'test1',
                'author' => 99999,
                'energy' => 0,
                'fats' => 0,
                'carbohydrates' => 0,
                'proteins' => 0,
                'quantity_label' => '',
                'is_public' => 1,
                'type' => 'RECIPE'
            ],
            [
                'idConsumable' => 2,
                'name' => 'test2',
                'author' => 99998,
                'energy' => 0,
                'fats' => 0,
                'carbohydrates' => 0,
                'proteins' => 0,
                'quantity_label' => '',
                'is_public' => 1,
                'type' => 'RECIPE'
            ]
        )], $data);
    }

    public function testWithAuthorParameter(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('GET', '/consumables/token99998');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['consumables' => array(
            [
                'idConsumable' => 2,
                'name' => 'test2',
                'author' => 99998,
                'energy' => 0,
                'fats' => 0,
                'carbohydrates' => 0,
                'proteins' => 0,
                'quantity_label' => '',
                'is_public' => 1,
                'type' => 'RECIPE'
            ]
        )], $data);
    }

    public function testWithSearchArgument(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('GET', '/consumables/')
        ->withQueryParams(['q' => 'test2']);

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['consumables' => array(
            [
                'idConsumable' => 2,
                'name' => 'test2',
                'author' => 99998,
                'energy' => 0,
                'fats' => 0,
                'carbohydrates' => 0,
                'proteins' => 0,
                'quantity_label' => '',
                'is_public' => 1,
                'type' => 'RECIPE'
            ]
        )], $data);
    }

    public function testWithSearchArgumentNotExist(){
        $app = $this->getAppInstance();
        $container = $app->getContainer();

        $this->createDataSet();

        $sessionMock = $container->get('session');
        $sessionMock = $this->authentifyByMock($sessionMock);

        $request = $this->createRequest('GET', '/consumables/')
        ->withQueryParams(['q' => 'dzfsfsdfs']);

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals(['consumables' => array()], $data);
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
        $user2->token = 'token99998';
        $user2->pseudo = 'test2';
        $user2->mail = 'test2@gmail.com';
        $user2->save();

        foreach ($consumableData as $data) {
            $consumable = new Consumable();
            $consumable->idConsumable = $data['idConsumable'];
            $consumable->name = $data['name'];
            $consumable->author = $data['author'];
            $consumable->is_public = 1;
            $consumable->save();
            array_push($this->models, $consumable);
        }

        array_push($this->models, $user);
        array_push($this->models, $user2);

    }

}