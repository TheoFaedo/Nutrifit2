<?php

namespace App\Models;

require __DIR__ . '/../../vendor/autoload.php';

class DailyGoal extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'dailygoal';
    protected $primaryKey = 'idDailyGoal';

}
