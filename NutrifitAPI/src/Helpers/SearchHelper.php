<?php
namespace App\Helpers;

class SearchHelper{

    public static function orderBy($consumables, $order){
        switch ($order) {
            case 'lastupdated':
                return $consumables->orderBy('update_time', 'DESC');
            case 'mostrecent':
                return $consumables->orderBy('creation_time', 'DESC');
            case 'oldest':
                return $consumables->orderBy('creation_time');
            case 'nameAZ':
                return $consumables->orderBy('name');
            case 'nameZA':
                return $consumables->orderBy('name', 'DESC');
            case 'recommended':
                //TODO
            default:
                return $consumables->orderBy('update_time', 'DESC');
        }
    }
}

