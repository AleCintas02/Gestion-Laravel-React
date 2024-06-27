// src/utils.ts
import Swal from "sweetalert2";
import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api";

export const confirmarEliminacion = (id: number, eliminarProducto: (id: number) => Promise<void>, cargarProductos: () => void) => {
    Swal.fire({
        title: "¿Estás seguro que deseas eliminar este producto?",
        text: "¡Una vez eliminado no se podrá recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarProducto(id).then(() => {
                Swal.fire({
                    title: "¡Producto eliminado!",
                    text: "Presione OK para continuar",
                    icon: "success"
                });
                cargarProductos(); // Recargar productos después de eliminar
            });
        }
    });
};

export const eliminarProducto = async (id: number) => {
    try {
        await axios.delete(`${endpoint}/producto/${id}`);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
};
