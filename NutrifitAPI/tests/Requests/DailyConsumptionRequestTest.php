<?php

namespace Tests\Requests;

use Tests\TestCase;
use App\Helpers\AuthHelper;

use App\Helpers\DBConnection;

use App\Application\Session;
use App\Application\StaticExecutor;

use App\Models\Consumable;
use App\Models\User;
use App\Models\Consumption;

class DailyConsumptionRequestTest extends TestCase{

    private $users = [];
    private $consumables = [];
    private $consumptions = [];
    private $today;

    protected function setUp(): void{
        parent::setUp();
        $this->today = date('Y-m-d H:i:s');
    }

    protected function tearDown(): void{
        parent::tearDown();
        foreach ($this->consumptions as $consumption) {
            $consumption->delete();
        }
        foreach ($this->consumables as $consumable) {
            $consumable->delete();
        }
        foreach ($this->users as $user) {
            $user->delete();
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

        $request = $this->createRequest('GET', '/dailyconsumption/');

        $response = $app->handle($request);

        $json = (string) $response->getBody();
        $data = json_decode($json, true);

        $this->assertEquals( array (
            1 => array (
                'idConsumption' => 1,
                'idConsumable' => 1,
                'idUser' => 99999,
                'consumed_on' => $this->today,
                'last_update' => $this->today,
                'proportion' => 1
            ),
            2 => array (
                'idConsumption' => 2,
                'idConsumable' => 1,
                'idUser' => 99999,
                'consumed_on' => $this->today,
                'last_update' => $this->today,
                'proportion' => 2
            )
        ), $data);
    }

    public function testNotAuthentified(){
        $app = $this->getAppInstance();

        $request = $this->createRequest('GET', '/dailyconsumption/');

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

        $consumptionData = [
            ['idConsumption' => 1, 'idUser' => 99999, 'idConsumable' => 1, 'proportion' => 1],
            ['idConsumption' => 2, 'idUser' => 99999, 'idConsumable' => 1, 'proportion' => 2]
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

        array_push($this->users, $user);
        array_push($this->users, $user2);

        foreach ($consumableData as $consumabledata) {
            $consumable = new Consumable();
            $consumable->idConsumable = $consumabledata['idConsumable'];
            $consumable->name = $consumabledata['name'];
            $consumable->author = $consumabledata['author'];
            $consumable->is_public = 1;
            $consumable->save();
            array_push($this->consumables, $consumable);
        }

        foreach ($consumptionData as $consumptiondata) {
            $consumption = new Consumption();
            $consumption->idConsumption = $consumptiondata['idConsumption'];
            $consumption->idUser = $consumptiondata['idUser'];
            $consumption->idConsumable = $consumptiondata['idConsumable'];
            $consumption->consumed_on = $this->today;
            $consumption->last_update = $this->today;
            $consumption->proportion = $consumptiondata['proportion'];
            $consumption->save();
            array_push($this->consumptions, $consumption);
        }
    }

}