<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class DonationController extends Controller
{
    public function index()
    {
        $donations = Donation::where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'name' => $donation->name,
                    'description' => $donation->description,
                    'organization' => $donation->organization,
                    'goal_amount' => (float) $donation->goal_amount,
                    'raised_amount' => (float) $donation->raised_amount,
                    'is_active' => $donation->is_active,
                    'created_at' => $donation->created_at,
                    'updated_at' => $donation->updated_at,
                    'progress_percentage' => $donation->progress_percentage
                ];
            });
        
        return response()->json($donations);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'organization' => 'required|string|max:255',
                'goal_amount' => 'required|numeric|min:0.01',
            ]);

            $validated['user_id'] = Auth::id();

            $donation = Donation::create($validated);

            $donationData = [
                'id' => $donation->id,
                'name' => $donation->name,
                'description' => $donation->description,
                'organization' => $donation->organization,
                'goal_amount' => (float) $donation->goal_amount,
                'raised_amount' => (float) $donation->raised_amount,
                'is_active' => $donation->is_active,
                'created_at' => $donation->created_at,
                'updated_at' => $donation->updated_at,
                'progress_percentage' => $donation->progress_percentage
            ];

            return response()->json($donationData, Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dados inválidos',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function show(string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Doação não encontrada'
            ], Response::HTTP_NOT_FOUND);
        }

        $donationData = [
            'id' => $donation->id,
            'name' => $donation->name,
            'description' => $donation->description,
            'organization' => $donation->organization,
            'goal_amount' => (float) $donation->goal_amount,
            'raised_amount' => (float) $donation->raised_amount,
            'is_active' => $donation->is_active,
            'created_at' => $donation->created_at,
            'updated_at' => $donation->updated_at,
            'progress_percentage' => $donation->progress_percentage
        ];

        return response()->json($donationData);
    }

    public function update(Request $request, string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Doação não encontrada'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($donation->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Não autorizado'
            ], Response::HTTP_FORBIDDEN);
        }

        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'organization' => 'sometimes|required|string|max:255',
                'goal_amount' => 'sometimes|required|numeric|min:0.01',
                'is_active' => 'sometimes|boolean',
            ]);

            $donation->update($validated);

            $donationData = [
                'id' => $donation->id,
                'name' => $donation->name,
                'description' => $donation->description,
                'organization' => $donation->organization,
                'goal_amount' => (float) $donation->goal_amount,
                'raised_amount' => (float) $donation->raised_amount,
                'is_active' => $donation->is_active,
                'created_at' => $donation->created_at,
                'updated_at' => $donation->updated_at,
                'progress_percentage' => $donation->progress_percentage
            ];

            return response()->json($donationData);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dados inválidos',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function destroy(string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Doação não encontrada'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($donation->user_id !== Auth::id()) {
            return response()->json([
                'message' => 'Não autorizado'
            ], Response::HTTP_FORBIDDEN);
        }

        $donation->delete();

        return response()->json([
            'message' => 'Doação excluída com sucesso'
        ]);
    }

    public function contribute(Request $request, string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Doação não encontrada'
            ], Response::HTTP_NOT_FOUND);
        }

        if (!$donation->is_active) {
            return response()->json([
                'message' => 'Esta doação não está mais ativa'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            $validated = $request->validate([
                'amount' => 'required|numeric|min:0.01',
            ]);

            $donation->raised_amount = $donation->raised_amount + $validated['amount'];
            $donation->save();

            return response()->json([
                'message' => 'Contribuição realizada com sucesso',
                'donation' => $donation,
                'progress_percentage' => $donation->progress_percentage
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dados inválidos',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function userDonations()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['message' => 'Usuário não autenticado'], 401);
        }

        $donations = $user->donations()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'name' => $donation->name,
                    'description' => $donation->description,
                    'organization' => $donation->organization,
                    'goal_amount' => (float) $donation->goal_amount,
                    'raised_amount' => (float) $donation->raised_amount,
                    'is_active' => $donation->is_active,
                    'created_at' => $donation->created_at,
                    'updated_at' => $donation->updated_at,
                    'progress_percentage' => $donation->progress_percentage
                ];
            });
        
        return response()->json($donations);
    }
}
