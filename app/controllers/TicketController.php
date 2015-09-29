<?php
require_once __DIR__."/../sendEmail.php";

class TicketController extends BaseController {

	private $adminEmail;

	public function __construct()
	{
	    $this->adminEmail = "myemail@somewhere.com";
	}
	
	/**
	 * Display a listing of user's tickets
	 * @return Response
	 */
	public function getMyTickets() /* /tickets/my-tickets */
	{
		$tickets = Auth::user()->tickets;
		return Response::json([
		    'tickets' => $tickets->toArray()
		]);
	}
	
	/**
	 * Display a listing of opened tickets to Admin
	 * @return Response
	 */
	public function getOpened() /* /tickets/opened */
	{
		$tickets = Ticket::where('status', 'opened')->get();
		return Response::json([
		    'tickets' => $tickets->toArray()
		]);
	}

	/**
	 * Create/Open a New Ticket
	 * @return Response
	 */
	public function postNew() /* /tickets/new */
	{
		$input = Input::all();
		$ticket = new Ticket;
		$ticket->title = $input['title'];
		$ticket->description = $input['description'];
		$ticket->department = $input['department'];
		$ticket->status = "open";
		$ticket->user_id = Auth::user()->id;
		
		$subject = 'New ticket opened';
		$message = 'New ticket: '.$ticket->title.', with description: '.$ticket->description.', is now open.';
		//Queue::push('SendEmail', array('email' => $this->adminEmail, 'message' => $message, 'subject' => $subject));
	 
		$ticket->save();
		return $ticket;
	}

	/**
	 * Update the specified ticket
	 * @return Response
	 */
	public function postUpdate() /* /tickets/update */
	{
		$input = Input::all();
		
		$ticket = Ticket::find($input['id']);
		if($ticket->department != $input['department'])
			$ticket->department = $input['department'];
		if($input['status'] == 'closed'){
			$ticket->status = 'closed';
			$subject = 'This ticket is now closed';
			$message = 'The ticket: '.$ticket->title.', with description: '.$ticket->description.', is now closed.';
			$email = User::find($ticket->user_id)->email;
			//Queue::push('SendEmail', array('email' => $email, 'message' => $message, 'subject' => $subject));
		}
		
		$ticket->save();
		
		return $ticket;
	}
}
