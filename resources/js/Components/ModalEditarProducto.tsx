// src/components/ModalEditarProducto.tsx
import React, { useState, useEffect } from 'react';

interface Producto {
    id: number;
    nombre: string;
    importe: number;
    cantidad: number;
}

interface ModalEditarProductoProps {
    producto: Producto | null;
    onEditarProducto: (producto: Producto) => void;
}

const ModalEditarProducto: React.FC<ModalEditarProductoProps> = ({ producto, onEditarProducto }) => {
    const [nombre, setNombre] = useState('');
    const [importe, setImporte] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre);
            setImporte(producto.importe.toString());
            setCantidad(producto.cantidad.toString());
        }
    }, [producto]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!producto) return;

        const productoEditado: Producto = {
            ...producto,
            nombre,
            importe: parseFloat(importe),
            cantidad: parseInt(cantidad, 10),
        };

        onEditarProducto(productoEditado);

        // Cerrar el modal
        const modal = document.getElementById('modalEditarProducto');
        if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal).hide();
        }
    };

    return (
        <div className="modal fade" id="modalEditarProducto" tabIndex={-1} aria-labelledby="modalEditarProductoLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalEditarProductoLabel">Editar Producto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="importe" className="form-label">Importe</label>
                                <input type="number" className="form-control" id="importe" value={importe} onChange={(e) => setImporte(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                <input type="number" className="form-control" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarProducto;
