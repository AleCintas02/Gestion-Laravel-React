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

    public function update(Request $request, $id)
    {
        // Validar los datos de entrada
        $request->validate([
            'nombre' => 'required|string',
            'importe' => 'required|numeric',
            'cantidad' => 'required|integer',
        ]);

        // Buscar el producto por ID
        $producto = Producto::find($id);
        if ($producto) {
            // Actualizar los datos del producto
            $producto->nombre = $request->nombre;
            $producto->importe = $request->importe;
            $producto->cantidad = $request->cantidad;

            // Guardar los cambios en la base de datos
            $producto->save();

            // Devolver una respuesta JSON con el producto actualizado
            return response()->json($producto, 200);
        } else {
            // Devolver una respuesta JSON indicando que el producto no fue encontrado
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }

    public function aumentarPrecios(Request $request)
    {
        $porcentaje = $request->input('porcentaje');

        // Validación del porcentaje (opcional)
        // Puedes realizar validaciones adicionales aquí si es necesario

        // Actualización de precios de productos
        Producto::chunk(100, function ($productos) use ($porcentaje) {
            foreach ($productos as $producto) {
                $producto->importe += $producto->importe * ($porcentaje / 100);
                $producto->save();
            }
        });

        return response()->json(['message' => 'Precios actualizados correctamente'], 200);
    }

    public function disminuirPrecios(Request $request)
    {
        $porcentaje = $request->input('porcentaje');

        // Validación del porcentaje (puede ser necesario dependiendo de tus requisitos)
        if (!is_numeric($porcentaje) || $porcentaje <= 0) {
            return response()->json(['message' => 'El porcentaje debe ser un número positivo.'], 400);
        }

        // Obtener todos los productos
        $productos = Producto::all();

        // Aplicar la disminución de precios
        foreach ($productos as $producto) {
            $producto->importe *= (1 - ($porcentaje / 100)); // Disminuir el precio según el porcentaje
            $producto->save();
        }

        return response()->json(['message' => 'Se han disminuido los precios de los productos correctamente.'], 200);
    }
}
