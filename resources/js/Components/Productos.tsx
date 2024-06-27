import React, { useState } from "react";
import ModalAgregarProducto from "./ModalAgregarProducto";
import ModalEditarProducto from "./ModalEditarProducto";
import { confirmarEliminacion, eliminarProducto } from "../utils";
import useProductos from "../../hooks/useProductos";
import { Button } from "@/shadcn/ui/button";
import Swal from "sweetalert2";

interface Producto {
    id: number;
    nombre: string;
    importe: number;
    cantidad: number;
}

const TablaProductos = () => {
    const { productos, agregarProducto, editarProducto, cargarProductos } = useProductos();
    const [productoEditar, setProductoEditar] = useState<Producto | null>(null);

    const handleEditarProducto = async (producto: Producto) => {
        try {
            await editarProducto(producto);
            cargarProductos();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto editado',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Lista de Productos
            </h1>
            <div className="overflow-x-auto">
                <button
                    type="button"
                    className="btn btn-primary mb-4"
                    data-bs-toggle="modal"
                    data-bs-target="#modalAgregarProducto"
                >
                    Agregar Producto
                </button>

                <ModalAgregarProducto onAgregarProducto={agregarProducto} />
                <ModalEditarProducto producto={productoEditar} onEditarProducto={handleEditarProducto} />

                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Nombre</th>
                            <th className="py-2 px-4 text-left">Importe</th>
                            <th className="py-2 px-4 text-left">Cantidad</th>
                            <th className="py-2 px-4 text-left">Eliminar</th>
                            <th className="py-2 px-4 text-left">Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td className="py-2 px-4">{producto.id}</td>
                                <td className="py-2 px-4">{producto.nombre}</td>
                                <td className="py-2 px-4">{producto.importe}</td>
                                <td className="py-2 px-4">{producto.cantidad}</td>
                                <td className="py-2 px-4">
                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            confirmarEliminacion(
                                                producto.id,
                                                eliminarProducto,
                                                cargarProductos
                                            )
                                        }
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => setProductoEditar(producto)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditarProducto"
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaProductos;
