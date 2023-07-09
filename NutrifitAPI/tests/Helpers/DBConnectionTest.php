<?php

use Tests\TestCase;
use App\Helpers\DBConnection;
use Illuminate\Database\Capsule\Manager as DB;

class DBConnectionTest extends TestCase
{
    public function testCreerConnection()
    {
        $db = DBConnection::creerConnection();

        $this->assertInstanceOf(DB::class, $db);
    }

    public function testCreerConnectionTest()
    {
        $db = DBConnection::creerConnectionTest();

        $this->assertInstanceOf(DB::class, $db);
    }
}