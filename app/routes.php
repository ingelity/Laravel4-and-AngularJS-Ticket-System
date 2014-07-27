<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::group(array('before' => 'auth|csrfCheck'), function()
{
	Route::controller('/tickets', 'TicketController');
	Route::controller('/departments', 'DepartmentController');
});

Route::group(array('before' => 'csrfCheck'), function()
{
	Route::controller('/users', 'UserController');
});

Route::get('/', function(){
	return View::make('singlepage');
});

Route::post('/auth/login', array('before' => 'csrfCheck', 'uses' => 'AuthController@login'));
Route::get('/auth/status', array('before' => 'csrfCheck', 'uses' => 'AuthController@status'));
Route::get('/auth/logout', 'AuthController@logout');