<?php


namespace App\Helpers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageSaver
{

    /**
     * Сохраняет изображение при создании или редактировании категории,
     * бренда или товара; создает два уменьшенных изображения.
     *
     * @param \Illuminate\Http\Request $request — объект HTTP-запроса
     * @param \App\Models\Item $item — модель категории, бренда или товара
     * @param string $dir — директория, куда будем сохранять изображение
     * @return string|null — имя файла изображения для сохранения в БД
     */
    public function upload($request, $item, $dir)
    {
        $name = $item->image ?? null;
        if ($item && $request->remove) { // если надо удалить изображение
            $this->remove($item, $dir);
            $name = null;
        }
        $source = $request->file('image');
        if ($source) {
            //$file_type = pathinfo($source, PATHINFO_EXTENSION);
            $ext = $source->extension();
            if ($ext == 'jpg' || $ext == 'jpeg' || $ext == 'png') { // если было загружено изображение
                // перед загрузкой нового изображения удаляем старое
                if ($item && $item->image) {
                    $this->remove($item, $dir);
                }

                // сохраняем загруженное изображение без всяких изменений
                $path = $source->store('uploads/' . $dir . '/source', 'public');


                $path = Storage::disk('public')->path($path); // абсолютный путь
                $name = basename($path); // имя файла


                $dst = 'uploads/' . $dir . '/image/';

                // создаем изображение  качество 100%
                if ($dir == 'category') $this->resize_off_height($path, $dst, 900, 563, $ext);


                if ($dir == 'post') $this->resize_off_height($path, $dst, 900, 563, $ext);


                if ($dir == 'guestbook') $this->resize_off_height($path, $dst, 500, 200, $ext);


                $dst = 'uploads/' . $dir . '/thumb/';


                if ($dir == 'category') $this->resize_off_height($path, $dst, 150, 94, $ext);


                if ($dir == 'post') $this->resize_off_height($path, $dst, 150, 94, $ext);


                if ($dir == 'guestbook') $this->resize_off_height($path, $dst, 150, 94, $ext);

            }
        }

        return $name;
    }


    /**
     * Создает уменьшенную копию изображения
     *
     * @param string $src — путь к исходному изображению
     * @param string $dst — куда сохранять уменьшенное
     * @param integer $width — ширина в пикселях
     * @param integer $height — высота в пикселях
     * @param string $ext — расширение уменьшенного
     */
    private function resize_off_height($src, $dst, $width, $height, $ext)
    {

        $image = Image::make($src);

        $image->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
        })->encode($ext, 100);

        $image_webp = Image::make($src);
        $image->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
        })->encode($ext, 100);


        $name = basename($src);
        $webp = $this->replace_extension($src, 'webp');


        Storage::disk('public')->put($dst . $name, $image);
        Storage::disk('public')->put($dst . $webp, $image_webp);
        $image->destroy();
        $image_webp->destroy();
    }


    /**
     * Удаляет изображение при удалении категории, бренда или товара
     *
     * @param \App\Models\Item $item — модель категории, бренда или товара
     * @param string $dir — директория, в которой находится изображение
     */
    public function remove($item, $dir)
    {
        if ($item->image) {
            $old = $item->image;
        }

        if ($old) {
            Storage::disk('public')->delete('uploads/' . $dir . '/source/' . $old);

            Storage::disk('public')->delete('uploads/' . $dir . '/source/' . $old);
            Storage::disk('public')->delete('uploads/' . $dir . '/source/' . $this->replace_extension($old, 'webp'));


            Storage::disk('public')->delete('uploads/' . $dir . '/image/' . $old);
            Storage::disk('public')->delete('uploads/' . $dir . '/image/' . $this->replace_extension($old, 'webp'));


            Storage::disk('public')->delete('uploads/' . $dir . '/thumb/' . $old);
            Storage::disk('public')->delete('uploads/' . $dir . '/thumb/' . $this->replace_extension($old, 'webp'));

        }
    }

    public function replace_extension($filename, $new_extension)
    {
        $info = pathinfo($filename);
        return $info['filename'] . '.' . $new_extension;
    }

}
