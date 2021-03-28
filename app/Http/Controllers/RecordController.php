<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Record;
use Illuminate\Support\Facades\DB;

class RecordController extends Controller
{
    public function getAll() {
        $records = Record::all();
        return json_encode($records);
    }

    public function getOne($id) {
        $record = Record::where('id', $id)->first();
        return json_encode($record);
    }

    public function delete($id) {


        $record = Record::where('id', $id)->first();
        if ($record) {
            $record = $record->delete();
            $result['result'] = 'Запись #'.$id.' удалена';
        } else {
            $result['result'] = 'Запись #'.$id.' не найдена';
        }
        return json_encode($result);
    }

    public function create(Request $request) {

        $result = [];
        $title = $request->title;
        $author = $request->author;
        $description = $request->description;

        if (trim($title) === '' || trim($author) === '' || trim($description) === '' ) {
            $result['error'] = 'Не все обязательные поля заполнены';
        } else {
            $image = $request->file('image');
            if ($image === NULL) {
                $result['error'] = 'Вы не указали изображение';
            }
            else if ( !in_array($image->extension(), ['jpg', 'jpeg', 'webp', 'png']) ) {
                $result['error'] = 'Вы использовали не разрешенный формат изображений "'.$image->extension().'"';
            } else {
                $images_file_name = 'image_'.time().'.'.$image->extension();
                $path = $request->image->storeAs('public', $images_file_name);

                $record = new Record;
                $record->title = $title;
                $record->author = $author;
                $record->description = $description;
                $record->image = 'storage/'.$images_file_name;
                $record->save();

                $result['id'] = $record->id;
                $result['title'] = $title;
                $result['author'] = $author;
                $result['description'] = $description;
                $result['image'] = 'storage/'.$images_file_name;
                $result['result'] = 'Запись #'.$record->id.' добавлена';
            }

        }

        return json_encode($result);

    }
    public function update(Request $request, $id) {
        $result = [];
        /* $id = $request->id; */
        $title = $request->title;
        $author = $request->author;
        $description = $request->description;

        $record = DB::table('records')->select('image')->where('id', $id)->first();
        $images_file_name = $record->image;

        if (trim($title) === '' || trim($author) === '' || trim($description) === '' ) {
            $result['error'] = 'Не все обязательные поля заполнены';
        } else {
            $image = $request->file('image');
            if ( $image !== NULL && !in_array($image->extension(), ['jpg', 'jpeg', 'webp', 'png']) ) {
                $result['error'] = 'Вы использовали не разрешенный формат изображений "'.$image->extension().'"';
            } else {
                if ($image !== NULL) {
                    $images_file_name = 'image_'.time().'.'.$image->extension();
                    $path = $request->image->storeAs('public', $images_file_name);
                }

                if ( (strpos($images_file_name, 'http') != 0 || strpos($images_file_name, 'http')  === false) && strpos($images_file_name, 'storage/')  === false)
                    $images_file_name = 'storage/'.$images_file_name;

                $record = Record::find($id);
                $record->title = $title;
                $record->author = $author;
                $record->description = $description;
                $record->image = $images_file_name;
                $record->save();

                $result['id'] = $id;
                $result['title'] = $title;
                $result['author'] = $author;
                $result['description'] = $description;
                $result['image'] = $images_file_name;
                $result['result'] = 'Запись #'.$id.' обновлена';
            }

        }

        return json_encode($result);
        /* return $images_file_name; */
    }



}
