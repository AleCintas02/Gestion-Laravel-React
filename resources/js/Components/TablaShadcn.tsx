<Table>
                    <TableCaption>Lista de productos</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cantidad</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                            <TableHead className="text-right">
                                Eliminar
                            </TableHead>
                            <TableHead className="text-right">Editar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell className="font-medium">
                                    {producto.id}
                                </TableCell>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell>{producto.cantidad}</TableCell>
                                <TableCell className="text-right">
                                    {producto.importe}
                                </TableCell>
                                <TableCell className="text-right">
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
                                </TableCell>
                                <TableCell className="text-right">
                                    <button className="btn btn-warning">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>