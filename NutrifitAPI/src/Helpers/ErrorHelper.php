<?php

namespace App\Helpers;

class ErrorHelper
{
    public static function error_to_json_format($code, $message, $messageId){
        return ["code" => $code, "message" => $message, "messageId" => $messageId];
    }
}
