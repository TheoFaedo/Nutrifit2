<?php

namespace App\Helpers;

use App\Models\Consumption;
use App\Models\DailyGoal;

class XpHelper
{

    private $session, $staticexecutor;

    public function __construct($session, $staticexecutor = null){
        $this->session = $session;
        if($staticexecutor !== null){
            $this->staticexecutor = $staticexecutor;
        }else{
            $this->staticexecutor = new StaticExecutor();
        }
    }

    public function addXp($userObject, $value){
        if($userObject){
            $userXp = $userObject->xp+$value;

            $userObject->level += intdiv($userXp, 50);
            $userObject->xp = $userXp%50;
            $userObject->save();
        }
    }

    public function goalIsAlreadyDone($userId, $date){
        if(DailyGoal::where('idUser', $userId)->where('date', $date)->first()) return true;

        return false;
    }

    public function goalCanBeDone($userId, $user, $date){
        if(!$user->active_eg && !$user->active_fg && !$user->active_cg && !$user->active_pg) return false;

        $dailyConsumption = Consumption::whereDate('consumed_on', '=', $date)->where('idUser', $userId)->get();

        $takes = [];
        foreach ($dailyConsumption as $consu) {
            array_push($takes, ["cons" => $consu->consumable, "prop" => $consu->proportion]);
        }

        $advancement = ['energy' => 0, 'fats' => 0, 'carbohydrates' => 0, 'proteins' => 0];

        foreach($takes as $take){
            $advancement['energy'] += $take['cons']->energy * $take['prop'];
            $advancement['fats'] += $take['cons']->fats * $take['prop'];
            $advancement['carbohydrates'] += $take['cons']->carbohydrates * $take['prop'];
            $advancement['proteins'] += $take['cons']->proteins * $take['prop'];
        }

        return (!$user->active_eg || abs($user->energy_goal - $advancement['energy']) < 200)
        && (!$user->active_fg || abs($user->fats_goal - $advancement['fats']) < 12)
        && (!$user->active_cg || abs($user->carbohydrates_goal - $advancement['carbohydrates']) < 20)
        && (!$user->active_pg || abs($user->proteins_goal - $advancement['proteins']) < 20);
    }
}