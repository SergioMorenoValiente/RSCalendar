import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; 
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './CrearEventoTarea.css';
import { fetchData } from '../Services/Peticiones';

function CrearEventoTarea() {

    //Constantes
    const [tab, setTab] = useState("Evento");
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
function EventoForm() {

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
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setNombreError('');
        setFechInicioError('');
        setFechFinError('');
        setCalendariosError('');

        let hasError = false;

        if (!nombre) {
            setNombreError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            hasError = true;
        }
        if (!fechInicio) {
            setFechInicioError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            hasError = true;
        } else if (fechInicio == undefined) {
            setFechInicioError('¡Melon pon bien la fecha!');
            hasError = true;
        }
        if (!fechFin) {
            setFechFinError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            hasError = true;
        } else if (fechFin == undefined) {
            setFechFinError('¡Melon pon bien la fecha!');
            hasError = true;
        } else if (new Date(fechFin) <= new Date(fechInicio)) {
        setFechFinError('La fecha de fin debe ser posterior a la fecha de inicio.');
        hasError = true;
    }
        if (!calendarioId) {
            setCalendariosError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
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

    return (

        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <p>{nombreError }</p>
            <div>
                <label htmlFor="fechInicio">Fecha de Inicio:</label>
                <input type="datetime-local" id="fechInicio" value={fechInicio} onChange={(e) => setFechInicio(e.target.value)} />
            </div>
            <p>{fechInicioError}</p>
            <div>
                <label htmlFor="fechFin">Fecha de Fin:</label>
                <input type="datetime-local" id="fechFin" value={fechFin} onChange={(e) => setFechFin(e.target.value)} />
            </div>
            <p>{fechFinError}</p>
            <div>
                <label htmlFor="calendario">Calendario:</label>
                <select id="calendario" value={calendarioId} onChange={(e) => setCalendarioId(e.target.value)}>
                    <option value="">Seleccionar calendario</option>
                    {calendarios.map(calendario => (
                        <option key={calendario.id} value={calendario.id}>{calendario.nombre}</option>
                    ))}
                </select>
            </div>
            <p>{calendariosError}</p>
            <div>
                <button type="submit">Añadir Evento</button>
                <Link to="/" className="sidebar-link">
                    <span>Volver</span>
                </Link>
            </div>
        </form>
        // <form onSubmit={handleSubmit}>
        //    {error && <p>{error}</p>}
        //    <div>
        //        <label htmlFor="titulo">Título del Evento:</label>
        //        <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        //    </div>
            
        //    <div>
        //        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        //        <div className="fecha-container">
        //            <input type="date" id="fechaInicio" value={fechaInicio}
        //                onChange={(e) => setFechaInicio(e.target.value)} />
        //            <input type="time" id="horaInicio" value={horaInicio}
        //                onChange={(e) => setHoraInicio(e.target.value)} />
        //        </div>
        //    </div>
        //    <div >
        //        <label htmlFor="fechaFin">Fecha de Fin:</label>
        //        <div className="fecha-container">
        //            <input type="date" id="fechaFin" value={fechaFin}
        //                onChange={(e) => setFechaFin(e.target.value)} />
        //            <input type="time" id="horaFin" value={horaFin}
        //                onChange={(e) => setHoraFin(e.target.value)} />
        //        </div>
        //    </div>
        //    <div className="checkbox-container">
        //        <input type="checkbox" id="todoElDia" checked={todoElDia}
        //            onChange={(e) => setTodoElDia(e.target.checked)} />
        //        <label htmlFor="todoElDia">Todo el día</label>
        //    </div>
        //    <div>
        //        <label htmlFor="calendario">Calendario:</label>
        //        <select id="calendario" value={calendario}
        //            onChange={(e) => setCalendario(e.target.value)}>
        //            <option value="0">Seleccionar calendario</option>
        //            <option value="1">Seleccionar calendario1</option>
        //            <option value="2">Seleccionar calendario2</option>
        //            <option value="3">Seleccionar calendario3</option>
        //        </select>
        //    </div>
        //    <div>
        //        <label htmlFor="descripcion">Descripción:</label>
        //        <textarea id="descripcion" value={descripcion}
        //            onChange={(e) => setDescripcion(e.target.value)} />
        //    </div>
        //    <div>
        //        <button type="submit">Añadir Evento</button>
        //        <Link to="/" className="sidebar-link">
        //            <span>Volver</span>
        //        </Link>
        //    </div>
        //</form>
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
        window.location.href = "/";
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