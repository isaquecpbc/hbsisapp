<?php

use Illuminate\Http\Request;

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

Route::prefix('contributors')->group(function () {
    Route::get('/', 'ContributorsController@index');
    Route::post('/', 'ContributorsController@store');
    Route::get('/{id}', 'ContributorsController@show');
    Route::get('/calculate/{minsalary}', 'ContributorsController@calculate');
});