// src/components/TablaProductos.tsx
import React from "react";
import ModalAgregarProducto from "./ModalAgregarProducto";
import { confirmarEliminacion, eliminarProducto } from "../utils";
import useProductos from "../../hooks/useProductos";

const TablaProductos = () => {
    const { productos, cargarProductos, agregarProducto } = useProductos();

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
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Nombre</th>
                            <th className="py-2 px-4 text-left">Importe</th>
                            <th className="py-2 px-4 text-left">Cantidad</th>
                            <th className="py-2 px-4 text-left">Acciones</th>
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
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => confirmarEliminacion(producto.id, eliminarProducto, cargarProductos)}
                                    >
                                        Eliminar
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
