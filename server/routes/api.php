<?php

use App\Http\Controllers\Api\V1\LoginController;
use App\Http\Controllers\Api\V1\LogoutController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FriendsListController;



Route::middleware('auth:sanctum')->group(function () {
    Route::get('friends/{userId}', [FriendsListController::class, 'showAllFriends']);
    Route::post('friends/request', [FriendsListController::class, 'sendFriendRequest']);
    Route::post('friends/accept', [FriendsListController::class, 'acceptFriendRequest']);
    Route::delete('friends/delete', [FriendsListController::class, 'deleteFriend']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function (Request $request){
    return response()->json([
        'message' => 'its working hello world'
    ]);
});

Route::post('/register', [RegisterController::class, 'store']);
Route::post('/login', [LoginController::class, 'store']);
Route::post('/logout', [LogoutController::class, 'logout'])->middleware('auth:sanctum'); 
Route::get('/posts', [PostController::class, 'index'])->middleware('auth:sanctum');
Route::get('/posts-of-friends', [PostController::class, 'showPosts'])->middleware('auth:sanctum');
Route::post('/post', [PostController::class, 'store'])->middleware('auth:sanctum');
Route::get('/posts/{id}', [PostController::class, 'show'])->middleware('auth:sanctum');
Route::delete('/posts/{id}', [PostController::class, 'destroy'])->middleware('auth:sanctum');
Route::put('/posts/{id}', [PostController::class, 'update'])->middleware('auth:sanctum');