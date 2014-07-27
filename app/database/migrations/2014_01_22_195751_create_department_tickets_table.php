<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDepartmentTicketsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('department_tickets', function(Blueprint $table)
		{
			$table->increments('id');
			    $table->unsignedInteger('department_id')->references('id')->on('department');
			    $table->unsignedInteger('ticket_id')->references('id')->on('ticket');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('department_tickets');
	}

}