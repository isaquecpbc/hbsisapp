<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contributor extends Model
{
    //
    protected $fillable = [
    	'cpf', 'name', 'salary', 'dependents'
    ];
}
