<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return response()->json($productos);
    }

    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'nombre' => 'required|string',
            'importe' => 'required|numeric',
            'cantidad' => 'required|integer',
        ]);

        // Crear un nuevo producto
        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->importe = $request->importe;
        $producto->cantidad = $request->cantidad;

        // Guardar el producto en la base de datos
        $producto->save();

        // Devolver una respuesta JSON con el producto creado
        return response()->json($producto, 201);
    }

    public function destroy($id)
{
    $producto = Producto::find($id);
    if ($producto) {
        $producto->delete();
        return response()->json(['message' => 'Producto eliminado con éxito'], 200);
    } else {
        return response()->json(['message' => 'Producto no encontrado'], 404);
    }
}
}
