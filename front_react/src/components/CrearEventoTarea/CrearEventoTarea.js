import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './CrearEventoTarea.css';

function CrearEventoTarea() {

    //Para gestionar la pestaña activa (Evento o Tarea)
    const [tab, setTab] = useState("Evento");

    //Para la fecha de inicio del evento
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="creareventotarea-container">
            <div className="form-container">
                {tab === "Evento" && (
                    <React.Fragment>

                        {/* Botones de pestañas evento */}
                        <div className="tab-buttons">
                            <h2 className={tab === "Evento" ? "active" : ""}
                                onClick={() => setTab("Evento")}>EVENTO</h2>
                            <h2 className={tab === "Tarea" ? "active" : ""}
                                onClick={() => setTab("Tarea")}>TAREA</h2>
                        </div>

                        {/* Formulario para crear un evento */}
                        <EventoForm startDate={startDate} setStartDate={setStartDate} />

                    </React.Fragment>
                )}
                {tab === "Tarea" && (
                    <React.Fragment>

                        {/* Botones de pestañas tarea */}
                        <div className="tab-buttons">
                            <h2 className={tab === "Evento" ? "active" : ""}
                                onClick={() => setTab("Evento")}>EVENTO</h2>
                            <h2 className={tab === "Tarea" ? "active" : ""}
                                onClick={() => setTab("Tarea")}>TAREA</h2>
                        </div>

                        {/* Formulario para crear una tarea */}
                        <TareaForm />

                    </React.Fragment>
                )}
            </div>
        </div>
    );
}


//EVENTO
function EventoForm({ setTab, startDate, setStartDate }) {
    //Para los campos del formulario
    const [titulo, setTitulo] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [todoElDia, setTodoElDia] = useState(false);
    const [calendario, setCalendario] = useState('');
    const [descripcion, setDescripcion] = useState('');

    //Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titulo">Título del Evento:</label>
                <input type="text" id="titulo" value={titulo}
                    onChange={(e) => setTitulo(e.target.value)} />
            </div>
            
            <div>
                <label htmlFor="fechaInicio">Fecha de Inicio:</label>
                <div className="fecha-container">
                    <input type="date" id="fechaInicio" value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)} />
                    <input type="time" id="horaInicio" value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)} />
                </div>
            </div>
            <div >
                <label htmlFor="fechaFin">Fecha de Fin:</label>
                <div className="fecha-container">
                    <input type="date" id="fechaFin" value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)} />
                    <input type="time" id="horaFin" value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)} />
                </div>
            </div>
            <div className="checkbox-container">
                <input type="checkbox" id="todoElDia" checked={todoElDia}
                    onChange={(e) => setTodoElDia(e.target.checked)} />
                <label htmlFor="todoElDia">Todo el día</label>
            </div>
            <div>
                <label htmlFor="calendario">Calendario:</label>
                <select id="calendario" value={calendario}
                    onChange={(e) => setCalendario(e.target.value)}>
                    <option value="0">Seleccionar calendario</option>
                    <option value="1">Seleccionar calendario1</option>
                    <option value="2">Seleccionar calendario2</option>
                    <option value="3">Seleccionar calendario3</option>
                </select>
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div className="button-container">
                <button type="submit">Añadir Evento</button>
                <Link to="/" className="sidebar-link">
                    <span>Volver</span>
                </Link>
            </div>
        </form>
    );
}

//TAREA
function TareaForm({ setTab, startDate, setStartDate }) {
    //Para los campos del formulario
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [todoElDia, setTodoElDia] = useState(false);
    const [calendario, setCalendario] = useState('');
    const [descripcion, setDescripcion] = useState('');

    //Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titulo">Título de la Tarea:</label>
                <input type="text" id="titulo" value={titulo}
                    onChange={(e) => setTitulo(e.target.value)} />
            </div>

            <div>
                <label htmlFor="fechaInicio">Fecha:</label>
                <div className="fecha-container">
                    <input type="date" id="fecha" value={fecha}
                        onChange={(e) => setFecha(e.target.value)} />
                    <input type="time" id="hora" value={hora}
                        onChange={(e) => setHora(e.target.value)} />
                </div>
            </div>
            <div className="checkbox-container">
                <input type="checkbox" id="todoElDia" checked={todoElDia}
                    onChange={(e) => setTodoElDia(e.target.checked)} />
                <label htmlFor="todoElDia">Todo el día</label>
            </div>
            <div>
                <label htmlFor="calendario">Calendario:</label>
                <select id="calendario" value={calendario}
                    onChange={(e) => setCalendario(e.target.value)}>
                    <option value="0">Seleccionar calendario</option>
                    <option value="1">Seleccionar calendario1</option>
                    <option value="2">Seleccionar calendario2</option>
                    <option value="3">Seleccionar calendario3</option>
                </select>
            </div>
            <div>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea id="descripcion" value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div className="button-container">
                <button type="submit">Añadir Tarea</button>
                <Link to="/" className="sidebar-link">
                    <span>Volver</span>
                </Link>
            </div>
        </form>
    );
}


export default CrearEventoTarea;