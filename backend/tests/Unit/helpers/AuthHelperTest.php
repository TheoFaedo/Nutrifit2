<?php

namespace tests\Unit\helpers;

require 'vendor/autoload.php';

use PHPUnit\Framework\TestCase;

use app\helpers\DBConnection;

use app\helpers\AuthHelper;

use app\models\User;

class AuthHelperTest extends TestCase
{
    
    protected $userSaved;

    /*protected function setUp(): void
    {
        session_start();
        if(isset($_SESSION['user'])){
            unset($_SESSION['user']);
        }
    }*/

    protected function tearDown(): void
    {
        if($this->userSaved != null){
            $this->userSaved->delete();
        }
        if(isset($_SESSION['user'])){
            unset($_SESSION['user']);
        }
    }
    
    public function testAuthenticate(){
        if(isset($_SESSION['user'])){
            unset($_SESSION['user']);
        }

        DBConnection::creerConnectionTest();

        $this->userSaved = new User();
        $this->userSaved->pseudo = "test";
        $this->userSaved->mail = "test";
        $this->userSaved->pwdhash = password_hash("test", PASSWORD_DEFAULT);
        $this->userSaved->save();

        $res = AuthHelper::authenticate("test", "test");
        $this->assertTrue(isset($_SESSION['user']));
        //$this->assertEquals($this->userSaved->idUser, $_SESSION['user']['idUser']);
        //$this->assertEquals($this->userSaved->pseudo, $_SESSION['user']['pseudo']);
        //$this->assertEquals($this->userSaved->mail, $_SESSION['user']['mail']);
    }
}