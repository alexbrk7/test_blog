<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Services\Category\CategoryService;
use App\Services\Response\ResponseService;
use Illuminate\Http\Request;

class CategoryController extends ApiController
{
    public function __construct(CategoryService $service) {
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
               'items' =>  $this->service->getItems()->toArray()
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
    public function store(Request $request, Category $category)
    {
        //
        //
        $category = $this->service->store($request, $category);
        return ResponseService::sendJsonResponse(
            true,
            [
                'item' => $category->toArray()
            ]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }

    public function adminCategories()
    {
        //
        return ResponseService::sendJsonResponse(
            true,
            [
                'items' =>  $this->service->getCategoryAdmin()->toArray()
            ]
        );
    }
}
