<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index(){
        $posts = Post::all();

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'body' => ['required', 'string', 'max:500']
        ]);

        $post = Post::create([
            'title' => $request->title,
            'body' => $request->body 
        ]);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post
        ]);
    }

    public function show(string $id) {
        $post = Post::find($id);

        if(!$post) {
            return response()->json([
                'message' => 'no post found.',
            ]);
        }

        return response()->json([
            'post' => $post
        ]);
    }

    public function update(Request $request, string $id) {
        $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'body' => ['required', 'string', 'max:500']
        ]);
        
        $post = Post::find($id);

        if(!$post) {
            return response()->json([
                'message' => 'no post found to update.'
            ]);
        }

        $post = $post->update([
            'title' => $request->title,
            'body' => $request->body
        ]);

        return response()->json([
            'message' => 'Post updated succesfully'
        ]);
    }

    public function destroy(string $id) {
        $post = Post::find($id);
        if(!$post) {
            return response()->json([
                'message' => 'no post found to delete.'
            ]);
        }

       $post->delete();

       return response()->json([
        'message' => 'Post deleted successfully'
       ]);
        }
}
