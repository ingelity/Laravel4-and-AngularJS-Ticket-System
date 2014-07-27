<?php

class Ticket extends Eloquent{

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'tickets';


	public function user(){
		return $this->belongsTo('User');
	}
	
	/* public function departments(){
		return $this->belongsToMany('Department');
	} */
	
	
}