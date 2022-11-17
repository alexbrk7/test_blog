<?php


namespace App\Services\Post;


use App\Helpers\ImageSaver;
use App\Models\Post;
use Illuminate\Http\Request;

class PostService
{
    private $imageSaver;

    public function __construct(ImageSaver $imageSaver)
    {
        $this->imageSaver = $imageSaver;
    }

    public function getItems() {
        return Post::orderBy('id','desc')->with('category')->get();
    }

    public function getItem($id) {
        return Post::where('id', $id)->firstOrFail();
    }

    public function store(Request $request, Post $post) {
        $data = $request->all();
        $data['image'] = $this->imageSaver->upload($request, null, 'post');
        $post = Post::create($data);

        return $post;
    }


}
