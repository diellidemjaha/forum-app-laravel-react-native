<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendsList extends Model
{
    use HasFactory;
    protected $table = 'friends_list';
    protected $fillable = ['user_id', 'friend_id', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the friend who received the request.
     */
    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
}
