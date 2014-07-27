<?php

class SendEmail{

    public function fire($job, $data){
	
	/* Mail::queue('emails.welcome', $data, function($message){
	    $message->to('aleksandarjovanovic2013@gmail.com', 'John Smith')->subject('Welcome!');
	}); */
	Mail::send('email', $data['message'], function($message){
	    $message->to($data['email'])->subject($data['subject']);
	});
	//mail($data['email'], $data['subject'], $data['message'], $headers);
    }
}