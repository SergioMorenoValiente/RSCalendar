import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './CrearEvento.css';
import { fetchData } from '../Services/Peticiones';

function CrearEvento() {
    //Constantes
    const [nombre, setNombre] = useState('');
    const [fechInicio, setFechInicio] = useState('');
    const [fechFin, setFechFin] = useState('');
    const [calendarioId, setCalendarioId] = useState(0);
    const [calendarios, setCalendarios] = useState([]);
    const [error, setError] = useState('');
    const [nombreError, setNombreError] = useState('');
    const [fechInicioError, setFechInicioError] = useState('');
    const [fechFinError, setFechFinError] = useState('');
    const [calendariosError, setCalendariosError] = useState('');

    const [nombreErrorVisible, setNombreErrorVisible] = useState(false);
    const [fechInicioErrorVisible, setFechInicioErrorVisible] = useState(false);
    const [fechFinErrorVisible, setFechFinErrorVisible] = useState(false);
    const [calendariosErrorVisible, setCalendariosErrorVisible] = useState(false);

    //Obtener calendarios del usuario
    useEffect(() => {
        async function fetchCalendarios() {
            try {
                const calendariosDelUsuario = await fetchData();
                setCalendarios(calendariosDelUsuario);
            } catch (error) {
                setError('Error al cargar los calendarios del usuario');
            }
        }

        //Obtener fecha de la url
        const fetchCalendariosAndSetDates = async () => {
            await fetchCalendarios();

            const fechaParam = new URLSearchParams(window.location.search).get('fecha');
            if (fechaParam) {
                const fecha = new Date(fechaParam);
                const fechaFormateada = fecha.toISOString().slice(0, 16);
                setFechInicio(fechaFormateada);
                setFechFin(fechaFormateada);
            }
        };

        fetchCalendariosAndSetDates();
    }, []);


    //Crear evento
    const handleSubmit = async (e) => {
        e.preventDefault();

        setNombreError('');
        setFechInicioError('');
        setFechFinError('');
        setCalendariosError('');

        let hasError = false;

        if (!nombre) {
            setNombreError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setNombreErrorVisible(true);
            hasError = true;
        }
        if (!fechInicio) {
            setFechInicioError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setFechInicioErrorVisible(true);
            hasError = true;
        } else if (fechInicio == undefined) {
            setFechInicioError('¡Escribe una fecha válida para desatar el poder en la Grieta!');
            setFechInicioErrorVisible(true);
            hasError = true;
        }
        if (!fechFin) {
            setFechFinError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setFechFinErrorVisible(true);
            hasError = true;
        } else if (fechFin == undefined) {
            setFechFinError('¡Escribe una fecha válida para desatar el poder en la Grieta!');
            setFechFinErrorVisible(true);
            hasError = true;
        } else if (new Date(fechFin) <= new Date(fechInicio)) {
            setFechFinError('La fecha de fin debe brillar más allá de la fecha de inicio.');
            setFechFinErrorVisible(true);
            hasError = true;
        }
        if (!calendarioId) {
            setCalendariosError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setCalendariosErrorVisible(true);
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch('https://localhost:7143/api/Eventoes', {
                method: 'POST',
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
                throw new Error('Error al crear el evento');
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
    function crearCalendarios() {
        window.location.href = `/Ajustes`;
    }

    return (
        <div className="crearevento5-container">
            <div className="form-container10">
                <h1 className="h1cevento">CREAR EVENTO</h1>
                {calendarios.length === 0 ? (
                    <div>
                        <div className="validacionlogin1">
                            <img src="images/Iconos/Icono21.png" className="icono101" />
                            <p className="plogin1">¡Prepara el terreno antes de desatar el caos! Antes de crear un evento, asegúrate de tener un calendario listo para recibir tus épicas hazañas.</p>
                        </div>
                        <div className="form-container12">
                            <button onClick={() => crearCalendarios()}
                                className="button-calendario1">Crear Calendario</button>
                        </div>
                    </div>
                    
                ) : (
                    <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            onClick={() => {
                                setNombreError('');
                                setNombreErrorVisible(false);
                            }}
                            className={nombreErrorVisible ? 'error' : ''}
                        />
                        {nombreErrorVisible && (
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
                                setFechInicioErrorVisible(false);
                            }}
                            className={fechInicioErrorVisible ? 'error' : ''}
                        />
                        {fechInicioErrorVisible && (
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
                                setFechFinErrorVisible(false);
                            }}
                            className={fechFinErrorVisible ? 'error' : ''}
                        />
                        {fechFinErrorVisible && (
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
                                setCalendariosErrorVisible(false);
                            }}
                            className={calendariosErrorVisible ? 'error' : ''}>
                            <option value="">Seleccionar calendario</option>
                            {calendarios.map(calendario => (
                                <option key={calendario.id} value={calendario.id}>{calendario.nombre}</option>
                            ))}
                        </select>
                        {calendariosErrorVisible && (
                            <div className="validacionlogin">
                                <img src="images/Iconos/Icono21.png" className="icono10" />
                                <p className="plogin">{calendariosError}</p>
                            </div>
                        )}
                    </div>
                    <div className="button-container-cevento">
                        <button type="submit">Añadir Evento</button>
                        <Link to="/" className="sidebar-link5">
                            <span className="volvercevento">Volver</span>
                        </Link>
                    </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CrearEvento;