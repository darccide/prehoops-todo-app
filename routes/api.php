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

// User Routes

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');
Route::get('profile', 'UserController@getAuthenticatedUser');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Task Routes

Route::get('tasks', 'TaskController@index');
Route::get('task/{id}', 'TaskController@show');
Route::get('tasks/{title}', 'TaskController@titleSearch');
Route::post('tasks', 'TaskController@store');
Route::put('task/{id}', 'TaskController@update');
Route::put('tasks/task/{id}', 'TaskController@toggleCompleted');
Route::delete('task/{id}', 'TaskController@delete');
