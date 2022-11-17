<?php

namespace App\Http\Controllers\Api;

use App\Models\Guestbook;
use App\Services\Guestbook\GuestbookService;
use App\Services\Response\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class GuestbookController extends ApiController
{
    public function __construct(GuestbookService $service) {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return ResponseService::sendJsonResponse(
            true,
            [
                'items' => $this->service->getItems()->toArray()
            ]
        );
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
    public function store(Request $request, Guestbook $guestbook)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'comment' => 'required',
        ],
            [
                'required' => __('Validation Error').' :attribute'
            ]
        );

        $guestbook = $this->service->store($request, $guestbook);
        return ResponseService::sendJsonResponse(
            true,
            [
                'item' => $guestbook->toArray()
            ]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Guestbook  $guestbook
     * @return \Illuminate\Http\Response
     */
    public function show(Guestbook $guestbook)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Guestbook  $guestbook
     * @return \Illuminate\Http\Response
     */
    public function edit(Guestbook $guestbook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Guestbook  $guestbook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Guestbook $guestbook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Guestbook  $guestbook
     * @return \Illuminate\Http\Response
     */
    public function destroy(Guestbook $guestbook)
    {
        //
    }
}
