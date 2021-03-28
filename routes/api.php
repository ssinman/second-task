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

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::get('/', 'App\Http\Controllers\RecordController@getAll');
Route::get('/{id}', 'App\Http\Controllers\RecordController@getOne')->where(['id' => '[0-9]+']);
Route::post('/', 'App\Http\Controllers\RecordController@create');
Route::put('/{id}', 'App\Http\Controllers\RecordController@update')->where(['id' => '[0-9]+']);
Route::delete('/{id}', 'App\Http\Controllers\RecordController@delete')->where(['id' => '[0-9]+']);
