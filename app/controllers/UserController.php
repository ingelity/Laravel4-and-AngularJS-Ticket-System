<?php

class UserController extends BaseController {

	/**
	 * Register a new User
	 * @return Response
	 */
	public function postNew()
	{
		$input = Input::all();
		$user = new User;
		$user->email = $input['email'];
		$user->password = Hash::make($input['password']);
		$user->type = 'user';
		
		$user->save();
	 
		return $user;
	}
	
	/**
	 * Check if User is an Admin
	 * @return Response
	 */
	public function getIsAdmin()
	{
		$a = (Auth::user()->type == 'admin')? true : false;
		return Response::json(array('isAdmin' => $a));
	}
}