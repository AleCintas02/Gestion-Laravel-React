import React, { useState, useEffect } from "react";
import ModalAgregarProducto from "./ModalAgregarProducto";
import axios from "axios";


interface Producto {
    id: number;
    nombre: string;
    importe: number;
    cantidad: number;
}

interface NuevoProducto {
    nombre: string;
    importe: string;
    cantidad: string;
}

const endpoint = "http://127.0.0.1:8000/api";

const TablaProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = () => {
        axios
            .get(`${endpoint}/productos`)
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });
    };

    const agregarProducto = (producto: NuevoProducto) => {
        console.log("Producto agregado:", producto);
        const modal = document.getElementById("modalAgregarProducto");
        if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
        }
    };

    const eliminarProducto = async (id: number) => {
        try {
            await axios.delete(`${endpoint}/producto/${id}`);
            cargarProductos(); // Recargar productos después de eliminar
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
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
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Nombre</th>
                            <th className="py-2 px-4 text-left">Importe</th>
                            <th className="py-2 px-4 text-left">Cantidad</th>
                            <th className="py-2 px-4 text-left">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td className="py-2 px-4">{producto.id}</td>
                                <td className="py-2 px-4">{producto.nombre}</td>
                                <td className="py-2 px-4">
                                    {producto.importe}
                                </td>
                                <td className="py-2 px-4">
                                    {producto.cantidad}
                                </td>
                                <td className="py-2 px-4">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            eliminarProducto(producto.id)
                                        }
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
