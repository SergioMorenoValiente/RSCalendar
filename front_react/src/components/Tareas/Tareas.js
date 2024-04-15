import React, { useState, useEffect } from 'react';
import './Tareas.css';
import { Link } from 'react-router-dom';
import { getStoredUserId } from '../Utils';

function Tareas() {

    const [tab, setTab] = useState("TareasPendientes");
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [tareasDelUsuario, setTareasDelUsuario] = useState('');
    const [tituloError, setTituloError] = useState('');
    const [fechaError, setFechaError] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [completado, setCompletado] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [tareaId, setTareaId] = useState(null);
    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);
    const [edicionHabilitada, setEdicionHabilitada] = useState(false);
    const [iconoEdicion, setIconoEdicion] = useState('images/Iconos/Icono23.png');
    const [tituloErrorVisible, setTituloErrorVisible] = useState(false);
    const [tituloeErrorVisible, setTituloeErrorVisible] = useState(false);

    useEffect(() => {

        setUserId(getStoredUserId());
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

    //Función para manejar el envío del formulario al editar tarea
    const handleSubmitE = async (e) => {
        e.preventDefault();

        setTituloError('');
        setTituloErrorVisible(false);
        setTituloeErrorVisible(false);

        let hasError = false;

        if (!titulo) {
            setTituloError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setTituloeErrorVisible(true);
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7143/api/tareas/${tareaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: tareaId,
                    nombre: titulo,
                    fechInicio: fecha,
                    completado: completado,
                    usuarioId: usuarioId
                })
            });

            if (!response.ok) {
                throw new Error('Error al editar el evento');
            }
            setTitulo('');
            setFecha('');
            setCompletado('');
            setUsuarioId('');
            setError('');

            window.location.href = "/Tareas";
        } catch (error) {
            setError(error.message);
        }
    };

    //Borar tarea
    const borrarTarea2 = async (tareaId) => {
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
            setShowDiv1(true);
            setShowDiv2(false);
        } catch (error) {
            setError(error.message);
        }
    };

    async function fetchTareaData(tareaId) {
        try {
            const response = await fetch(`https://localhost:7143/api/Tareas/${tareaId}`);
            if (!response.ok) {
                throw new Error('Error al cargar los datos de la tarea');
            }
            const tareaData = await response.json();
            setTitulo(tareaData.nombre);
            setFecha(tareaData.fechInicio);
            setCompletado(tareaData.completado);
            setUsuarioId(tareaData.usuarioId);
        } catch (error) {
            setError(error.message);
        }
    }

    //Función para manejar el envío del formulario al crear tarea
    const handleSubmitC = async (e) => {
        e.preventDefault();

        setTituloError('');
        setTituloErrorVisible(false);
        setTituloeErrorVisible(false);

        let hasError = false;

        if (!titulo) {
            setTituloError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setTituloErrorVisible(true);
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
            console.log(titulo);
            console.log(fechaFormateada);
            console.log("0");
            console.log(userId);

            if (!response.ok) {
                throw new Error('Error al crear el evento');
            }

            setTitulo('');
            setFecha('');
            window.location.href = "/Tareas";
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleEdicion = () => {
        setEdicionHabilitada(!edicionHabilitada);
        const nuevoIcono = edicionHabilitada ? 'images/Iconos/Icono23.png' : 'images/Iconos/Icono24.png';
        setIconoEdicion(nuevoIcono);
    };

    const tareasPendientes = tareas.filter(tarea => tarea.completado === "0");

    const handleTareaCompletada = async (id, tarea) => {
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
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditar = (tarea) => {
        fetchTareaData(tarea.id);
        setTareaId(tarea.id);
        setShowDiv1(false);
        setShowDiv3(true);
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

    //Vaciar campos del formulario
    const vaciarCampos = () => {
        setTitulo("");
        setError('');
        setTituloError('');
    };

    return (
        <div className="tareas-container">
            <div className="tareas-container2">
                {/*<h1 className="h1tareas">TAREAS</h1>*/}



                {showDiv1 && (
                <div className="form-container">
                    {tab === "TareasPendientes" && (
                        <React.Fragment>

                            {/* Botones de pestañas evento */}
                            <div className="tab-buttons">
                                <h2 className={tab === "TareasPendientes" ? "active" : ""}
                                    onClick={() => setTab("TareasPendientes")}>PENDIENTES</h2>
                                <h2 className={tab === "TareasCompletadas" ? "active" : ""}
                                        onClick={() => setTab("TareasCompletadas")}>COMPLETADAS</h2>
                                    <div className="tooltip2" onClick={toggleEdicion}>
                                        <img src={iconoEdicion} className="iconotareas"
                                            alt={edicionHabilitada ? "Deshabilitar edición" : "Habilitar edición"} />
                                        <span className="tooltiptext2">{edicionHabilitada ? "Deshabilitar edición" : "Habilitar edición"}</span>
                                    </div>
                            </div>

                                <div className="table-container">
                                    {/*<div className="arrow-container"></div>*/}
                                    <table>
                                        <tbody>
                                            {tareasPendientes.map((tarea) => (
                                                <tr key={tarea.id} className="trtareas">
                                                    <td className="tdtareas">
                                                        <ul className="tareas-list">
                                                            <li>
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={() => handleTareaCompletada(tarea.id, tarea)}
                                                                    checked={tarea.completado === '1'}
                                                                />
                                                                <label className="label-sidebar">{tarea.nombre}</label>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    {edicionHabilitada && (
                                                        <>
                                                            <td>
                                                                <button className="button1tareas"
                                                                    onClick={() => handleEditar(tarea)}>
                                                                    Editar
                                                                </button>

                                                            </td>
                                                            <td>
                                                                <button className="button2tareas"
                                                                    onClick={() => borrarTarea2(tarea.id)}>
                                                                    Borrar
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/*<div className="arrow-container"></div>*/}
                                </div>



                        </React.Fragment>
                    )}
                        {tab === "TareasCompletadas" && (
                        <React.Fragment>

                            <div className="tab-buttons">
                                <h2 className={tab === "TareasPendientes" ? "active" : ""}
                                    onClick={() => setTab("TareasPendientes")}>PENDIENTES</h2>
                                <h2 className={tab === "TareasCompletadas" ? "active" : ""}
                                    onClick={() => setTab("TareasCompletadas")}>COMPLETADAS</h2>
                                    <div className="tooltip2" onClick={toggleEdicion}>
                                        <img src={iconoEdicion} className="iconotareas"
                                            alt={edicionHabilitada ? "Deshabilitar edición" : "Habilitar edición"} />
                                        <span className="tooltiptext2">{edicionHabilitada ? "Deshabilitar edición" : "Habilitar edición"}</span>
                                    </div>
                            </div>

                                <div className="table-container">
                                    {/*<div className="arrow-container"></div>*/}
                                    <table>
                                        <tbody>
                                            {tareasCompletadas.map((tarea, index) => (
                                                <tr className="trtareas">
                                                    <td className="tdtareas">
                                                        <ul className="tareas-list">
                                                            <li key={index}>
                                                                <input type="checkbox" checked
                                                                    onChange={() => handleTareaSinCompletar(tarea.id, tarea)} />
                                                                <label style={{ textDecoration: 'line-through' }} className="label-sidebar">{tarea.nombre}</label>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                    {edicionHabilitada && (
                                                        <> {/* Fragment para envolver las columnas que deben aparecer solo cuando la edición está habilitada */}
                                                            <td>
                                                                <button className="button1tareas"
                                                                    onClick={() => handleEditar(tarea)}>
                                                                    Editar
                                                                </button>

                                                            </td>
                                                            <td>
                                                                <button className="button2tareas"
                                                                    onClick={() => borrarTarea2(tarea.id)}>
                                                                    Borrar
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/*<div className="arrow-container"></div>*/}
                                </div>


                        </React.Fragment>
                    )}
                        <button className="buttontareas"
                            onClick={() => {
                                setShowDiv1(false);
                                setShowDiv2(true);
                            }}>
                            <img src="images/Iconos/Icono7.png" className="iconoajustes" />
                            Crear tarea nueva</button>
                </div>
                )}
                {showDiv2 && (
                    <div className="form-container">
                        <div className="divajustes2">
                            <h2 className="h2ajustes">Crear Tarea</h2>
                    <form onSubmit={handleSubmitC}>
                        <div>
                                <label htmlFor="titulo"
                                className="labeltareas">Título de la Tarea:</label>
                                <input type="text" id="titulo" value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    onClick={() => {
                                        setTituloError('');
                                        setTituloErrorVisible(false);
                                    }}
                                        className={tituloErrorVisible ? 'inputtareas error' : 'inputtareas'}
                                />
                                {tituloErrorVisible && (
                                    <div className="validacionajustes">
                                        <img src="images/Iconos/Icono21.png" className="icono10" />
                                        <p className="pajustes">{tituloError}</p>
                                    </div>
                                )}
                                </div>
                                <div className="button-container">
                            <button type="submit"
                                    className="button3tareas">Crear Tarea</button>
                            <button className="button4tareas"
                                onClick={() => {
                                    setShowDiv1(true);
                                    setShowDiv2(false);
                                    vaciarCampos();
                                    setTituloErrorVisible(false);
                                    setTituloeErrorVisible(false);
                                        }}>Volver</button>
                                </div>
                        </form>
                    </div>
                    </div>
)}
                {showDiv3 && (
                    <div className="form-container">
                        <div className="divajustes2">
                            <h2 className="h2ajustes">EDITAR TAREA</h2>
                            <form onSubmit={(e) => handleSubmitE(e)}>
                                <div>
                                    <label htmlFor="titulo"
                                        className="labeltareas">Título de la Tarea:</label>
                                    <input type="text" id="titulo" value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        onClick={() => {
                                            setTituloError('');
                                            setTituloeErrorVisible(false);
                                        }}
                                        className={tituloeErrorVisible ? 'inputtareas error' : 'inputtareas'}
                                    />
                                    {tituloeErrorVisible && (
                                        <div className="validacionajustes">
                                            <img src="images/Iconos/Icono21.png" className="icono10" />
                                            <p className="pajustes">{tituloError}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="button-container">
                                    <button className="button3tareas" type="submit">Guardar Tarea</button>
                                    <button className="button4tareas"
                                        onClick={() => {
                                            setShowDiv1(true);
                                            setShowDiv3(false);
                                            vaciarCampos();
                                            setTituloErrorVisible(false);
                                            setTituloeErrorVisible(false);
                                        }}>Volver</button>
                                </div>
                            </form>
                        </div>
                    </div>
)}
            </div>
        </div>
    );
}

export default Tareas;