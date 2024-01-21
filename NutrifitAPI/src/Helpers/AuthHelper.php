<?php

namespace App\Helpers;

use App\Models\User;

use App\Application\Session;
use App\Application\StaticExecutor;

class AuthHelper{

    const AUTH_COOKIE_EXPIRE = 3600 * 24 * 30; // 30 days

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
            setcookie('auth',$user['idUser'] . ":::::" . sha1($user->pseudo . $user->pwdhash . $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT'])
            , time() + self::AUTH_COOKIE_EXPIRE, '/', '', false, true);
            $this->session->setItem('user', $user->toArray());
            return $user;
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
        if(isset($_COOKIE['auth']) && !$this->session->has('user')){
            $auth = $_COOKIE['auth'];
            $auth = explode(':::::', $auth);
            $user = $this->staticexecutor->execute('App\Models\User', 'find', $auth[0]);

            if(!$user) return false;

            if(sha1($user->pseudo . $user->pwdhash . $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']) === $auth[1]){
                echo('fsdfsdfs');
                $this->session->setItem('user', $user->toArray());
                return true;
            }
        }
        return $this->session->has('user') ? true : false;
    }

     /**
     * Log out the user.
     * @return bool Returns true if the user is successfully logged out.
     */
    public function logout(){
        if($this->authentified()){
            unset($_COOKIE['auth']);
            setcookie('auth', '', -1, '/');
            $this->session->unset('user')->end();
            return true;
        }
        return false;
    }
}