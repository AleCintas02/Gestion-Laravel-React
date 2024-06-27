// src/hooks/useProductos.ts
import { useState, useEffect } from "react";
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

const useProductos = () => {
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
        cargarProductos();
    };

    return {
        productos,
        cargarProductos,
        agregarProducto,
    };
};

export default useProductos;
