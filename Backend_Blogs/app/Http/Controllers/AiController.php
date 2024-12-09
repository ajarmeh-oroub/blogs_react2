<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller
{
    // public function getAnswerFromArticle(Request $request)
    // {
    //     // Validate the input
    //     $request->validate([
    //         'article' => 'required|string',
    //         'question' => 'required|string',
    //     ]);

    //     // Extract article text and question from the request
    //     $article = $request->input('article');
    //     $question = $request->input('question');

    //     // Prepare the OpenAI API request
    //     $response = Http::withHeaders([
    //         'Content-Type' => 'application/json',
    //         'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
    //     ])->post('https://api.openai.com/v1/chat/completions', [
    //         'model' => 'gpt-4',
    //         'messages' => [
    //             [
    //                 'role' => 'system',
    //                 'content' => 'You are a helpful assistant. Answer questions only based on the provided article text.'
    //             ],
    //             [
    //                 'role' => 'user',
    //                 'content' => "Here is the article:\n\n$article\n\nBased on this article, answer the following question: $question"
    //             ],
    //         ],
    //     ]);

    //     // Extract the response content
    //     $result = $response->json()['choices'][0]['message']['content'];

    //     // Return the answer
    //     return response()->json(['answer' => $result]);
    // }

    public function getAnswerFromArticle(Request $request)
    {
        $apiKey = env('GOOGLE_API_KEY');  // Store your API key in the .env file
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={$apiKey}";
    
        // Validate the incoming request
        $request->validate([
            'question' => 'required|string',
            'article' => 'required|string',
        ]);
    
        $question = $request->input('question');
        $article = $request->input('article');
    
        // Prepare the content for the request to the AI API
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($url, [
            'contents' => [
                [
                    'parts' => [
                        [
                            // 'text' => "Article: {$article} \n\nQuestion: {$question}"
                            'text' => "You are a helpful assistant. Answer questions only based on the provided article text. Here is the article:\n\n$article\n\nBased on this article, answer the following question: $question"
                        ]
                    ]
                ]
            ]
        ]);
    
        // Check if the request was successful
        if ($response->successful()) {
            $answer = $response->json(); // Extract the answer from the API response
            
            // Extract the text from the response
            // $text = $answer['answer']['candidates'][0]['content']['parts'][0]['text'];
            $text = $answer['candidates'][0]['content']['parts'][0]['text'];
    
            return response()->json([
                'answer' => $text
            ]);
        }
    
        // Handle error
        return response()->json(['error' => 'Failed to generate content'], 500);
    }
    


    public function generateBlog(Request $request)
    {
        // Validate the input
        $request->validate([
            'subject' => 'required|string',
        ]);
    
        // Extract subject from the request
        $subject = $request->input('subject');
    
        // Prepare the OpenAI API request
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'o1-preview',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are a professional content writer. Write a detailed and engaging blog about the given subject.'
                ],
                [
                    'role' => 'user',
                    'content' => "Please write a blog about: $subject"
                ],
            ],
        ]);
    
        // Extract the response content
        if ($response->successful()) {
            $result = $response->json()['choices'][0]['message']['content'];
    
            // Return the generated blog
            return response()->json(['blog' => $result]);
        } else {
            // Handle API errors
            return response()->json([
                'error' => 'Failed to generate blog. Please try again later.',
                'details' => $response->json(),
            ], $response->status());
        }
    }
    
}
