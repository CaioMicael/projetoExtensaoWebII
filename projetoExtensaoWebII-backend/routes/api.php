<?php
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Http\Request;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('donations', [DonationController::class, 'index']);
Route::get('donations/{id}', [DonationController::class, 'show']);
Route::post('donations/{id}/contribute', [DonationController::class, 'contribute']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/users', function (Request $request) {
    $type = $request->query('type');
    $query = User::query();
    if ($type) {
        $query->where('type', $type);
    }
    return $query->get();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('products', ProductController::class);
    Route::post('logout', [AuthController::class, 'logout']);
    
    Route::get('user/donations', [DonationController::class, 'userDonations']);
    Route::post('donations', [DonationController::class, 'store']);
    Route::put('donations/{id}', [DonationController::class, 'update']);
    Route::delete('donations/{id}', [DonationController::class, 'destroy']);
});
