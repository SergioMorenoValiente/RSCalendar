import React from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import './Calendar.css';

function CalendarApp({ isSidebarOpen }) {
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
                        events={[
                            { title: 'EVENTO 1', date: '2024-04-01' },
                            { title: 'EVENTO 2', date: '2024-04-09' },
                            { title: 'EVENTO 3', date: '2024-04-09' }
                        ]}
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
                            <li>
                                <label>
                                    <input type="checkbox" name="calendario1" />
                                    Personal
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input type="checkbox" name="calendario2" />
                                    Mundial Esports
                                </label>
                            </li>
                        </ul>
                    </div>

                </div>
            )}
        </div>
    );
}

export default CalendarApp;