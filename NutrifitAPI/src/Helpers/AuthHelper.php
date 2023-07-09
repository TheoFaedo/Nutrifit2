<?php

namespace App\Helpers;

use App\Models\User;

use App\Application\Session;
use App\Application\StaticExecutor;

class AuthHelper{

    private $session, $staticexecutor;

    public function __construct($session, $staticexecutor = null){
        $this->session = $session;
        if($staticexecutor !== null){
            $this->staticexecutor = $staticexecutor;
        }else{
            $this->staticexecutor = new StaticExecutor();
        }
    }

    /**
     * @param $pseudo : pseudo to authenticate
     * @param $password : password of the user to authenticate
     * @return true if authenticated false otherwise
     */
    public function authentify($pseudo, $password){
        $user = $this->staticexecutor->execute('App\Models\User', 'authentify', $pseudo, $password);
        if($user){
            $this->session->setItem('user', $user->toArray());
            return true;
        }
        return false;
    }

    /**
     * Retrieve the ID of the authenticated user from the session.
     * @return int The ID of the authenticated user, -1 if user is not authenticated.
     */
    public function getIdUserAuthentified(){
        if($this->session->has('user')){
            return $this->session->getItem('user')['idUser'];
        }
        return -1;
    }

 
    /**
     * Get the authenticated user.
     *
     * @return User|false The authenticated user or false if not authenticated.
     */
    public function getUserAuthentified(){
        if($this->authentified()){
            return $this->staticexecutor->execute('App\Models\User', 'find', $this->getIdUserAuthentified());
        }
        return false;
    }

    /**
     * Checks if a user is connected.
     * @return bool True if a user is connected, false otherwise.
     */
    public function authentified(){
        return $this->session->has('user') ? true : false;
    }

     /**
     * Log out the user.
     * @return bool Returns true if the user is successfully logged out.
     */
    public function logout(){
        $this->session->unset('user')->end();
        return true;
    }
}