<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    // public function show()
    // {
    //     // Retrieve and return the authenticated user
    //     $user = auth()->user();
    
    //     return response()->json($user);
    // }

    public function show($id =1)
{
    // Retrieve the authenticated user
    // $user = auth()->user();

    // // Ensure the logged-in user is authorized to view the requested resource
    // if ($user->id != $id) {
    //     return response()->json(['error' => 'Unauthorized access'], 403);
    // }


    // Fetch the user-specific data (adjust model or logic as needed)
    $userData = User::withCount('blog')->findOrFail($id);

    return response()->json($userData);
}

    
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'about' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
        ]);

        $user->name = $request->name;
        $user->about = $request->about;
        $user->address = $request->address;
        $user->email = $request->email;

        if ($request->password) {
            $user->password = bcrypt($request->password);
        }

        $user->save();

        return response()->json($user, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
