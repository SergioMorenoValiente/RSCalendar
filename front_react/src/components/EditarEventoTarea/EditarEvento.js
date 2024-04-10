import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './EditarEvento.css';

function EditarEvento() {

    const [startDate, setStartDate] = useState(new Date());
    const [nombre, setNombre] = useState('');
    const [fechInicio, setFechInicio] = useState('');
    const [fechFin, setFechFin] = useState('');
    const [calendarioId, setCalendarioId] = useState(0);
    const [error, setError] = useState('');
    const [eventoId, setEventoId] = useState(null);

    useEffect(() => {
        // Obtener el ID del evento de la URL
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        if (!id) {
            setError('ID del evento no proporcionado en la URL');
            return;
        }
        setEventoId(id);

        // Cargar los datos del evento
        fetchEventData(id);
    }, []);

    async function fetchEventData(eventId) {
        try {
            const response = await fetch(`https://localhost:7143/api/Eventoes/${eventId}`);
            if (!response.ok) {
                throw new Error('Error al cargar los datos del evento');
            }
            const eventData = await response.json();
            setNombre(eventData.nombre);
            setFechInicio(eventData.fechInicio);
            setFechFin(eventData.fechFin);
            setCalendarioId(eventData.calendarioId);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://localhost:7143/api/Eventoes/${eventoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    fechInicio,
                    fechFin,
                    calendarioId
                })
            });

            if (!response.ok) {
                throw new Error('Error al editar el evento');
            }

            // Limpiar los campos después de enviar el formulario
            setNombre('');
            setFechInicio('');
            setFechFin('');
            setCalendarioId(0);
            setError('');

            window.location.href = "/";
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="creareventotarea-container">
            <div className="form-container">
                <h1 className="h1">EDITAR EVENTO</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <div>
                        <label htmlFor="nombre">Título del Evento:</label>
                        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="fecha-container">
                        <div>
                            <label htmlFor="fechInicio">Fecha de Inicio:</label>
                            <input type="datetime-local" id="fechInicio" value={fechInicio} onChange={(e) => setFechInicio(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="fechFin">Fecha de Fin:</label>
                            <input type="datetime-local" id="fechFin" value={fechFin} onChange={(e) => setFechFin(e.target.value)} required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="calendarioId">ID del Calendario:</label>
                        <input type="number" id="calendarioId" value={calendarioId} onChange={(e) => setCalendarioId(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit">Editar Evento</button>
                        <button >Eliminar Evento</button>
                        <Link to="/" className="sidebar-link">
                            <span>Volver</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

//    Por si pudieramos implementarlo   
//    <div className="checkbox-container">
//        <input type="checkbox" id="todoElDia" checked={todoElDia}
//            onChange={(e) => setTodoElDia(e.target.checked)} />
//        <label htmlFor="todoElDia">Todo el día</label>
//    </div>



export default EditarEvento;