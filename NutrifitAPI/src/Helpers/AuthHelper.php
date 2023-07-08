<?php

namespace App\Helpers;

use App\Models\User;

class AuthHelper{

    /**
     * @param $pseudo : pseudo to authenticate
     * @param $password : password of the user to authenticate
     * @return true if authenticated false otherwise
     */
    public static function authentify($pseudo, $password){
        if($user = User::authentify($pseudo, $password)){
            $_SESSION['user'] = $user->toArray();
            return true;
        }
        return false;
    }

    /**
     * Retrieve the ID of the authenticated user from the session.
     * @return int The ID of the authenticated user, -1 if user is not authenticated.
     */
    public static function getIdUserAuthentified(){
        if(isset($_SESSION['user'])){
            return $_SESSION['user']['idUser'];
        }
        return -1;
    }

 
    /**
     * Get the authenticated user.
     *
     * @return User|false The authenticated user or false if not authenticated.
     */
    public static function getUserAuthentified(){
        if(AuthHelper::authentified()){
            return User::find(AuthHelper::getIdUserAuthentified());
        }
        return false;
    }

    /**
     * Checks if a user is connected.
     * @return bool True if a user is connected, false otherwise.
     */
    public static function authentified(){
        return isset($_SESSION['user']);
    }

     /**
     * Log out the user.
     * @return bool Returns true if the user is successfully logged out.
     */
    public static function logout(){
        unset($_SESSION['user']);
        session_destroy();
        return true;
    }
}