<?php

namespace App\Http\Controllers;

use App\Models\FriendsList;
use App\Models\User;
use Illuminate\Http\Request;

class FriendsListController extends Controller
{
    /**
     * Show all friends of the user.
     */
    public function showAllFriends($userId)
    {
        $friends = FriendsList::where('user_id', $userId)
                    ->where('status', 'accepted')
                    ->orWhere('friend_id', $userId)
                    ->where('status', 'accepted')
                    ->get();

        return response()->json($friends);
    }

    /**
     * Send a friend request.
     */
    public function sendFriendRequest(Request $request)
    {
        $friendId = $request->input('friend_id');
        $userId = $request->user()->id;

        // Check if the friend request already exists
        $exists = FriendsList::where('user_id', $userId)->where('friend_id', $friendId)->first();
        if ($exists) {
            return response()->json(['message' => 'Friend request already sent.'], 400);
        }

        // Create a new friend request
        FriendsList::create([
            'user_id' => $userId,
            'friend_id' => $friendId,
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Friend request sent.']);
    }

    /**
     * Accept a friend request.
     */
    public function acceptFriendRequest(Request $request)
    {
        $friendId = $request->input('friend_id');
        $userId = $request->user()->id;

        // Find the pending friend request
        $friendRequest = FriendsList::where(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $friendId)->where('friend_id', $userId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $userId)->where('friend_id', $friendId);
        })->where('status', 'pending')->first();

        if (!$friendRequest) {
            return response()->json(['message' => 'No pending friend request found.'], 404);
        }

        // Accept the friend request
        $friendRequest->update(['status' => 'accepted']);

        return response()->json(['message' => 'Friend request accepted.']);
    }
    public function deleteFriend(Request $request)
    {
        $friendId = $request->input('friend_id');
        $userId = $request->user()->id;

        // Find the friend relationship, either user is the sender or receiver of the friend request
        $friendship = FriendsList::where(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $userId)->where('friend_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('user_id', $friendId)->where('friend_id', $userId);
        })->first();

        // Check if the friendship exists
        if (!$friendship) {
            return response()->json(['message' => 'Friendship not found.'], 404);
        }

        // Delete the friendship
        $friendship->delete();

        return response()->json(['message' => 'Friend deleted successfully.']);
    }
}
