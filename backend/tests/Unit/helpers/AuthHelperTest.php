<?php

namespace tests\Unit\helpers;

require 'vendor/autoload.php';

use PHPUnit\Framework\TestCase;

use app\helpers\DBConnection;

use app\helpers\AuthHelper;

class AuthHelperTest extends TestCase
{
    public function testAuthenticate(){
        start_session();
        if(isset($_SESSION['user'])){
            unset($_SESSION['user']);
        }

        DBConnection::creerConnectionTest();

        $user = new User();
        $user->pseudo = "test";
        $user->mail = "test";
        $user->password = password_hash("test", PASSWORD_DEFAULT);
        $user->save();

        AuthHelper::authenticate("test", "test");        
        $this->assertTrue(isset($_SESSION['user']));
        $this->assertEquals($user->idUser, $_SESSION['user']['idUser']);
        $this->assertEquals($user->pseudo, $_SESSION['user']['pseudo']);
        $this->assertEquals($user->mail, $_SESSION['user']['mail']);

        unset($_SESSION['user']);
        $user->delete();
    }
}