<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{


    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'body' => ['required', 'string', 'max:500'],
            'user_id' => ['required', 'integer'],
        ]);

        $user = $request->user();

        $post = Post::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => $user->id
        ]);


        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post,
            'user_id' => Auth::id(),
        ]);
    }

    public function show(string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'no post found.',
            ]);
        }

        return response()->json([
            'post' => $post
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:100'],
            'body' => ['required', 'string', 'max:500']
        ]);

        $post = Post::find($id);

        if (!$post) {
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

    public function destroy(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'no post found to delete.'
            ]);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }


    // New method: Show posts from the user's friends list (based on approved friend requests)
    public function showPosts(Request $request)
    {
        // Get the authenticated user
        $currentUserId = auth('sanctum')->user()->id;
        $userId = $request->user()->id;

        // Get the authenticated user's ID
        // $userId = auth()->id();

        // Get the friend IDs who accepted the friend request
        $friendIds = DB::table('friends_list')
            ->where(function ($query) use ($userId) {
                $query->where('user_id', $userId)
                    ->orWhere('friend_id', $userId);
            })
            ->where('status', 'accepted') // Assuming 'accepted' indicates the friendship is mutual
            ->pluck('user_id', 'friend_id') // Collect user_id and friend_id
            ->flatten() // Merge user_id and friend_id columns into one array
            ->toArray();

        // Include the user's own ID along with the friendIds
        $friendIds[] = $userId;

        // Fetch posts from the user and their friends (in both directions)
        $posts = Post::whereIn('user_id', $friendIds)->latest()->get();

        return response()->json([
            'posts' => $posts,
            'current user ID' => $currentUserId,
            'friend IDs' => $friendIds
        ]);
    }
}
