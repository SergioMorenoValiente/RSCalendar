import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './EditarEvento.css';
import { fetchData } from '../Services/Peticiones';

function EditarEvento() {

    //Constantes
    const [nombre, setNombre] = useState('');
    const [fechInicio, setFechInicio] = useState('');
    const [fechFin, setFechFin] = useState('');
    const [calendarioId, setCalendarioId] = useState(0);
    const [calendarios, setCalendarios] = useState([]);
    const [error, setError] = useState('');
    const [eventoId, setEventoId] = useState(null);
    const [nombreError, setNombreError] = useState('');
    const [fechInicioError, setFechInicioError] = useState('');
    const [fechFinError, setFechFinError] = useState('');
    const [calendariosError, setCalendariosError] = useState('');

    const [nombreeErrorVisible, setNombreeErrorVisible] = useState(false);
    const [fechInicioeErrorVisible, setFechInicioeErrorVisible] = useState(false);
    const [fechFineErrorVisible, setFechFineErrorVisible] = useState(false);
    const [calendarioseErrorVisible, setCalendarioseErrorVisible] = useState(false);

    //Cargar calendarios y recuperar id del evento de la URL
    useEffect(() => {
        async function fetchCalendarios() {
            try {
                const calendariosDelUsuario = await fetchData();
                setCalendarios(calendariosDelUsuario);
            } catch (error) {
                setError('Error al cargar los calendarios del usuario');
            }
        }
        fetchCalendarios();

        const searchParams = new URLSearchParams(window.location.search);
        const id = Number(searchParams.get('id'));

        if (!id) {
            setError('ID del evento no proporcionado en la URL');
            return;
        }
        setEventoId(id);

        fetchEventData(id);
    }, []);

    //Cargar datos del evento
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

    //Editar evento
    const handleSubmit = async (e) => {
        e.preventDefault();

        setNombreError('');
        setFechInicioError('');
        setFechFinError('');
        setCalendariosError('');

        let hasError = false;

        if (!nombre) {
            setNombreError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setNombreeErrorVisible(true);
            hasError = true;
        }
        if (!fechInicio) {
            setFechInicioError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setFechInicioeErrorVisible(true);
            hasError = true;
        } else if (fechInicio == undefined) {
            setFechInicioError('¡Escribe una fecha válida para desatar el poder en la Grieta!');
            setFechInicioeErrorVisible(true);
            hasError = true;
        }
        if (!fechFin) {
            setFechFinError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setFechFineErrorVisible(true);
            hasError = true;
        } else if (fechFin == undefined) {
            setFechFinError('¡Escribe una fecha válida para desatar el poder en la Grieta!');
            setFechFineErrorVisible(true);
            hasError = true;
        } else if (new Date(fechFin) <= new Date(fechInicio)) {
            setFechFinError('La fecha de fin debe brillar más allá de la fecha de inicio');
            setFechFineErrorVisible(true);
            hasError = true;
        }
        if (!calendarioId) {
            setCalendariosError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setCalendarioseErrorVisible(true);
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7143/api/Eventoes/${eventoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: eventoId,
                    nombre,
                    fechInicio,
                    fechFin,
                    calendarioId
                })
            });

            if (!response.ok) {
                throw new Error('Error al editar el evento');
            }
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

    //Borrar evento
    const borrarEvento = async () => {
        try {
            const response = await fetch(`https://localhost:7143/api/eventoes/${eventoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al borrar el evento');
            }
            window.location.href = "/";
        } catch (error) {
            setError(error.message);
        }
    };



    return (
        <div className="editarevento-container">
            <div className="form-container11">
                <h1 className="h1eevento">EDITAR EVENTO</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <div>
                        <label htmlFor="nombre">Título del Evento:</label>
                        <input type="text" id="nombre" value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            onClick={() => {
                                setNombreError('');
                                setNombreeErrorVisible(false);
                            }}
                            className={nombreeErrorVisible ? 'error' : ''}
                        />
                        {nombreeErrorVisible && (
                            <div className="validacionlogin">
                                <img src="images/Iconos/Icono21.png" className="icono10" />
                                <p className="plogin">{nombreError}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="fechInicio">Fecha de Inicio:</label>
                        <input type="datetime-local" id="fechInicio" value={fechInicio}
                            onChange={(e) => setFechInicio(e.target.value)}
                            onClick={() => {
                                setFechInicioError('');
                                setFechInicioeErrorVisible(false);
                            }}
                            className={fechInicioeErrorVisible ? 'error' : ''}
                        />
                        {fechInicioeErrorVisible && (
                            <div className="validacionlogin">
                                <img src="images/Iconos/Icono21.png" className="icono10" />
                                <p className="plogin">{fechInicioError}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="fechFin">Fecha de Fin:</label>
                        <input type="datetime-local" id="fechFin" value={fechFin}
                            onChange={(e) => setFechFin(e.target.value)}
                            onClick={() => {
                                setFechFinError('');
                                setFechFineErrorVisible(false);
                            }}
                            className={fechFineErrorVisible ? 'error' : ''}
                        />
                        {fechFineErrorVisible && (
                            <div className="validacionlogin">
                                <img src="images/Iconos/Icono21.png" className="icono10" />
                                <p className="plogin">{fechFinError}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="calendario">Calendario:</label>
                        <select id="calendario" value={calendarioId}
                            onChange={(e) => setCalendarioId(e.target.value)} 
                            onClick={() => {
                                setCalendariosError('');
                                setCalendarioseErrorVisible(false);
                            }}
                            className={calendarioseErrorVisible ? 'error' : ''}>
                            <option value="">Seleccionar calendario</option>
                            {calendarios.map(calendario => (
                                <option key={calendario.id} value={calendario.id}>{calendario.nombre}</option>
                            ))}
                        </select>
                        {calendarioseErrorVisible && (
                            <div className="validacionlogin">
                                <img src="images/Iconos/Icono21.png" className="icono10" />
                                <p className="plogin">{calendariosError}</p>
                            </div>
                        )}
                    </div>
                    <div className="button-container-eevento">
                        <button type="submit" className="button-e-1">Guardar Evento</button>
                        <button onClick={() => borrarEvento()}
                            className="button-e-2">Eliminar Evento</button>
                        <Link to="/" className="sidebar-link6">
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