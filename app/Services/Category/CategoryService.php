<?php


namespace App\Services\Category;


use App\Models\Category;
use Illuminate\Http\Request;

class CategoryService
{
    public function getItems() {
       return Category::orderBy('id', 'desc')->has('posts')->get();
    }

    public function getCategoryAdmin() {
        return Category::orderBy('id', 'desc')->get();
    }

    public function store(Request $request, Category $category) {
        $data = $request->all();
        $category = Category::create($data);

        return $category;
    }


}
