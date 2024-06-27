import React, { useState } from 'react';

interface NuevoProducto {
    nombre: string;
    importe: string;
    cantidad: string;
}

const ModalAgregarProducto: React.FC<{ onAgregarProducto: (producto: NuevoProducto) => void }> = ({ onAgregarProducto }) => {
    const [nombre, setNombre] = useState('');
    const [importe, setImporte] = useState('');
    const [cantidad, setCantidad] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfMetaTag ? csrfMetaTag.getAttribute('content') : null;
    
        if (!csrfToken) {
            console.error('CSRF token not found');
            return;
        }
    
        try {
            const response = await fetch('/api/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                body: JSON.stringify({ nombre, importe, cantidad }),
            });
    
            if (response.ok) {
                const productoGuardado = await response.json();
                onAgregarProducto(productoGuardado); // Llama a la función para agregar producto con el producto guardado
                setNombre('');
                setImporte('');
                setCantidad('');

                // Recargar la página después de agregar el producto
                window.location.reload();
            } else {
                console.error('Error al agregar el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud HTTP:', error);
        }
    };
    
    return (
        <div className="modal fade" id="modalAgregarProducto" tabIndex={-1} aria-labelledby="modalAgregarProductoLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalAgregarProductoLabel">Agregar Producto</h5>
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
                            <button type="submit" className="btn btn-primary">Agregar Producto</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalAgregarProducto;
