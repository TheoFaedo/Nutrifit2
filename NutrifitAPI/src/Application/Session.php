<?php

namespace App\Application;

/**
 * A simple Session Adapter in order to offer easyness on Unit testing.
 */
class Session
{

    private $started=false;

    /**
     * Start the session
     * @return Session
     */
    public function start()
    {
        if(!$this->started){
            session_start();
            $this->started=true;
        }
        return $this;
    }

    /**
     * Sets or replaces a session value.
     *  
     * @param String|Integer $key The Session Item
     * @param Mixed $value The value of this Session Item
     * @return Session
     */
    public function setItem($key,$value)
    {
        $_SESSION[$key]=$value;
        return $this;
    }


    /**
     * Returns an Item of a session.
     * @param String|Integer $key
     * @throws Exception
     * @return Mixed
     */
    public function getItem($key)
    {    
        if(!isset($_SESSION[$key])){
            throw Exception("Session item $key does not exist");
        }

        return $_SESSION[$key];
    }

    /**
     * Check if a Session has a Key
     * @param String|Integer $key
     * @return Boolean
     */
    public function has($key)
    {
        return isset($_SESSION[$key]);
    }

    /**
     * Unsets a session variable.
     *
     * @param string $key The key of the session variable to unset.
     * @return Session
     */
    public function unset($key){
        unset($_SESSION[$key]);
        return $this;
    }


    /**
     * @return Session
     */
    public function end()
    {
        session_destroy();
        $this->started=false;
        return $this;
    }
}