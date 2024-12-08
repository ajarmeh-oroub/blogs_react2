<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
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

Route::get('/user/{id}/show' , [UserController::class , 'show'] );
Route::put('/user/{id}' , [UserController::class , 'update']);

Route::get('/blog' , [BlogController::class , 'index']);
Route::post('/blog/store' , [BlogController::class , 'store']); 
Route::put('blog/{id}/update', [BlogController::class , 'update']);
Route::get('/blogUser/{id}' , [BlogController::class, 'getBlogUser']);
Route::delete('blog/{id}/delete' , [BlogController::class , 'destroy']);

Route::get('/categories' , [CategoryController::class , 'index']);


Route::get('/blogs/{id}/comments', [CommentController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);
Route::post('/blogs/{id}/comments', [CommentController::class, 'store']);

Route::controller(HomeController::class)->name('home.')->group(function (){
    Route::get('/home', 'index')->name('index');
});

Route::post('/contact' , [ContactController::class , 'store']);
