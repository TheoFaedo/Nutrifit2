<?php

namespace App\Helpers;

use app\models\User;

class AuthHelper{

    /**
     * @param $pseudo : pseudo to authenticate
     * @param $password : password of the user to authenticate
     * @return true if authenticated false otherwise
     */
    public static function authenticate($pseudo, $password){
        if($user = User::authenticate($pseudo, $password)){
            $_SESSION['user'] = $user->toArray();
            return true;
        }
        return false;
    }
}