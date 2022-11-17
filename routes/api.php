<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('categories', Api\CategoryController::class . '@index');
Route::get('posts', Api\PostController::class . '@index');
Route::get('posts/{id}', Api\PostController::class . '@show');
Route::resource('guestbooks', Api\GuestbookController::class);

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::get('categories', Api\CategoryController::class . '@adminCategories');
    Route::post('categories', Api\CategoryController::class . '@store');
    Route::post('posts', Api\PostController::class . '@store');

    Route::post('login', AuthController::class . '@login');
    Route::post('logout', AuthController::class . '@logout');
    Route::post('refresh', AuthController::class . '@refresh');
    Route::post('me', AuthController::class . '@me');
});
