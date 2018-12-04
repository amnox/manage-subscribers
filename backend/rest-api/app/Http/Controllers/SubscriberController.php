<?php

namespace App\Http\Controllers;

use App\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriberController extends Controller
{
    public function __construct()
    {
        $this->middleware('checkdomain', ['only' => ['store','update']]);
        //$this->middleware('cors');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Subscriber::all();
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $subscriber = new Subscriber;

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email'=> 'required|email|unique:subscribers',
            'address'=> 'required',
            'state'=> 'required|in:' . implode(',', ['active', 'unsubscribed', 'junk', 'bounced', 'unconfirmed']),
        ]);
        if ($validator->fails()) {
            //
            return response()->json([
                'message' => $validator->errors()->all()
            ], 422);
        }

        $subscriber->name = $request->name;
        $subscriber->email = $request->email;
        $subscriber->address = $request->address;
        $subscriber->state = $request->state;
        $subscriber->save();

        return json_encode(array('id' => $subscriber->id,));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function show(Subscriber $subscriber)
    {
        //
        return $subscriber;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function edit(Subscriber $subscriber)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subscriber $subscriber)
    {
        //
        $validator = Validator::make($request->all(), [
            'email'=> 'email|unique:subscribers',
            'state'=> 'in:' . implode(',', ['active', 'unsubscribed', 'junk', 'bounced', 'unconfirmed']),
        ]);
        if ($validator->fails()) {
            //
            return response()->json([
                'message' => $validator->errors()->all()
            ], 422);
        }

        if (request()->has('name')) {
            $subscriber->name = request('name');
        }
    
        if (request()->has('email')) {
            $subscriber->email = request('email');
        }
    
        if (request()->has('address')) {
            $subscriber->address = request('address');
        }
    
        if (request()->has('state')) {
            $subscriber->state = request('state');
        }
    
        if (request()->has('published_at')) {
            $subscriber->published_at = request('published_at');
        }
        $subscriber->save();

        return $subscriber;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscriber $subscriber)
    {
        //
        $subscriber->delete();
        return json_encode(array('response' => 'DELETED',));
    }

    public function fields($id)
    {
        $subscriber = Subscriber::find($id);
        
        return $subscriber->fields()->get();
    }
}
