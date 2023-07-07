<?php

namespace App\Models;

require __DIR__ . '/../../vendor/autoload.php';

class Consumables extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'consumable';
    protected $primaryKey = 'idConsumable';

}
