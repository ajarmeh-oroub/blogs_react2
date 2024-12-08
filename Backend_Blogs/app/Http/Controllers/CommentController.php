<?php

namespace App\Http\Controllers;

use App\Models\Comment;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
{
    $comments = Comment::where('blogId', $id)->orderBy('created_at', 'desc')->get();
    return response()->json($comments);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        // التحقق من صحة البيانات
        $validatedData = $request->validate([
            'comment' => 'required|string',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            
        ]);

        // إضافة blogId إلى البيانات
        $validatedData['blogId'] = $id;

        // إنشاء التعليق
        $comment = Comment::create($validatedData);

        return response()->json($comment, 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
