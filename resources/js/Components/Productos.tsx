import React, { useState } from "react";
import ModalAgregarProducto from "./ModalAgregarProducto";
import ModalEditarProducto from "./ModalEditarProducto";
import { confirmarEliminacion, eliminarProducto } from "../utils";
import useProductos from "../../hooks/useProductos";
import { Button } from "@/shadcn/ui/button";
import Swal from "sweetalert2";
import { Input } from "@/shadcn/ui/input";
import axios from "axios";

interface Producto {
    id: number;
    nombre: string;
    importe: number;
    cantidad: number;
}

const TablaProductos = () => {
    const { productos, agregarProducto, editarProducto, cargarProductos } =
        useProductos();
    const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
    const [filtro, setFiltro] = useState<string>("");
    const [paginaActual, setPaginaActual] = useState<number>(1);
    const [porcentajeAumento, setPorcentajeAumento] = useState<number>(0);
    const [porcentajeDisminucion, setPorcentajeDisminucion] =
        useState<number>(0); // Nuevo estado para el porcentaje de disminución

    const productosFiltrados = productos.filter((producto) => {
        const filtroMinusculas = filtro.toLowerCase();
        return (
            producto.nombre.toLowerCase().includes(filtroMinusculas) ||
            producto.id.toString().includes(filtroMinusculas)
        );
    });

    // Lógica para la paginación
    const productosPorPagina = 10;
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosPaginados = productosFiltrados.slice(
        indicePrimerProducto,
        indiceUltimoProducto
    );

    const handleEditarProducto = async (producto: Producto) => {
        try {
            await editarProducto(producto);
            cargarProductos();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto editado",
                showConfirmButton: false,
                timer: 1500,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error al editar el producto:", error);
        }
    };

    const handlePaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const handlePaginaSiguiente = () => {
        if (indiceUltimoProducto < productosFiltrados.length) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const aumentarPrecios = async () => {
        try {
            const response = await axios.post(
                "/api/productos/aumentar-precios",
                {
                    porcentaje: porcentajeAumento,
                }
            );
            console.log(response.data.message); // Manejo de la respuesta del backend
            cargarProductos(); // Actualizar productos después de la modificación
        } catch (error) {
            console.error("Error al aumentar los precios:", error);
        }
    };

    const disminuirPrecios = async () => {
        try {
            const response = await axios.post(
                "/api/productos/disminuir-precios",
                {
                    porcentaje: porcentajeDisminucion,
                }
            );
            console.log(response.data.message); // Manejo de la respuesta del backend
            cargarProductos(); // Actualizar productos después de la modificación
        } catch (error) {
            console.error("Error al disminuir los precios:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Lista de Productos
            </h1>
            <div className="mb-4 flex flex-col md:flex-row items-center">
                <Input
                    type="text"
                    className="form-input mb-2 md:mb-0 mr-0 md:mr-4 w-full md:w-45"
                    placeholder="Buscar por nombre o ID"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <div className="flex flex-wrap">
                    <div className="mr-4 mb-2 md:mb-0">
                        <Input
                            type="number"
                            className="form-input w-full md:w-24"
                            placeholder="Aumento %"
                            value={porcentajeAumento}
                            onChange={(e) =>
                                setPorcentajeAumento(parseInt(e.target.value))
                            }
                        />
                    </div>
                    <button
                        className="btn btn-primary mr-4"
                        onClick={aumentarPrecios}
                    >
                        Aplicar %
                    </button>
                    <div className="mr-2">
                        <Input
                            type="number"
                            className="form-input w-full md:w-24 mt-2"
                            placeholder="Disminución %"
                            value={porcentajeDisminucion}
                            onChange={(e) =>
                                setPorcentajeDisminucion(
                                    parseInt(e.target.value)
                                )
                            }
                        />
                    </div>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={disminuirPrecios}
                    >
                        Disminuir %
                    </button>
                </div>
            </div>
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
                <ModalEditarProducto
                    producto={productoEditar}
                    onEditarProducto={handleEditarProducto}
                />

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
                        {productosPaginados.map((producto) => (
                            <tr key={producto.id}>
                                <td className="py-2 px-4">{producto.id}</td>
                                <td className="py-2 px-4">{producto.nombre}</td>
                                <td className="py-2 px-4">
                                    $
                                    {typeof producto.importe === "number"
                                        ? producto.importe.toFixed(2)
                                        : producto.importe}
                                </td>
                                <td className="py-2 px-4">
                                    {producto.cantidad}
                                </td>
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
                                        onClick={() =>
                                            setProductoEditar(producto)
                                        }
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
                {/* Controles de paginación */}
                <div className="mt-4 flex justify-end">
                    <button
                        className={`btn ${
                            paginaActual === 1 ? "btn-secondary" : "btn-primary"
                        }`}
                        onClick={handlePaginaAnterior}
                        disabled={paginaActual === 1}
                        style={{ marginRight: "10px" }} // Agrega margen derecho al primer botón
                    >
                        <i className="bi bi-arrow-left-circle"></i> Anterior
                    </button>
                    <button
                        className={`btn ${
                            indiceUltimoProducto >= productosFiltrados.length
                                ? "btn-secondary"
                                : "btn-primary"
                        }`}
                        onClick={handlePaginaSiguiente}
                        disabled={
                            indiceUltimoProducto >= productosFiltrados.length
                        }
                    >
                        Siguiente <i className="bi bi-arrow-right-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablaProductos;
