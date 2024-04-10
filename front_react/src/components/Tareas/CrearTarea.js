import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './CrearTarea.css';

function CrearTarea() {

    //Para la fecha de inicio del evento
    const [startDate, setStartDate] = useState(new Date());

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
        <div className="creareventotarea-container">
            <div className="form-container">
                <h1 className="h1">CREAR TAREA</h1>
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
            </div>
        </div>
    );
}


export default CrearTarea;