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
        'is_active'
    ];

    protected $casts = [
        'goal_amount' => 'decimal:2',
        'raised_amount' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    // Método para calcular a porcentagem arrecadada
    public function getProgressPercentageAttribute()
    {
        if ($this->goal_amount <= 0) {
            return 0;
        }
        return round(($this->raised_amount / $this->goal_amount) * 100, 2);
    }

    // Método para verificar se a meta foi atingida
    public function isGoalReached()
    {
        return $this->raised_amount >= $this->goal_amount;
    }
}
