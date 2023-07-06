<?php

namespace tests\Unit\models;

require 'vendor/autoload.php';

use PHPUnit\Framework\TestCase;

use app\helpers\DBConnection;

use app\models\User;

use tests\Traits\AppTestTrait;

class UserTest extends TestCase {

    use AppTestTrait;

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

    public function testAuthenticate(){
        DBConnection::creerConnectionTest();

        $this->userSaved = new User();
        $this->userSaved->idUser = 9999999;
        $this->userSaved->pseudo = 'test';
        $this->userSaved->mail = 'test';
        $this->userSaved->pwdhash = password_hash('test', PASSWORD_DEFAULT);
        $this->userSaved->save();

        $this->assertEquals(User::authenticate('test', 'test')->idUser, $this->userSaved->idUser);
    }

    /**
     * @dataProvider dataProviderRegisterValid
     */
    public function testRegisterValid($param){
        $this->userSaved = User::register($param);  
        $this->assertEquals($this->userSaved->idUser, $param['idUser']);
    }

    /**
     * @dataProvider dataProviderRegisterNotValid
     */
    public function testRegisterNotValid($param){
        $this->userSaved = User::register($param[0]);
        $this->assertEquals($this->userSaved, $param['result']);
    }

    public function testUserAlreadyExist(){
        
        $this->userSaved = new User();
        $this->userSaved->idUser = 9999999;
        $this->userSaved->pseudo = 'test';
        $this->userSaved->mail = 'test@test.com';
        $this->userSaved->save();

        $res = User::register($this->userSaved->toArray());

        $this->assertEquals($res, ['errors' => ['pseudo' => 'Pseudo already used', 'mail' => 'Mail already used']]);

        if(!is_array($res)){
            $res->delete();
        }
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

    public static function dataProviderRegisterValid()
    {
        return [
            [['pseudo' => 'Michael', 'pwd' => 'awesomepassword', 'mail' => 'test.d@gmail.com', 'gender' => 'M', 'goal' => '1'],
            'nutri' => [
                'energy' => '2600',
                'fats' => '80',
                'carbs' => '330',
                'proteins' => '140'
            ]],

            [['pseudo' => 'Jenifer', 'pwd' => 'P@ssword@25', 'mail' => 'jen.a@gmail.com', 'gender' => 'W', 'goal' => '2'],
            'nutri' => [
                'energy' => '2115',
                'fats' => '75',
                'carbs' => '270',
                'proteins' => '90'
            ]],

            [['pseudo' => 'Eren', 'pwd' => 'Awesome@854A', 'mail' => 'test@gmail.com', 'gender' => 'M', 'goal' => '3'],
            'nutri' => [
                'energy' => '1875',
                'fats' => '75',
                'carbs' => '210',
                'proteins' => '90'
            ]],

            [['pseudo' => 'Alison', 'pwd' => '4Lis0n546@', 'mail' => 'alison@gmail.com', 'gender' => 'W', 'goal' => '2'],
            'nutri' => [
                'energy' => '2115',
                'fats' => '75',
                'carbs' => '270',
                'proteins' => '90'
            ]]
        ];
    }

    public static function dataProviderRegisterNotValid()
    {
        return [
            [['pseudo' => 'Mi', 'pwd' => '@Mich4el654', 'mail' => 'michael.d@gmail.com', 'gender' => 'M', 'goal' => '1'],
            'result' => ['errors' => [
                'pseudo' => [
                    'This field need minimum 3 characters.'
                ]
            ]]],

            [['pseudo' => 'Michael', 'pwd' => '@Mds', 'mail' => 'michael.d@gmail.com', 'gender' => 'M', 'goal' => '1'],
            'result' => ['errors' => [
                'password' => [
                    'This field need minimum 5 characters.'
                ]
            ]]],

            [['pseudo' => 'Michael', 'pwd' => '@Mich4el654', 'mail' => 'michael.dagmail.com', 'gender' => 'M', 'goal' => '1'],
            'result' => ['errors' => [
                'mail' => [
                    'This field need the @ symbol. (name@mail.com)'
                ]
            ]]],

            [['pseudo' => 'Michaelazertyuiopqsdfgh', 'pwd' => '@Mich4el654', 'mail' => 'michael.d@gmail.com', 'gender' => 'M', 'goal' => '1'],
            'result' => ['errors' => [
                'pseudo' => [
                    'This field need maximum 20 characters.'
                ]
            ]]],

            [['pseudo' => 'Michael', 'pwd' => '@Mich4el654', 'mail' => 'michael.d@gmail.com', 'gender' => 'FSFSD', 'goal' => '1'],
            'result' => ['errors' => [
                'gender' => [
                    'gender is invalid'
                ]
            ]]],

            [['pseudo' => 'Michael', 'pwd' => '@Mich4el654', 'mail' => 'michael.d@gmail.com', 'gender' => 'M', 'goal' => '1ydhgf',
            'result' => ['errors' => [
                'goal' => [
                    'invalid goal label.'
                ]
            ]]]],

            [['pseudo' => 'Michael', 'pwd' => '@Mich4el654', 'mail' => 'michael.d@gmail.com', 'gender' => 'M', 'goal' => '4',
            'result' => ['errors' => [
                'goal' => [
                    'invalid goal label.'
                ]
            ]]]]
        ];
    }

}