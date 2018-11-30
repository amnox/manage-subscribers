<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Subscriber::class, 50)->create()->each(function ($subscriber) {
            factory(App\Field::class, rand(1,10))->create()->each(function ($field) use ($subscriber){
                $subscriber->fields()->save($field);
            });
        });
    }
}

#rand(10,100)