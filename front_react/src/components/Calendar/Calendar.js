import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../Services/Peticiones';
import { getStoredUserId } from '../Utils';

function CalendarApp({ isSidebarOpen }) {

    //Constantes
    const [calendariosUsuario, setCalendariosUsuario] = useState([]); 
    const [calendariosGenerales, setCalendariosGenerales] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [calendariosSeleccionados, setCalendariosSeleccionados] = useState({});
    const [calendariosGeneralesSeleccionados, setCalendariosGeneralesSeleccionados] = useState({});
    const [tareas, setTareas] = useState([]);

    //Obtener Calendarios del usuario
    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const calendariosDelUsuario = await fetchData();
                setCalendariosUsuario(calendariosDelUsuario);
                checkCalendarios(calendariosDelUsuario, setCalendariosSeleccionados, false);
            } catch (error) {
            }
        };

        fetchDataAndSetState();
    }, []);

    //Obtener calendarios generales
    useEffect(() => {
        fetch('https://localhost:7143/api/calendariogenerals')
            .then(response => response.json())
            .then(data => setCalendariosGenerales(data))
            .catch(error => console.error('Error fetching calendars:', error));
    }, []);

    //Obetener eventos y eventosgenerales
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

    //Obtener eventos
    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const response = await fetch('https://localhost:7143/api/Tareas');
                if (!response.ok) {
                    throw new Error('Error al obtener las tareas');
                }
                const data = await response.json();
                const dataFiltradaUsuario = data.filter(tarea => tarea.usuarioId == getStoredUserId());
                const dataFiltradaCompletado = dataFiltradaUsuario.filter(tarea => tarea.completado === "0");

                setTareas(dataFiltradaCompletado);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTareas();
    }, []);

    //Obtener calendarios checkeados
    const checkCalendarios = (calendarios, setCalendarioSeleccionado, isGeneral) => {
        const calendariosSeleccionados = {};
        calendarios.forEach(calendario => {
            calendariosSeleccionados[calendario.id] = calendario.visible === 1;
        });
        setCalendarioSeleccionado(calendariosSeleccionados);
    };

    //Cambiar estado de visibilidad al checkear calendario
    const handleCalendarioSeleccionado = async (calendarioId, isChecked, isGeneral) => {
        try {
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

            // Obtener los datos actuales del calendario
            const response = await fetch(`https://localhost:7143/api/calendarios/${calendarioId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los datos del calendario');
            }

            const calendarioData = await response.json();
            const { nombre, descripcion } = calendarioData;

            // Hacer la solicitud HTTP para actualizar la base de datos
            const updateResponse = await fetch(`https://localhost:7143/api/calendarios/${calendarioId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: calendarioId,
                    nombre: nombre,
                    descripcion: descripcion,
                    visible: isChecked ? 1 : 0
                }),
            });

            if (!updateResponse.ok) {
                throw new Error('Error al actualizar la base de datos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };







    // Filtrar eventos según los calendarios seleccionados
    const eventosMostrar = eventos.filter(evento => {
        const esCalendarioSeleccionado = calendariosSeleccionados[evento.calendarioId];
        const esCalendarioGeneralSeleccionado = Object.values(calendariosGeneralesSeleccionados).some(seleccionado => seleccionado && seleccionado.id === evento.calendarioId);
        return esCalendarioSeleccionado || esCalendarioGeneralSeleccionado;
    }).map(evento => ({
        id: evento.id,
        title: evento.nombre,
        start: evento.fechInicio,
        end: evento.fechFin
    }));

    //Redireccion a crear evento
    const handleDateClick = (arg) => {
        window.location.href = `/CrearEvento?fecha=${arg.dateStr}`;
    };

    //Redireccion a editar evento
    const handleEventClick = (arg) => {
        window.location.href = `/EditarEvento?id=${arg.event.id}`;
    };

    //Formato para mostrar eventos
    const renderEventContent = (eventInfo) => {
        if (!eventInfo.event.start || !eventInfo.event.end) {
            return null;
        }
        const startTime = eventInfo.event.start.getHours() + ':' + eventInfo.event.start.getMinutes();
        const endTime = eventInfo.event.end.getHours() + ':' + eventInfo.event.end.getMinutes();

        const moreEventsCount = eventosMostrar.filter(evento => evento.start === eventInfo.event.start).length - 1;

        return (
            <div className="custom-event">
                <img src="/images/Roles/Mago.png" alt="Icono" className="icono-evento" />
                <div className="customheader">
                    <b className="pevento">{startTime} - {endTime} </b>
                </div>
                <div className="customtitle">
                    <b className="pevento2">{eventInfo.event.title}</b>
                </div>
                {moreEventsCount > 0 && (
                    <div className="ver-mas-link">
                        <Link to="/VerMasEventos" className="ver-mas">
                            Ver más ({moreEventsCount})
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    //Marcar tarea como completada
    const handleTareaCompletada = async (id, tarea) => {
        console.log(id, tarea);
        try {
            const updatedTarea = { id: id, nombre: tarea.nombre, fechInicio: tarea.fechInicio, completado: '1', usuarioId: tarea.usuarioId }
            const response = await fetch(`https://localhost:7143/api/Tareas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTarea)
            });
            if (!response.ok) {
                throw new Error('Error al marcar la tarea como completada');
            }
            const updatedTareas = tareas.map(t => {
                if (t.id === id) {
                    return updatedTarea;
                }
                return t;
            });
            setTareas(updatedTareas);
            const fetchTareas = async () => {
                try {
                    const response = await fetch('https://localhost:7143/api/Tareas');
                    if (!response.ok) {
                        throw new Error('Error al obtener las tareas');
                    }
                    const data = await response.json();
                    const dataFiltradaUsuario = data.filter(tarea => tarea.usuarioId == getStoredUserId());
                    const dataFiltradaCompletado = dataFiltradaUsuario.filter(tarea => tarea.completado === "0");

                    setTareas(dataFiltradaCompletado);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchTareas();

        } catch (error) {
            console.error(error);
        }
    };


    //Constantes paginacion
    const [currentPagePersonal, setCurrentPagePersonal] = useState(1);
    const itemsPerPage = 3;
    const totalCalendariosPersonal = calendariosUsuario.length;
    const showPaginationPersonal = totalCalendariosPersonal > itemsPerPage;

    // Estado para la paginación de los calendarios generales
    const [currentPageGenerales, setCurrentPageGenerales] = useState(1);
    const totalCalendariosGenerales = calendariosGenerales.length;
    const showPaginationGenerales = totalCalendariosGenerales > itemsPerPage;

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
                        dayMaxEventRows={true}
                        views={{
                            timeGrid: {
                                dayMaxEventRows: 3
                            }
                        }}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        eventContent={renderEventContent}
                    />
                </div>
            </div>

            {/* Mostrar contenedor lateral solo si isSidebarOpen es verdadero */}
            {isSidebarOpen && (
                <div className="container3">

                    <div className="button-container1">
                        <Link to="/CrearEvento" className="sidebar-link">
                            <img src="images/Iconos/Icono7.png" className="icono1" />
                            <span className="spanbutton1">Crear Evento</span>
                        </Link>
                    </div>

                    <div className="calendars-container">
                        <h2 className="calendars-title">MIS CALENDARIOS</h2>
                        <div className="pagination-container-left">
                            {showPaginationPersonal && (
                                <div className="pagination-button" onClick={() => setCurrentPagePersonal(currentPagePersonal - 1)} style={{ cursor: currentPagePersonal === 1 ? 'not-allowed' : 'pointer' }}>
                                    {currentPagePersonal !== 1 && (
                                        <img src="images/Iconos/Icono22Izq.png" alt="Anterior" className="icono1" />
                                    )}
                                </div>
                            )}
                        </div>
                        {calendariosUsuario.length === 0 ? (
                            <div className="button-container2">
                                <Link to="/Ajustes" className="sidebar-link2">
                                    <span className="spanbutton1">Crear Calendario</span>
                                </Link>
                            </div>
                        ) : (
                                <>
                        <ul className="calendars-list">
                            {calendariosUsuario.slice((currentPagePersonal - 1) * itemsPerPage, currentPagePersonal * itemsPerPage).map(calendario => (
                                <li key={calendario.id}>
                                    <input
                                        type="checkbox"
                                        name={`calendario${calendario.id}`}
                                        checked={calendariosSeleccionados[calendario.id]}
                                        onChange={e => handleCalendarioSeleccionado(calendario.id, e.target.checked, false)}
                                    />
                                    <label className="label-sidebar">{calendario.nombre}</label>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination-container-right">
                            {showPaginationPersonal && (
                                <div className="pagination-button" onClick={() => setCurrentPagePersonal(currentPagePersonal + 1)} style={{ cursor: currentPagePersonal * itemsPerPage >= totalCalendariosPersonal ? 'not-allowed' : 'pointer' }}>
                                    {currentPagePersonal * itemsPerPage < totalCalendariosPersonal && (
                                        <img src="images/Iconos/Icono22Drc.png" alt="Siguiente" className="icono1" />
                                    )}
                                </div>
                            )}
                                    </div>
                            </>
                        )}
                    </div>

                    <div className="calendars-container">
                        <h2 className="calendars-title">CALENDARIOS GENERALES</h2>
                        <div className="pagination-container-left">
                            {showPaginationGenerales && (
                                <div className="pagination-button" onClick={() => setCurrentPageGenerales(currentPageGenerales - 1)} style={{ cursor: currentPageGenerales === 1 ? 'not-allowed' : 'pointer' }}>
                                    {currentPageGenerales !== 1 && (
                                    <img src="images/Iconos/Icono22Izq.png" alt="Anterior" className="icono1" />
                                    )}
                                    </div>
                            )}
                        </div>
                        <ul className="calendars-list">
                            {calendariosGenerales.slice((currentPageGenerales - 1) * itemsPerPage, currentPageGenerales * itemsPerPage).map(calendario => (
                                <li key={calendario.id}>
                                    <input
                                        type="checkbox"
                                        name={`calendarioGeneral${calendario.id}`}
                                        checked={calendariosGeneralesSeleccionados[calendario.id]}
                                        onChange={e => handleCalendarioSeleccionado(calendario.id, e.target.checked, true)}
                                    />
                                    <label className="label-sidebar">{calendario.nombre}</label>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination-container-right">
                            {showPaginationGenerales && (
                                <div className="pagination-button" onClick={() => setCurrentPageGenerales(currentPageGenerales + 1)} style={{ cursor: currentPageGenerales * itemsPerPage >= totalCalendariosGenerales ? 'not-allowed' : 'pointer' }}>
                                    {currentPageGenerales * itemsPerPage < totalCalendariosGenerales && (
                                    <img src="images/Iconos/Icono22Drc.png" alt="Siguiente" className="icono1" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="calendars-container">
                        <h2 className="calendars-title">MIS TAREAS</h2>
                        <ul className="calendars-list">
                            {tareas.slice((currentPageGenerales - 1) * itemsPerPage, currentPageGenerales * itemsPerPage).map(tarea => (
                                <li key={tarea.id}>
                                    <input type="checkbox" onChange={() => handleTareaCompletada(tarea.id, tarea)} />
                                    <label className="label-sidebar"> {tarea.nombre.length > 12 ? tarea.nombre.substring(0, 9) + '...' : tarea.nombre}</label>
                                </li>
                            ))}
                            {tareas.length > 3 && (
                                <li>
                                    <div className="ver-mas-link">
                                        <Link to="/Tareas" className="ver-mas">
                                            Ver más
                                        </Link>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>
            )}
        </div>
    );
}

export default CalendarApp;