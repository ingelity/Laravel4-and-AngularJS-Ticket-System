<?php

class Department extends Eloquent{

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'departments';
	public $timestamps = false;

	/* public function tickets(){
		return $this->belongsToMany('Ticket');
	} */
	
	
}