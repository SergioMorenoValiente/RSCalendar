import React from 'react';
import './Tareas.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Tareas() {

    const [edicionHabilitada, setEdicionHabilitada] = useState(true);

    const toggleEdicion = () => {
        setEdicionHabilitada(!edicionHabilitada);
    };

    return (
        <div className="tareas-container">
            <div className="tareas-container2">
                <h1 className="h1tareas">TAREAS</h1>
                <div className="div-container-tareas">
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
                    <button className="buttonajustes">
                        Ver tareas completadas
                    </button>
                    <p>Botón ver tareas completadas estaria guay que colocaran aquellas tareas ya checkeadas debajo de las que no lo están</p>
                    <p>Estaría bien meter paginación a las 10 tareas por ejemplo</p>
                    <p>Estaría bien meter paginación a los 5 calendarios en ajustes</p>
                    <p>Meter en sidebar un link que lleve a tareas.js "ver más" (se activa si hay más de dos tareas) y sólo se muestren las primeras 2 tareas</p>
                    <p>Meter en sidebar paginacion para cheks en calendarios cuando haya más de 5 calendarios activos</p>
                    <p>Encuadrar todas las páginas</p>
                </div>
            </div>
        </div>
    );
}

export default Tareas;