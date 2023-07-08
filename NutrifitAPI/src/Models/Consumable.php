<?php

namespace App\Models;

require __DIR__ . '/../../vendor/autoload.php';

class Consumable extends \Illuminate\Database\Eloquent\Model{

    public $timestamps = false;
    protected $table = 'consumable';
    protected $primaryKey = 'idConsumable';

    /**
     * Deletes all recipe ingredients for a given ID.
     *
     * @param int $id The ID of the recipe.
     * @throws \Exception If there is an error deleting the recipe ingredients.
     * @return true if successful or false if not
     */
    public function deleteAllRecipeIngredients(){
        if($this->idConsumable != null){
            $recipeIngredients = RecipeComposition::where('idRecipe', $this->idConsumable)->get();
            foreach ($recipeIngredients as $recipeIngredient) {
                $recipeIngredient->delete();
            }
            return true;
        }
        return false;
    }

}
