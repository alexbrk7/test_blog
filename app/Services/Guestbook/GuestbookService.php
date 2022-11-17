<?php


namespace App\Services\Guestbook;
use App\Helpers\ImageSaver;

use App\Models\Guestbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class GuestbookService
{
    private $imageSaver;

    public function __construct(ImageSaver $imageSaver)
    {
        $this->imageSaver = $imageSaver;
    }

      public function getItems() {
         return Guestbook::orderBy('id', 'desc')->get();
      }

      public function store(Request $request, Guestbook $guestbook) {
          $data = $request->all();
          $data['image'] = $this->imageSaver->upload($request, null, 'guestbook');
          $guestbook = Guestbook::create($data);

          return $guestbook;
      }
}
