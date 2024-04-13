import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './EditarTarea.css';

function EditarTarea() {

    //Para la fecha de inicio del evento
    const [startDate, setStartDate] = useState(new Date());

    //Para los campos del formulario
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [completado, setCompletado] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [error, setError] = useState('');
    const [tareaId, setTareaId] = useState(null);
    const [tituloError, setTituloError] = useState(null);


    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = Number(searchParams.get('id'));
        setTareaId(id);
        fetchTareaData(id);
    }, []);

    //Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setTituloError('');

        let hasError = false;

        if (!titulo) {
            setTituloError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7143/api/tareas/${tareaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: tareaId,
                    nombre: titulo,
                    fechInicio: fecha,
                    completado: completado,
                    usuarioId: usuarioId
                })
            });

            if (!response.ok) {
                throw new Error('Error al editar el evento');
            }
            setTitulo('');
            setFecha('');
            setCompletado('');
            setUsuarioId('');
            setError('');

            window.location.href = "/Tareas";
        } catch (error) {
            setError(error.message);
        }
    };

    //Borrar tarea
    const borrarTarea = async () => {
        try {
            const response = await fetch(`https://localhost:7143/api/tareas/${tareaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al borrar el evento');
            }
            window.location.href = "/Tareas";
        } catch (error) {
            setError(error.message);
        }
    };

    async function fetchTareaData(tareaId) {
        try {
            const response = await fetch(`https://localhost:7143/api/Tareas/${tareaId}`);
            if (!response.ok) {
                throw new Error('Error al cargar los datos de la tarea');
            }
            const tareaData = await response.json();
            setTitulo(tareaData.nombre);
            setFecha(tareaData.fechInicio);
            setCompletado(tareaData.completado);
            setUsuarioId(tareaData.usuarioId);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="creareventotarea-container">
            <div className="form-container">
                <h1 className="h1">EDITAR TAREA</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="titulo">Título de la Tarea:</label>
                        <input type="text" id="titulo" value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} />
                    </div>
                    <p>{tituloError}</p>

                    <div className="button-container">
                        <button type="submit">Editar Tarea</button>
                        <button onClick={() => borrarTarea()}>Eliminar Tarea</button>
                        <Link to="/" className="sidebar-link">
                            <span>Volver</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default EditarTarea;
