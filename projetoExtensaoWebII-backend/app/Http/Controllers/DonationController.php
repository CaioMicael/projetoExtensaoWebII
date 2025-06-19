<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Tag(
 *     name="Doações",
 *     description="API para gerenciamento de doações"
 * )
 */
class DonationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/donations",
     *     summary="Listar todas as doações",
     *     tags={"Doações"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de doações"
     *     )
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/donations",
     *     summary="Criar uma nova doação",
     *     tags={"Doações"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","description","organization","goal_amount"},
     *             @OA\Property(property="name", type="string", example="Ajuda para Enchentes"),
     *             @OA\Property(property="description", type="string", example="Campanha para ajudar vítimas de enchentes"),
     *             @OA\Property(property="organization", type="string", example="Cruz Vermelha"),
     *             @OA\Property(property="goal_amount", type="number", format="float", example=10000.00)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Doação criada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Dados inválidos"
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'organization' => 'required|string|max:255',
                'goal_amount' => 'required|numeric|min:0.01',
            ]);

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

            return response()->json([
                'message' => 'Doação criada com sucesso',
                'donation' => $donationData
            ], Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dados inválidos',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/donations/{id}",
     *     summary="Obter uma doação específica",
     *     tags={"Doações"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes da doação"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Doação não encontrada"
     *     )
     * )
     */
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

    /**
     * @OA\Put(
     *     path="/api/donations/{id}",
     *     summary="Atualizar uma doação",
     *     tags={"Doações"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Ajuda para Enchentes"),
     *             @OA\Property(property="description", type="string", example="Campanha para ajudar vítimas de enchentes"),
     *             @OA\Property(property="organization", type="string", example="Cruz Vermelha"),
     *             @OA\Property(property="goal_amount", type="number", format="float", example=10000.00)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Doação atualizada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Doação não encontrada"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Dados inválidos"
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Doação não encontrada'
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'organization' => 'sometimes|required|string|max:255',
                'goal_amount' => 'sometimes|required|numeric|min:0.01',
            ]);

            $donation->update($validated);

            return response()->json([
                'message' => 'Doação atualizada com sucesso',
                'donation' => $donation
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dados inválidos',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/donations/{id}",
     *     summary="Excluir uma doação",
     *     tags={"Doações"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Doação excluída com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Doação não encontrada"
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json([
                'message' => 'Doação não encontrada'
            ], Response::HTTP_NOT_FOUND);
        }

        // Soft delete - marcar como inativa ao invés de deletar
        $donation->update(['is_active' => false]);

        return response()->json([
            'message' => 'Doação excluída com sucesso'
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/donations/{id}/contribute",
     *     summary="Contribuir para uma doação",
     *     tags={"Doações"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"amount"},
     *             @OA\Property(property="amount", type="number", format="float", example=100.00)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contribuição realizada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Doação não encontrada"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Dados inválidos"
     *     )
     * )
     */
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

            // Atualizar o valor arrecadado
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
}
