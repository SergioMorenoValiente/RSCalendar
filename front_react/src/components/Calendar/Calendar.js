import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import './Calendar.css';
import React, { useState, useEffect } from 'react';


function CalendarApp({ isSidebarOpen }) {

    const [calendarios, setCalendarios] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [calendariosSeleccionados, setCalendariosSeleccionados] = useState({});

    {/*Para obtener lista calendarios */ }
    useEffect(() => {
        fetch('https://localhost:7143/api/calendarios')
            .then(response => response.json())
            .then(data => setCalendarios(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    {/*Para obtener lista de eventos */ }
    useEffect(() => {
        fetch('https://localhost:7143/api/eventoes')
            .then(response => response.json())
            .then(data => setEventos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCalendarioSeleccionado = (calendarioId, isChecked) => {
        setCalendariosSeleccionados(prevState => ({
            ...prevState,
            [calendarioId]: isChecked
        }));
    };

    {/* Para encadenar lista de eventos */ }
    const eventosMostrar = eventos.filter(evento => {
        return calendariosSeleccionados[evento.calendarioId];
    }).map(evento => ({
        title: evento.nombre,
        start: evento.fechInicio,
        end: evento.fechFin,
        color: evento.color
    }));


    return (
        <div className="container">
            <div className="container2">
                <div className="calendar-container">

                    {/* Enlaces para los estilos del calendario */}
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/5.10.0/main.min.css" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/5.10.0/daygrid.min.css" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/5.10.0/timegrid.min.css" rel="stylesheet" />

                    {/* Componente FullCalendar */}
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        locale={esLocale}
                        initialView="dayGridMonth"
                        events={eventosMostrar}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                    />
                </div>
            </div>

            {/* Mostrar contenedor lateral solo si isSidebarOpen es verdadero */}
            {isSidebarOpen && (
                <div className="container3">

                    {/* Botón para crear evento/tarea */}
                    <div className="button-container">
                        <Link to="/CrearEventoTarea" className="sidebar-link">
                            <img src="images/Iconos/Icono7.png" className="icono1" />
                            <span>CREAR EVENTO/TAREA</span>
                        </Link>
                    </div>

                    {/* Contenedor de calendarios */}
                    <div className="calendars-container">
                        <h2 className="calendars-title">MIS CALENDARIOS</h2>
                        <ul className="calendars-list">
                            {calendarios.map(calendario => (
                                <li key={calendario.id}>
                                    <input type="checkbox" name="calendario'{calendario.id}'"
                                           checked={calendariosSeleccionados[calendario.id]}
                                           onChange={e => handleCalendarioSeleccionado(calendario.id, e.target.checked)}/>
                                    {calendario.nombre}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            )}
        </div>
    );
}

export default CalendarApp;