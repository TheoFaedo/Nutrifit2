<?php

namespace App\Models;

require __DIR__ . '/../../vendor/autoload.php';

class RecipeComposition extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'recipecomposition';
}
