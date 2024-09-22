<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\PostSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        $this->call([PostSeeder::class]);
        User::factory()->createMany([
            'name' => 'testnative',
            'email' => 'native@sanctum.com',
            'password' => '12345678'
        ],
    [
        'name' => 'solomon',
        'email' => 'solomon@sanctum.com',
            'password' => '12345678'
    ]);
    }
}
