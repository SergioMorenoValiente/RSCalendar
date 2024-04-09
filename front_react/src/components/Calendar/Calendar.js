import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import { getStoredUserId } from '../Utils';

function CalendarApp({ isSidebarOpen }) {
    const [calendariosUsuario, setCalendariosUsuario] = useState([]); 
    const [calendariosGenerales, setCalendariosGenerales] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [calendariosSeleccionados, setCalendariosSeleccionados] = useState({});
    const [calendariosGeneralesSeleccionados, setCalendariosGeneralesSeleccionados] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7143/api/usuariocalendarios', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    const allusuariocalendarios = await response.json();
                    const usuarioCalendarios = allusuariocalendarios.filter(calendar => calendar.usuarioId.toString() === getStoredUserId().toString());
                    const calendarioIds = usuarioCalendarios.map(calendar => calendar.calendarioId);
                    const responseCalendarios = await fetch('https://localhost:7143/api/calendarios');
                    const data = await responseCalendarios.json();
                    const calendariosDelUsuario = data.filter(calendario => calendarioIds.includes(calendario.id));
                    setCalendariosUsuario(calendariosDelUsuario);
                }
            } catch (error) {
                console.error('Error fetching calendars:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        fetch('https://localhost:7143/api/calendariogenerals')
            .then(response => response.json())
            .then(data => setCalendariosGenerales(data))
            .catch(error => console.error('Error fetching calendars:', error));
    }, []);

    useEffect(() => {
        Promise.all([
            fetch('https://localhost:7143/api/eventogenerals').then(response => response.json()),
            fetch('https://localhost:7143/api/eventoes').then(response => response.json())
        ])
            .then(([eventosGenerales, eventosEspecificos]) => {
                const eventosTotales = [...eventosGenerales, ...eventosEspecificos];
                setEventos(eventosTotales);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const handleCalendarioSeleccionado = (calendarioId, isChecked, isGeneral) => {
        if (isGeneral) {
            setCalendariosGeneralesSeleccionados(prevState => ({
                ...prevState,
                [calendarioId]: isChecked
            }));
        } else {
            setCalendariosSeleccionados(prevState => ({
                ...prevState,
                [calendarioId]: isChecked
            }));
        }
    };

    // Filtrar eventos según los calendarios seleccionados
    const eventosMostrar = eventos.filter(evento => {
        const esCalendarioSeleccionado = calendariosSeleccionados[evento.calendarioId];
        const esCalendarioGeneralSeleccionado = Object.values(calendariosGeneralesSeleccionados).some(seleccionado => seleccionado && seleccionado.id === evento.calendarioId);
        return esCalendarioSeleccionado || esCalendarioGeneralSeleccionado;
    }).map(evento => ({
        title: evento.nombre,
        start: evento.fechInicio,
        end: evento.fechFin,
        color: evento.color
    }));

    //Prueba rukaya
    const handleDateClick = (arg) => {
        // Redireccionar a la página CrearEventoTarea.js pasando la fecha como parámetro
        window.location.href = `/CrearEventoTarea?fecha=${arg.dateStr}`;
    };

    const handleEventClick = (arg) => {
        // Redireccionar a la página EditarEvento.js pasando el ID del evento como parámetro
        window.location.href = `/EditarEvento?id=${arg.event.id}`;
    };

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
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        locale={esLocale}
                        initialView="dayGridMonth"
                        events={eventosMostrar}
                        headerToolbar={{
                            start: '',
                            center: 'title',
                            end: 'prev,next'
                        }}
                        //Pruebas rukaya

                        dayMaxEventRows={true}
                        views={{
                            timeGrid: {
                                dayMaxEventRows: 3
                            }
                        }}
                        //moreLinkClick="day"
                        dateClick={handleDateClick}
                        //eventContent={renderEventContent }
                        eventClick={handleEventClick}
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

                    {/* Botón provisional para editar Evento */}
                    <div className="button-container">
                        <Link to="/EditarEvento" className="sidebar-link">
                            <span>EDITAR EVENTO</span>
                        </Link>
                    </div>

                    {/* Botón provisional para editar Tarea */}
                    <div className="button-container">
                        <Link to="/EditarTarea" className="sidebar-link">
                            <span>EDITAR TAREA</span>
                        </Link>
                    </div>

                    // Contenedor de calendarios
                    <div className="calendars-container">
                        <h2 className="calendars-title">MIS CALENDARIOS</h2>
                        <ul className="calendars-list">
                            {/* Calendarios del usuario */}
                            {calendariosUsuario.map(calendario => (
                                <li key={calendario.id}>
                                    <input
                                        type="checkbox"
                                        name={`calendario${calendario.id}`}
                                        checked={calendariosSeleccionados[calendario.id]}
                                        onChange={e => handleCalendarioSeleccionado(calendario.id, e.target.checked, false)}
                                    />
                                    <label>{calendario.nombre}</label>
                                </li>
                            ))}

                            {/* Calendarios generales */}
                            {calendariosGenerales.map(calendario => (
                                <li key={calendario.id}>
                                    <input
                                        type="checkbox"
                                        name={`calendarioGeneral${calendario.id}`}
                                        checked={calendariosGeneralesSeleccionados[calendario.id]}
                                        onChange={e => handleCalendarioSeleccionado(calendario.id, e.target.checked, true)}
                                    />
                                    <label>{calendario.nombre}</label>
                                </li>
                            ))}
                        </ul>
                    </div>



                </div>
            )}
        </div>
    );
}

//Pruebas rukaya
//function renderEventContent(eventInfo) {
//    return (
//        <>
//            <b>{eventInfo.timeText}</b>
//            <i>{eventInfo.event.title}</i>
//        </>
//    )
//}

//function CustomView(props) {
//    let segs = sliceEvents(props, true); // allDay=true

//    return (
//        <>
//            <div className='view-title'>
//                {props.dateProfile.currentRange.start.toUTCString()}
//            </div>
//            <div className='view-events'>
//                {segs.length} events
//            </div>
//        </>
//    );
//}

export default CalendarApp;