import React, { useState, useEffect } from 'react';
import './Tareas.css';
import { Link } from 'react-router-dom';
import { getStoredUserId } from '../Utils';

function Tareas() {

    const [tab, setTab] = useState("TareasPendientes");
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const response = await fetch('https://localhost:7143/api/Tareas');
                if (!response.ok) {
                    throw new Error('Error al obtener las tareas');
                }
                const data = await response.json();
                const dataFiltrada = data.filter(tarea => tarea.usuarioId == getStoredUserId());

                setTareas(dataFiltrada);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTareas();
    }, []);

    return (
        <div className="tareas-container">
            <div className="tareas-container2">
                {/*<h1 className="h1tareas">TAREAS</h1>*/}

                <div className="form-container">
                    {tab === "TareasPendientes" && (
                        <React.Fragment>

                            {/* Botones de pestañas evento */}
                            <div className="tab-buttons">
                                <h2 className={tab === "TareasPendientes" ? "active" : ""}
                                    onClick={() => setTab("TareasPendientes")}>PENDIENTES</h2>
                                <h2 className={tab === "TareasCompletadas" ? "active" : ""}
                                    onClick={() => setTab("TareasCompletadas")}>COMPLETADAS</h2>
                            </div>

                            <TareasPendientes tareas={tareas} setTareas={setTareas} />



                        </React.Fragment>
                    )}
                        {tab === "TareasCompletadas" && (
                        <React.Fragment>

                            <div className="tab-buttons">
                                <h2 className={tab === "TareasPendientes" ? "active" : ""}
                                    onClick={() => setTab("TareasPendientes")}>PENDIENTES</h2>
                                <h2 className={tab === "TareasCompletadas" ? "active" : ""}
                                    onClick={() => setTab("TareasCompletadas")}>COMPLETADAS</h2>
                            </div>

                            <TareasCompletadas tareas={tareas} setTareas={setTareas} />


                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

function TareasPendientes({ tareas, setTareas }) {

    const [edicionHabilitada, setEdicionHabilitada] = useState(false);
    const [error, setError] = useState('');

    const toggleEdicion = () => {
        setEdicionHabilitada(!edicionHabilitada);
    };
    const tareasPendientes = tareas.filter(tarea => tarea.completado === "0");

    const handleTareaCompletada = async (id, tarea) => {
        try {
            const updatedTarea = { id:id, nombre:tarea.nombre,fechInicio:tarea.fechInicio, completado: '1', usuarioId: tarea.usuarioId }
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
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditar = (tarea) => {
        // Redireccionar a la página EditarEvento.js pasando el ID del evento como parámetro
        window.location.href = `/EditarTarea?id=${tarea.id}`;
    };

    //Borar tarea
    const borrarTarea = async (tareaId) => {
        try {
            const response = await fetch(`https://localhost:7143/api/tareas/${tareaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al borrar el evento');
            }
            window.location.href = "/Tareas";
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className="div-container-tareas">
            <table>
                <tbody>
                    {tareasPendientes.map((tarea) => (
                        <tr key={tarea.id}>
                            <td className="tdajustes">
                                <ul className="calendars-list">
                                    <li>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleTareaCompletada(tarea.id, tarea)}
                                            checked={tarea.completado === '1'} 
                                        />
                                        <label>{tarea.nombre}</label>
                                    </li>
                                </ul>
                            </td>
                        {edicionHabilitada && (
                            <>
                                <td>
                                        <button className="button1ajustes" onClick={() => handleEditar(tarea)}>
                                            Editar
                                        </button>

                                </td>
                                <td>
                                        <button className="button2ajustes" onClick={() => borrarTarea(tarea.id)}>
                                        Borrar
                                    </button>
                                </td>
                            </>
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <Link to="/CrearEventoTarea" className="sidebar-link">
                    <img src="images/Iconos/Icono7.png" className="icono1" />
                    <span className="spanbutton">Crear Evento/Tarea</span>
                </Link>
                <button className="buttonajustes" onClick={toggleEdicion}>
                    <img src="images/Iconos/Icono7.png" className="iconoajustes" />
                    {edicionHabilitada ? "Deshabilitar edición" : "Habilitar edición"}
                </button>
            </div>
        </div>
    );
}

function TareasCompletadas({ tareas, setTareas }) {

    const [edicionHabilitada, setEdicionHabilitada] = useState(false);
    const [error, setError] = useState('');

    const toggleEdicion = () => {
        setEdicionHabilitada(!edicionHabilitada);
    };
    const tareasCompletadas = tareas.filter(tarea => tarea.completado === "1");

    const handleTareaSinCompletar = async (id, tarea) => {
        try {
            const updatedTarea = { id: id, nombre: tarea.nombre, fechInicio: tarea.fechInicio, completado: '0', usuarioId: tarea.usuarioId }
            const response = await fetch(`https://localhost:7143/api/Tareas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTarea) // Pasamos la tarea actualizada al servidor
            });
            if (!response.ok) {
                throw new Error('Error al marcar la tarea como completada');
            }
            const updatedTareas = tareas.map(t => {
                if (t.id === id) {
                    return updatedTarea; // Si es la tarea actualizada, la retornamos
                }
                return t;
            });
            setTareas(updatedTareas);
        } catch (error) {
            console.error(error);
        }
    };
    const handleEditar = (tarea) => {
        // Redireccionar a la página EditarEvento.js pasando el ID del evento como parámetro
        window.location.href = `/EditarTarea?id=${tarea.id}`;
    };

    //Borar tarea
    const borrarTarea = async (tareaId) => {
        try {
            const response = await fetch(`https://localhost:7143/api/tareas/${tareaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al borrar el evento');
            }
            window.location.href = "/Tareas";
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="div-container-tareas">
            <table>
                <tbody>
                    {tareasCompletadas.map((tarea, index) => (
                    <tr>
                        <td className="tdajustes">
                            <ul className="calendars-list">
                                    <li key={index}>
                                        <input type="checkbox" checked onChange={() => handleTareaSinCompletar(tarea.id, tarea)} />
                                        <label>{tarea.nombre}</label>
                                    </li>
                            </ul>
                        </td>
                        {edicionHabilitada && (
                            <> {/* Fragment para envolver las columnas que deben aparecer solo cuando la edición está habilitada */}
                                <td>
                                        <button className="button1ajustes" onClick={() => handleEditar(tarea)}>
                                            Editar
                                        </button>

                                </td>
                                <td>
                                        <button className="button2ajustes" onClick={() => borrarTarea(tarea.id)}>
                                        Borrar
                                    </button>
                                </td>
                            </>
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <Link to="/CrearEventoTarea" className="sidebar-link">
                    <img src="images/Iconos/Icono7.png" className="icono1" />
                    <span className="spanbutton">Crear Evento/Tarea</span>
                </Link>
                <button className="buttonajustes" onClick={toggleEdicion}>
                    <img src="images/Iconos/Icono7.png" className="iconoajustes" />
                    {edicionHabilitada ? "Deshabilitar edición" : "Habilitar edición"}
                </button>
            </div>
        </div>
    );
}


export default Tareas;

function TareaForm({ setTab, startDate, setStartDate }) {
    //Para los campos del formulario
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [tareasDelUsuario, setTareasDelUsuario] = useState('');
    const [tituloError, setTituloError] = useState('');
    const [fechaError, setFechaError] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUserId = getStoredUserId();
        setUserId(storedUserId ? storedUserId.toString() : ''); // Ensure userId is a string
        async function fetchTareas() {
            try {
                const response = await fetch(`https://localhost:7143/api/calendarios/${storedUserId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                setTareasDelUsuario(data);
            } catch (error) {
                throw error;
            }
        }
        if (storedUserId) {
            fetchTareas();
        }
    }, []);

    //Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        setTituloError('');

        let hasError = false;

        if (!titulo) {
            setTituloError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const fechaActual = new Date();
            const fechaFormateada = fechaActual.toISOString();

            const response = await fetch('https://localhost:7143/api/Tareas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: titulo,
                    fechInicio: fechaFormateada,
                    completado: "0",
                    usuarioId: userId
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el evento');
            }

            setTitulo('');
            setFecha('');
            window.location.href = "/";
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titulo">Título de la Tarea:</label>
                <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <p>{tituloError}</p>
            <div className="button-container">
                <button type="submit">Añadir Tarea</button>
                <Link to="/" className="sidebar-link">
                    <span>Volver</span>
                </Link>
            </div>
        </form>
    );
}