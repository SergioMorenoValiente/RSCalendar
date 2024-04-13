import React from 'react';
import './Tareas.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Tareas() {

    const [tab, setTab] = useState("TareasPendientes");

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

                            <TareasPendientes />

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

                            <TareasCompletadas />

                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
}

function TareasPendientes() {
    const [edicionHabilitada, setEdicionHabilitada] = useState(false);

    const toggleEdicion = () => {
        setEdicionHabilitada(!edicionHabilitada);
    };

    return (
        <div className="div-container-tareas">
            <table>
                <tbody>
                    <tr>
                        <td className="tdajustes">
                            <ul className="calendars-list">
                                <li>
                                    <input type="checkbox" />
                                    <label>Nombre de la tarea</label>
                                </li>
                            </ul>
                        </td>
                        {edicionHabilitada && (
                            <> {/* Fragment para envolver las columnas que deben aparecer solo cuando la edición está habilitada */}
                                <td>
                                    <button className="button1ajustes">
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button className="button2ajustes">
                                        Borrar
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                </tbody>
            </table>
            {/* Botón para crear evento/tarea */}
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
function TareasCompletadas() {
    const [edicionHabilitada, setEdicionHabilitada] = useState(false);

    const toggleEdicion = () => {
        setEdicionHabilitada(!edicionHabilitada);
    };

    return (
        <div className="div-container-tareas">
            <table>
                <tbody>
                    <tr>
                        <td className="tdajustes">
                            <ul className="calendars-list">
                                <li>
                                    <input type="checkbox" />
                                    <label>Nombre de la tarea</label>
                                </li>
                            </ul>
                        </td>
                        {edicionHabilitada && (
                            <> {/* Fragment para envolver las columnas que deben aparecer solo cuando la edición está habilitada */}
                                <td>
                                    <button className="button1ajustes">
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button className="button2ajustes">
                                        Borrar
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
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