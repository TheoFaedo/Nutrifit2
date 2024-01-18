<?php

namespace App\Models;

require __DIR__ . '/../../vendor/autoload.php';

class Consumable extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'consumable';
    protected $primaryKey = 'idConsumable';

    public function consumptions(){
        return $this->hasMany('App\Models\Consumption', 'idConsumable');
    }

    public function ingredients(){
        return $this->hasMany(RecipeComposition::class, 'idRecipe');
    }

    public function ingredientOf(){
        return $this->belongsTo(RecipeComposition::class, 'idIngredient');
    }

    /**
     * Deletes all ingredient relations for the specified consumable.
     */
    public function deleteAllIngredientsRelations(){
        RecipeComposition::where('idRecipe', $this->idConsumable)->orWhere('idIngredient', $this->idConsumable)->delete();
    }

    public function deleteAllConsumptions(){
        if($this->idConsumable != null){
            $consumptions = $this->consumptions()->delete();
            return true;
        }
        return false;
    }

}
