<?php

use Illuminate\Database\Seeder;
use App\Models\Contributor;

class ContributorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $faker = \Faker\Factory::create();
 
        Contributor::create([
            'cpf' => '11122233355',
            'name' => $faker->name,
            'salary' => $faker->numberBetween($min = 1000, $max = 9000),
            'dependents' => $faker->randomDigitNot(7)
        ]);

    }
}
