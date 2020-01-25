<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contributor;

class ContributorsController extends Controller
{

    // 
    private $contributor;

	public function __construct(Contributor $contributor)
	{
		$this->contributor = $contributor;
	}

    public function index()
    {
        return $this->contributor->all();
    }
 
    public function show($id)
    {
    	$contributor = $this->contributor->find($id);
        return $contributor->toJson();
    }
 
    public function store(Request $request)
    {
	    $this->validate($request, [
	        'cpf' => 'required|unique:contributors|min:11|max:11',
	        'name' => 'required|min:3',
	        'salary' => 'required',
	    ]);

        $insert = $this->contributor->create($request->all());
        
        if ($insert) {
			return response()->json('Contributor created!');
        } else {
			return response()->json('Falha ao criar!');
        }
 
    }
 
    public function calculate($minsalary)
    {
        $contributors = $this->contributor->all();

        foreach($contributors as $key => $contributor){
        	// get salario liquido com desconto de dependentes se tiver
        	if ($contributor->dependents>0) {
	            $income = $contributor->salary - ($contributor->salary / 100 * ( 5 * $contributor->dependents));
        	} else {
        		$income = $contributor->salary;
        	}
        	// get numero de salarios minimos 
            $calcNumBasic = $contributor->salary / $minsalary;

        	// get salario com imposto caso...
        	switch ($calcNumBasic) {
        		case $calcNumBasic > 7:
        			$tax = $income / 100 * 27.50;
        			break;
        		case $calcNumBasic > 5:
        			$tax = $income / 100 * 22.50;
        			break;
        		case $calcNumBasic > 4:
        			$tax = $income / 100 * 15;
        			break;
        		case $calcNumBasic >= 2:
        			$tax = $income / 100 * 7.50;
        			break;
        		
        		default:
        			$tax = 0;
        			break;
        	}

        	//store results
            $data_array[] = array(
                'name' => $contributor->name,
                'cpf' => $contributor->cpf,
                'salary' => $contributor->salary,
                'dependents' => $contributor->dependents,
                'tax' => round($tax, 2)
			);
        }

        
		return json_encode($data_array);
    }
 
    // public function update(Request $request, Contributor $contributor)
    // {
    //     $contributor->update($request->all());
 
    //     return response()->json('Contributor updated!');
    // }
 
    // public function delete(Contributor $contributor)
    // {
    //     $contributor->delete();
 
    //     return response()->json('Contributor deleted!');
    // }
 
}