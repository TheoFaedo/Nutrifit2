<?php

namespace App\Models;

require __DIR__ . '/../../vendor/autoload.php';

use App\Helpers\FormatHelper;

class User extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'user';
    protected $primaryKey = 'idUser';

    //Informations about predefined nutrional goals
    private static $predefinedNutrionalGoals = [
        '3' => [
            'name' => 'weight gain',
            'energy' => '2600',
            'fats' => '80',
            'carbs' => '330',
            'proteins' => '140'
        ],
        '2' => [
            'name' => 'maintain',
            'energy' => '2115',
            'fats' => '75',
            'carbs' => '270',
            'proteins' => '90'
        ],
        '1' => [
            'name' => 'weight loss',
            'energy' => '1875',
            'fats' => '75',
            'carbs' => '210',
            'proteins' => '90'
        ],
    ];

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
     * @return User|false object if authentication concrated, false otherwise
     */
    public static function authentify($pseudo, $password){
        $user = User::where('pseudo', '=', $pseudo)->first();
        if(!$user){
            // Prevent Time Attack
            password_verify("", "fdsfsfsdfsd");
            return false;
        }
        
        if(password_verify($password, $user->pwdhash)){
            return $user;
        }

        return false;
    }

    /** 
     * @param $information : information of user to register
     * @return boolean true if registered, false otherwise
    */
    public static function register($information){

        $errorResponse = [];

        //Pseudo
        if(isset($information['pseudo'])){
            $pseudo = $information['pseudo'];
            if(!FormatHelper::verify_pseudo($pseudo)){
                $errorResponse['pseudo'] = 'This field must be between 3 and 20 characters long.';
            }
        }else{
            $errorResponse['pseudo'] = 'This field is required.';
        }

        //Password
        if(isset($information['password'])){
            $password = $information['password'];
            if(!FormatHelper::verify_password($password)){
                $errorResponse['password'] = 'This field must be between 3 and 20 characters long.';
            }
        }else{
            $errorResponse['password'] = 'This field is required.';
        }

        //Mail
        if(isset($information['mail'])){
            $mail = $information['mail'];
            if(!FormatHelper::verify_mail($mail)){
                $errorResponse['mail'] = 'This field must be in the format "name@mail.com".';
            }
        }else{
            $errorResponse['mail'] = 'This field is required.';
        }

        //Gender
        if(isset($information['gender'])){
            $gender = $information['gender'];
            if(!FormatHelper::verify_gender($gender)){
                $errorResponse['gender'] = 'Gender is invalid.';
            }
        }else{
            $errorResponse['gender'] = 'Gender is required.';
        }

        //Goal
        if(isset($information['goal'])){
            $goal = $information['goal'];
            if(!FormatHelper::verify_goal($goal)){
                $errorResponse['goal'] = 'Invalid goal label.';
            }
        }else{
            $errorResponse['goal'] = 'Goal is required.';
        }

        if(empty($errorResponse)){
            $nutriGoal = User::$predefinedNutrionalGoals[$goal];

            $user = new User();
            $user->pseudo = $pseudo;
            $user->pwdhash = password_hash($password, PASSWORD_DEFAULT);
            $user->gender = $gender;
            $user->token = sha1(uniqid().$pseudo);
            $user->tokenValidation = sha1(random_int(0, 1000000).uniqid());
            $user->mail = $mail;
            $user->energy_goal = $nutriGoal['energy'];
            $user->fats_goal = $nutriGoal['fats'];
            $user->carbohydrates_goal = $nutriGoal['carbs'];
            $user->proteins_goal = $nutriGoal['proteins'];

            $user->save();

            return $user;
        }

        return $errorResponse;
    } 

}
