<?php

namespace app\models;

require 'vendor/autoload.php';

use app\models\Model;

class User extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'user';
    protected $primaryKey = 'idUser';

    public function exist(){
        $user = User::where('idUser', '=', $this->idUser)
        ->orWhere('pseudo', '=', $this->pseudo)
        ->orWhere('mail', '=', $this->mail)
        ->first();
        
        return $user ? true : false;
    }

    /**
     * @param $pseudo : pseudo to authenticate
     * @param $password : password of the user to authenticate
     * @return User object if authentication concrated, null otherwise
     */
    public static function authenticate($pseudo, $password){
        $user = User::where('pseudo', '=', $pseudo)->first();
        if(!$user) return null;
        
        if(password_verify($password, $user->pwdhash)){
            return $user;
        }

        return null;
    }

    /** 
     * @param $information : information of user to register
     * @return boolean true if registered, false otherwise
    */
    public static function register($information){
        return true;
    } 

}
