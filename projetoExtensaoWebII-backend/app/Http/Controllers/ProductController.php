<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="Listar produtos",
     *     @OA\Response(
     *         response=200,
     *         description="Lista de produtos"
     *     )
     * )
     */
    public function index() {
        return Product::all();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);
        return Product::create($request->all());
    }

    /**
     * Retorna o produto especificado.
     *
     * @param  \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product) {
        return $product;
    }

    /**
     * Atualiza o produto especificado.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product) {
        $product->update($request->all());
        return $product;
    }

    public function destroy(Product $product) {
        $product->delete();
        return response()->noContent();
    }
}
