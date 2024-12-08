<?php

use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/blogs/{id}/comments', [CommentController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);
Route::get('/search', [BlogController::class, 'search']);
Route::post('/blogs/{id}/comments', [CommentController::class, 'store']);

Route::controller(HomeController::class)->name('home.')->group(function (){
    Route::get('/home', 'index')->name('index');
});

Route::post('/favorites/{userId}/{blogId}', [BlogController::class, 'addToFavorite']);
Route::delete('/favorites/{userId}/{blogId}', [BlogController::class, 'removeFromFavorite']);
Route::get('/favorites/{userId}/{blogId}', [BlogController::class, 'isFavorited']);
Route::get('/favorites/blogs', [BlogController::class, 'getFavoriteBlogs']);
