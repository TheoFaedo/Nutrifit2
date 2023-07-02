<?php

namespace tests\Unit\models;

require 'vendor/autoload.php';

use PHPUnit\Framework\TestCase;

use app\helpers\DBConnection;

use app\models\User;

class UserTest extends TestCase {

    /**
     * @dataProvider dataProviderExist
     */
    public function testExist($param)
    {
        DBConnection::creerConnectionTest();

        $userSaved = new User();
        $userSaved->idUser = 9999999;
        $userSaved->pseudo = 'test';
        $userSaved->mail = 'test';
        $userSaved->save();

        $user = new User();
        $user->idUser = $param['idUser'];
        $user->pseudo = $param['pseudo'];
        $user->mail = $param['mail'];

        $this->assertTrue($user->exist());

        $userSaved->delete();

        $this->assertFalse($user->exist());
    }

    public function testAuthentication(){
        DBConnection::creerConnectionTest();

        $user = new User();
        $user->idUser = 9999999;
        $user->pseudo = 'test';
        $user->mail = 'test';
        $user->pwdhash = password_hash('test', PASSWORD_DEFAULT);
        $user->save();

        $this->assertTrue(User::authenticate($pseudo, $password) == $user);
    }


    /*******
     * 
     *  DATA PROVIDERS
     * 
     ******/

    public static function dataProviderExist()
    {
        return [
            [['idUser' => null, 'pseudo' => null, 'mail' => 'test3']],
            [['idUser' => null, 'pseudo' => 'test3', 'mail' => null]],
            [['idUser' => null, 'pseudo' => 'test3', 'mail' => 'test3']],      
            [['idUser' => 9999999, 'pseudo' => null, 'mail' => null]],
            [['idUser' => 9999999, 'pseudo' => null, 'mail' => 'test3']],
            [['idUser' => 9999999, 'pseudo' => 'test3', 'mail' => null]],
            [['idUser' => 9999999, 'pseudo' => 'test3', 'mail' => 'test3']] 
        ];
    }

}