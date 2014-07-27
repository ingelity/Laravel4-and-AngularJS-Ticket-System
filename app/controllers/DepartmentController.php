<?php

class DepartmentController extends BaseController {

	/**
	 * Display a listing of departments
	 * @return Response
	 */
	public function getList() /* /departments/list */
	{
		$departments = Department::all();
		return Response::json([
		    'departments' => $departments->toArray()
		]);
	}

	/**
	 * Create/Open a New Department
	 * @return Response
	 */
	public function postNew()
	{
		$input = Input::all();
		$department = new Department;
		$department->title = $input['title'];
		$department->save();
	 
		return $department;
	}

	/**
	 * Update the specified Department
	 * @return Response
	 */
	public function postUpdate()
	{
		$input = Input::all();
		$department = null;
		if(trim($input['id'])){
			$department = Department::find($input['id']);
			if($department->title != $input['title'])
				$department->title = $input['title'];
			
			$department->save();
		}
		return $department;
	}
	
	/**
	 * Delete the specified Department
	 */
	public function postDelete()
	{
		$id = Input::get('id');
		if(trim($id)){
			$department = Department::find($id);
			$department->delete();
		}
	}
}