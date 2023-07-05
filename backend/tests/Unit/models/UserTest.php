<?php

namespace tests\Unit\models;

require 'vendor/autoload.php';

use PHPUnit\Framework\TestCase;

use app\helpers\DBConnection;

use app\models\User;

class UserTest extends TestCase {

    protected $userSaved;


    protected function tearDown(): void {
        if($this->userSaved != null){
            $this->userSaved->delete();
        }
    }


    /**
     * @dataProvider dataProviderExist
     */
    public function testExist($param)
    {
        DBConnection::creerConnectionTest();

        $this->userSaved = new User();
        $this->userSaved->idUser = 9999999;
        $this->userSaved->pseudo = 'test';
        $this->userSaved->mail = 'test';
        $this->userSaved->save();

        $user = new User();
        $user->idUser = $param['idUser'];
        $user->pseudo = $param['pseudo'];
        $user->mail = $param['mail'];

        $this->assertTrue($user->exist());

        $this->userSaved->delete();

        $this->assertFalse($user->exist());
    }

    public function testAuthentication(){
        DBConnection::creerConnectionTest();

        $this->userSaved = new User();
        $this->userSaved->idUser = 9999999;
        $this->userSaved->pseudo = 'test';
        $this->userSaved->mail = 'test';
        $this->userSaved->pwdhash = password_hash('test', PASSWORD_DEFAULT);
        $this->userSaved->save();

        $this->assertEquals(User::authenticate('test', 'test')->idUser, $this->userSaved->idUser);
    }


    /*******
     * 
     *  DATA PROVIDERS
     * 
     ******/

    public static function dataProviderExist()
    {
        return [
            [['idUser' => null, 'pseudo' => null, 'mail' => 'test']],
            [['idUser' => null, 'pseudo' => 'test', 'mail' => null]],
            [['idUser' => null, 'pseudo' => 'test', 'mail' => 'test']],      
            [['idUser' => 9999999, 'pseudo' => null, 'mail' => null]],
            [['idUser' => 9999999, 'pseudo' => null, 'mail' => 'test']],
            [['idUser' => 9999999, 'pseudo' => 'test', 'mail' => null]],
            [['idUser' => 9999999, 'pseudo' => 'test', 'mail' => 'test']] 
        ];
    }

}