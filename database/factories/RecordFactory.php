<?php

namespace Database\Factories;

use App\Models\Record;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Record::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $ch = curl_init();
        return [
            'image' => $this->getFakeImage('https://source.unsplash.com/random'),
            'title' =>$this->faker->word,
            'description' =>$this->faker->text(200),
            'author' =>$this->faker->name,
            'created_at' =>$this->faker->dateTime(),
            'updated_at' =>$this->faker->dateTime(),
        ];
    }

    public function getFakeImage($url) {
        $ch = curl_init();
        $timeout = 0;
        curl_setopt ($ch, CURLOPT_URL, $url);
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_HEADER, TRUE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
        $header = curl_exec($ch);

        $header = preg_replace("/\r\n|\r|\n/", '', $header);
        if (preg_match ('/Location:(.*?)Content-Type/m', $header, $match) == 1) {
            return( trim($match[1]) );
        } else {
            return 'https://znaiwifi.com/wp-content/uploads/2018/01/hqdefault.jpg';
        }
    }
}
