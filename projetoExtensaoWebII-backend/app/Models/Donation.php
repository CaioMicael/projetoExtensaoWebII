<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'organization',
        'goal_amount',
        'raised_amount',
        'is_active',
        'user_id'
    ];

    protected $casts = [
        'goal_amount' => 'decimal:2',
        'raised_amount' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    public function getProgressPercentageAttribute()
    {
        if ($this->goal_amount <= 0) {
            return 0;
        }
        return round(($this->raised_amount / $this->goal_amount) * 100, 2);
    }

    public function isGoalReached()
    {
        return $this->raised_amount >= $this->goal_amount;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
