<?php

namespace App\Helpers;

use App\Models\User;

class FormatHelper{

    /**
     * @param $pseudo : pseudo to verify format
     * @return boolean true if verified, false otherwise
     */
    public static function verify_pseudo($pseudo){
        return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $pseudo) ? true : false;
    }

    /**
     * @param $mail : mail to verify format
     * @return boolean true if verified, false otherwise
     */
    public static function verify_mail($mail){
        return preg_match('/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/', $mail) ? true : false;
    }

    /**
     * @param $password : password to verify format
     * @return boolean true if verified, false otherwise
     */
    public static function verify_password($password){
        return preg_match('/^[\w~`!@#$%^&*()_\-+={[}\]\|\:;\"\'<,>\.\?\/]{3,}$/', $password) ? true : false;
    }

    /**
     * @param $gender : gender to verify format
     * @return boolean true if verified, false otherwise
     */
    public static function verify_gender($gender){
        return preg_match('/^(M|F)$/', $gender) ? true : false;
    }

    /**
     * @param $goal : goal id to verify format (1: weight gain, 2: maintain, 3: weight loss)
     * @return boolean true if verified, false otherwise
     */
    public static function verify_goal($goal){
        return preg_match('/^(1|2|3)$/', $goal) ? true : false;
    }

}