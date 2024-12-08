<?php

namespace App\Http\Controllers;



use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  public function index(Request $request)
{
    // Retrieve the category_id from the request
    $categoryId = $request->query('category');

    // If a category is selected, filter blogs by that category
    if ($categoryId) {
        $blogs = Blog::where('category_id', $categoryId)->get();
    } else {
        // Otherwise, retrieve all blogs
        $blogs = Blog::all();
    }

    // Return the filtered blogs (or all if no filter is applied) as JSON
    return response()->json($blogs);
}
    



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate(
            [
                'user_Id' => 'required|numeric',
                'title' => 'string|max:255',
                'image' => 'required|string',  // Change: Validate image as a URL
                'article' => 'required|string',
                'category_id' => 'numeric',
                'short_description'=>'nullable| string'
            ],
            [
                'title.required' => 'The title field is required.',
                'image.required' => 'An image URL is required.',
                // 'image.url' => 'The image must be a valid URL.',
                'article.required' => 'The article field is required.',
            ]
        );
    
        try {
            // Assign the image URL to the validated data (no file upload logic needed)
            $validated['image'] = $request->input('image');  // Using the provided URL
    
            // Create the blog entry
            $blog = Blog::create($validated);
    
            return response()->json(['message' => 'Blog created successfully', 'blog' => $blog], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create blog', 'details' => $e->getMessage()], 500);
        }
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $blog = Blog::with(['user' , 'category'])->find($id);

    if (!$blog) {
        return response()->json(['message' => 'Blog not found'], 404);
    }

    return response()->json($blog);
}

    /**
     * Update the specified resource in storage.
     */
    
     public function update(Request $request, $id)
     {
         // Validate the incoming data
         $validatedData = $request->validate([
             'title' => 'nullable|string|max:255', // title is optional now
             'article' => 'nullable|string', // article is optional now
             'category_id' => 'nullable|integer', // category_id is optional now
             'image' => 'nullable|url', // Validate the image as a URL if provided
         ]);
     
         // Find the blog by ID
         $blog = Blog::find($id);
         if (!$blog) {
             return response()->json(['message' => 'Blog not found'], 404);
         }
     
         // Update fields only if they are provided
         if ($request->has('title')) {
             $blog->title = $validatedData['title'];
         }
         if ($request->has('article')) {
             $blog->article = $validatedData['article'];
         }
         if ($request->has('category_id')) {
             $blog->category_id = $validatedData['category_id'];
         }
         if ($request->has('image')) {
             $blog->image = $validatedData['image']; // Update the image URL if provided
         }
     
         // Save the updated blog
         $blog->save();
     
         // Return the updated blog
         return response()->json([
             'message' => 'Blog updated successfully',
             'blog' => $blog
         ]);
     }
     
     
     
     
     
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the blog
        $blog = Blog::find($id);
    
        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }
    
        // Optionally delete the associated image
        if ($blog->image && Storage::exists($blog->image)) {
            Storage::delete($blog->image);
        }
    
        // Delete the blog
        $blog->delete();
    
        return response()->json(['message' => 'Blog deleted successfully']);
    }
    

    public function getBlogUser($id){

        $blogs = Blog::with('user' , 'category')->where('user_id', '=', $id)->get();

        return response()->json($blogs);

    }
}
