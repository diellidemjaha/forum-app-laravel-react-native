<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
   public function logout(Request $request){
$request->user()->CurrentAccessToken()->delete();
return response()->json(["message"=> "user logged out"],200);
   }
}
