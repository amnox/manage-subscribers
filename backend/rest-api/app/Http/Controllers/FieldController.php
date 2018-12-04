<?php

namespace App\Http\Controllers;

use App\Field;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FieldController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Field::all();
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
        $field = new Field;

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'type'=> 'required|in:' . implode(',', ['date', 'number', 'string', 'boolean']),
            'subscriber_id'=> 'required|exists:subscribers,id'
        ]);
        if ($validator->fails()) {
            //
            return response()->json([
                'message' => $validator->errors()->all()
            ], 422);
        }

        $field->title = $request->title;
        $field->type = $request->type;
        $field->subscriber_id = $request->subscriber_id;
        $field->save();

        return json_encode(array('id' => $field->id,));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function show(Field $field)
    {
        //
        return $field;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function edit(Field $field)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Field $field)
    {
        //
        $validator = Validator::make($request->all(), [
            'type'=> 'in:' . implode(',', ['date', 'number', 'string', 'boolean']),
            'subscriber_id'=> 'exists:subscribers,id'
        ]);
        if ($validator->fails()) {
            //
            return response()->json([
                'message' => $validator->errors()->all()
            ], 422);
        }

        if (request()->has('title')) {
            $field->title = request('title');
        }
    
        if (request()->has('type')) {
            $field->type = request('type');
        }
    
        if (request()->has('subscriber_id')) {
            $field->subscriber_id = request('subscriber_id');
        }
        $field->save();

        $field->save();

        return $field;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Field  $field
     * @return \Illuminate\Http\Response
     */
    public function destroy(Field $field)
    {
        //
        $field->delete();
        return json_encode(array('response' => 'DELETED',));
    }
}
