import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
            .get<Producto[]>(`${endpoint}/productos`)
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

    const editarProducto = async (producto: Producto) => {
        try {
            const response = await axios.put(`${endpoint}/producto/${producto.id}`, {
                nombre: producto.nombre,
                importe: producto.importe.toString(),
                cantidad: producto.cantidad.toString(),
            });
            console.log("Producto editado exitosamente:", response.data);
            cargarProductos(); 
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto editado',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error al editar producto:", error);
        }
    };
    

    return {
        productos,
        cargarProductos,
        agregarProducto,
        editarProducto,
    };
};

export default useProductos;
