<?php

namespace App\Helpers;

use Illuminate\Database\Capsule\Manager as DB;

class DBConnection{
        
    static function creerConnection(){
        $db = new DB();

        $db->addConnection(parse_ini_file(__DIR__ . "/../../db.config.ini"));
 
        $db->setAsGlobal();
        $db->bootEloquent(); //On lance Eloquent

        return $db;
    }

    static function creerConnectionTest(){
        $db = new DB();

        $db->addConnection(parse_ini_file(__DIR__ . "/../../db.config.dev.ini"));
 
        $db->setAsGlobal();
        $db->bootEloquent(); //On lance Eloquent

        return $db;
    }
}