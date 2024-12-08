<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blog::with('user')->find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        return response()->json($blog);
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

    public function search(Request $request)
    {
        $search = $request->input('search');
        
        // Check if the search query is empty
        if (empty($search)) {
            return response()->json(['message' => 'No search term provided'], 400);
        }

        // Perform search query
        $results = Blog::where('title', 'LIKE', "%$search%")
                        ->orWhere('article', 'LIKE', "%$search%")
                        ->get();

        // Check if no results were found
        if ($results->isEmpty()) {
            return response()->json(['message' => 'No blogs found'], 404);
        }

        // Return the results as JSON
        return response()->json($results);
    }

    public function getFavoriteBlogs($userId = 1)
    {
        // Retrieve the user's favorite blogs using Query Builder
        $favoriteBlogs = DB::table('blog_user')
            ->join('blogs', 'blog_user.blog_id', '=', 'blogs.id') // Assuming the blogs table has an 'id' column
            ->where('blog_user.user_id', $userId)
            ->select('blogs.*') // Select the desired columns from the blogs table
            ->get();
    
        return response()->json(['favoriteBlogs' => $favoriteBlogs]);
    }
    
    public function addToFavorite(Request $request, $userId, $blogId)
    {
        // Retrieve the user by ID
        $user = User::findOrFail($userId);
    
        // Attach the blog to the user's favorites
        $user->blog_favorites()->attach($blogId);
    
        return response()->json(['message' => 'Blog added to favorites.']);
    }
    public function removeFromFavorite(Request $request, $userId, $blogId)
    {
        // Retrieve the user by ID
        $user = User::findOrFail($userId);

        // Detach the blog from the user's favorites
        $user->blog_favorites()->detach($blogId);

        return response()->json(['message' => 'Blog removed from favorites.']);
    }
    public function isFavorited($userId, $blogId)
    {
        // Retrieve the user by ID
        $user = User::findOrFail($userId);

        // Check if the blog is in the user's favorites
        $isFavorited = $user->blog_favorites()->where('blog_id', $blogId)->exists();

        return response()->json(['isFavorited' => $isFavorited]);
    }


    


}
