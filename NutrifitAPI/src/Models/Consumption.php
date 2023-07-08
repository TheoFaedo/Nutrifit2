<?php

namespace App\Models;

require __DIR__ . '/../../vendor/autoload.php';

class Consumption extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'consumption';
    protected $primaryKey = 'idConsumption';
}
