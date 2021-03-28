<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $fillable = ['title','author', 'description', 'image', 'updated_at'];

    static function test() {
        return '4';
    }
}
