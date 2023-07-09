<?php

namespace App\Application;

class StaticExecutor{

    public function __construct(){
        
    }

    /**
     * Executes a given static method of a class.
     *
     * @param string $classpath The name of the class.
     * @param string $staticmethod The name of the static method.
     * @return mixed The result of the static method call.
     */
    public function execute($classpath, $staticmethod, ...$arguments){
        return call_user_func([$classpath,$staticmethod], ...$arguments);
    }

}