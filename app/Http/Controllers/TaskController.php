<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index() 
    {
        return Task::all();
    }

    public function show($id) 
    {
        return Task::find($id);
    }

    public function store(Request $request) 
    {
        $validator = Validator::make($request->json()->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|min:3'
          ]);

        if($validator->fails()) {
           return response()->json($validator->errors()->toJson(), 400);
        }

         $task = Task::create([
            'title' => $request->json()->get('title'),
            'category' => $request->json()->get('category'),
          ]);

          return $task;
    }

    public function update(Request $request, $id) 
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());

        return $task;
    }

    public function delete(Request $request, $id) 
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return 204;
    }

    public function toggleCompleted(Request $request, $id) 
    {
        $task = Task::findOrFail($id);

        if ($task->is_completed == 0) 
        {
            $task->is_completed = true;
            $task->update();

        } else {

            $task->is_completed = false;
            $task->update();
        }

        return $task;
    }

    public function titleSearch($title) 
    {
        return Task::query()->where('title', 'LIKE', "%{$title}%")->get();
    }
}