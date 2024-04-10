﻿import React, { useState, useEffect } from 'react';
import './Ajustes.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Campeones from "./Campeones";
import { getStoredUserId } from '../Utils';
function Ajustes() {

    const [calendarios, setCalendarios] = useState([]);
    const [nombreCalendario, setNombreCalendario] = useState("");
    const [descripcionCalendario, setDescripcionCalendario] = useState("");
    const [error, setError] = useState('');
    const [nombreCalendarioCrear, setNombreCalendarioCrear] = useState("");
    const [descripcionCalendarioCrear, setDescripcionCalendarioCrear] = useState("");
    const [nombreCalendarioEditado, setNombreCalendarioEditado] = useState("");
    const [descripcionCalendarioEditado, setDescripcionCalendarioEditado] = useState("");
    const [calendarioEditado, setCalendarioEditado] = useState(null);
    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);

    useEffect(() => {
        fetch('https://localhost:7143/api/calendarios')
            .then(response => response.json())
            .then(data => setCalendarios(data))
            .catch(error => console.error('Error fetching calendars:', error));
    }, []);

    const handleNombreChangeCrear = (event) => {
        setNombreCalendarioCrear(event.target.value);
    };

    const handleDescripcionChangeCrear = (event) => {
        setDescripcionCalendarioCrear(event.target.value);
    };

    const handleNombreChange = (event) => {
        setNombreCalendario(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcionCalendario(event.target.value);
    };

    const llenarFormularioEditar = (calendario) => {
        setCalendarioEditado(calendario);
        setNombreCalendarioEditado(calendario.nombre);
        setDescripcionCalendarioEditado(calendario.descripcion);
        setShowDiv1(false);
        setShowDiv3(true);
    };


    const editarCalendario = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://localhost:7143/api/calendarios/${calendarioEditado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: calendarioEditado.id,
                    nombre: nombreCalendarioEditado,
                    descripcion: descripcionCalendarioEditado,
                    visible: 1
                })
            });

            if (!response.ok) {
                throw new Error('Error al editar el calendario');
            }

            // Limpiar los campos después de enviar el formulario
            setNombreCalendario('');
            setDescripcionCalendario('');
            setError('');
            setCalendarioEditado(null);

            // Actualizar la lista de calendarios después de editar uno
            fetch('https://localhost:7143/api/calendarios')
                .then(response => response.json())
                .then(data => setCalendarios(data))
                .catch(error => console.error('Error fetching calendars:', error));
            setShowDiv1(true);
            setShowDiv3(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const borrarCalendario = async (calendario) => {
        try {
            const response = await fetch(`https://localhost:7143/api/calendarios/${calendario.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al borrar el calendario');
            }
            // Actualizar la lista de calendarios después de borrar
            fetch('https://localhost:7143/api/calendarios')
                .then(response => response.json())
                .then(data => setCalendarios(data))
                .catch(error => console.error('Error fetching calendars:', error));
            setShowDiv1(true);
            setShowDiv2(false);
        } catch (error) {
            setError(error.message);
        }
    };



    const crearCalendario = async (event) => {
        event.preventDefault();
        try {
            // Hacer la solicitud para crear el calendario
            const response = await fetch('https://localhost:7143/api/calendarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombreCalendarioCrear,
                    descripcion: descripcionCalendarioCrear,
                    visible: 1
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el calendario');
            }

            // Obtener el ID del calendario creado
            const nuevoCalendario = await response.json();
            const calendarioId = nuevoCalendario.id; // Suponiendo que el ID se llama 'id'

            // Hacer la solicitud para agregar una entrada en UsuarioCalendarios
            const usuarioCalendariosResponse = await fetch('https://localhost:7143/api/UsuarioCalendarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    calendarioId: calendarioId,
                    usuarioId: getStoredUserId() // Suponiendo que esta función devuelve el usuarioId
                })
            });

            if (!usuarioCalendariosResponse.ok) {
                throw new Error('Error al agregar entrada en UsuarioCalendarios');
            }

            // Limpiar los campos después de enviar el formulario
            setNombreCalendario('');
            setDescripcionCalendario('');
            setError('');
            // Actualizar la lista de calendarios después de crear uno nuevo
            fetch('https://localhost:7143/api/calendarios')
                .then(response => response.json())
                .then(data => setCalendarios(data))
                .catch(error => console.error('Error fetching calendars:', error));
            setShowDiv1(true);
            setShowDiv2(false);
        } catch (error) {
            setError(error.message);
        }
    };



    const [selectedChampion, setSelectedChampion] = useState(null);
    const [showSlider, setShowSlider] = useState(false);

    const handleSelectChampion = (champion) => {
        setSelectedChampion(champion);
    };

    const handleChangeChampion = () => {
        setShowSlider(true);
    };

    const handleCancelChange = () => {
        setShowSlider(false);
    };

    //Para las opciones de configuración del carrusel
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1500,
        nextArrow: (
            <div>
                <div className="next-slick-arrow">
                    <img src="./images/Iconos/Icono15Drc.png"
                        alt="Botón para pasar el slider una posición a la derecha" />
                </div>
            </div>
        ),
        prevArrow: (
            <div>
                <div className="prev-slick-arrow">
                    <img src="./images/Iconos/Icono15Izq.png"
                        alt="Botón para pasar el slider una posición a la izquierda" />
                </div>
            </div>
        ),
    };



    return (
        <div className="ajustes-container">
            <div className="ajustes-container2">
                <h1 className="h1ajustes">AJUSTES</h1>
                <div className="divajustes-container-container">
                    {/*<h2 className="h2ajustes">*/}
                    {/*    Calendarios*/}
                    {/*</h2>*/}
                </div>
                <div className="divajustes-container"> 
                    <div className="half-screen-left">
                    {showDiv1 && (
                    <div className="divajustes1">
                        <h2 className="h2ajustes">Tus Calendarios</h2>

                            
                        <table>
                            <tbody>
                                {calendarios.map(calendario => (
                                    <tr key={calendario.id}>
                                        <td className="tdajustes">{calendario.nombre}</td>
                                        <td>
                                            <button className="button1ajustes"
                                            onClick={() => llenarFormularioEditar(calendario)}>
                                            Editar
                                            </button>
                                        </td>
                                        <td>
                                            <button className="button2ajustes" onClick={() => borrarCalendario(calendario)}>
                                                Borrar
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                                </table>
                                <button className="buttonajustes"
                                    onClick={() => {
                                        setShowDiv1(false);
                                        setShowDiv2(true);
                                    }}>
                                    <img src="images/Iconos/Icono7.png" className="iconoajustes" />
                                    Crear calendario nuevo</button>
                        </div>
                    )}
                    {showDiv2 && (
                    <div className="divajustes2">
                        <h2 className="h2ajustes">Crear Calendario</h2>
                        <form onSubmit={crearCalendario}>
                            {error && <p>{error}</p>}
                            <div>
                                <label className="labelajustes"
                                    htmlFor="nombre">Nombre calendario:</label>
                                <input className="inputajustes" type="text" id="nombre"
                                    value={nombreCalendarioCrear}
                                    onChange={handleNombreChangeCrear} required />
                            </div>
                            <div>
                                <label className="labelajustes"
                                    htmlFor="descripcion">Descripción calendario:</label>
                                <input className="input2ajustes" type="text" id="descripcion"
                                    value={descripcionCalendarioCrear}
                                    onChange={handleDescripcionChangeCrear} required />
                            </div>
                                <button className="button3ajustes"
                                    type="submit">Crear</button>
                                <button className="button4ajustes"
                                    onClick={() => {
                                        setShowDiv1(true);
                                        setShowDiv2(false);
                                    }}>Volver</button>
                        </form>
                    </div>
                    )}
                    {showDiv3 && (
                    <div className="divajustes3">
                        <h2 className="h2ajustes">Editar Calendario</h2>
                        <form onSubmit={editarCalendario}>
                            <div>
                                <label className="labelajustes"
                                    htmlFor="nombre">Nombre calendario</label>
                                <input className="inputajustes"
                                    type="text" id="nombre" value={nombreCalendarioEditado}
                                    onChange={(event) => setNombreCalendarioEditado(event.target.value)}
                                    required />
                            </div>
                            <div>
                                <label className="labelajustes"
                                    htmlFor="descripcion">Descripción calendario</label>
                                <input className="input2ajustes" type="text" id="descripcion"
                                    value={descripcionCalendarioEditado}
                                    onChange={(event) => setDescripcionCalendarioEditado(event.target.value)}
                                    required />
                            </div>
                            <button className="button3ajustes" type="submit">Guardar</button>
                                <button className="button4ajustes"
                                    onClick={() => {
                                        setCalendarioEditado(null);
                                        setShowDiv1(true);
                                        setShowDiv3(false);
                                    }}>Volver</button>
                        </form>
                    </div>
                        )}
                    </div>
                    {/*<div className="half-screen-right">*/}
                    {/*<div className="divajustes4">*/}
                    {/*    <h3 className="h3ajustes">Calendarios de League of Legends</h3>*/}
                    {/*    <ul className="ulajustes">*/}
                    {/*        <li className="liajustes">Mundial</li>*/}
                    {/*        <li className="liajustes">Mundial</li>*/}
                    {/*        <li className="liajustes">Mundial</li>*/}
                    {/*        <li className="liajustes">Mundial</li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}

export default Ajustes;



{/* Comentario de prueba*/ }
{/*<h2 className="h2">
                    Selecciona tu campeón:
                </h2>

                 Carrusel de imágenes
                <Slider {...settings} className="carrusel">
                    {Campeones.map((item) => (
                        <div key={item.id} >

                            <div className="img-body">
                                <img src={item.src} alt={item.alt}/>
                            </div>
                            <div>
                                <p className="pajustes">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </Slider>

                Cobaya
                {selectedChampion && (
                    <div className="selected-champion">
                        <p className="pajustes">Tu campeón seleccionado es {selectedChampion.title}</p>
                        <img src={selectedChampion.src} alt={selectedChampion.alt} />
                    </div>
                )}
                {!showSlider && (
                    <div className="select-champion">
                        <button onClick={handleChangeChampion}>Cambiar campeón</button>
                    </div>
                )}

                {showSlider && (
                    <div className="slider-container">
                        <Slider {...settings} className="carrusel">
                            {Campeones.map((item) => (
                                <div key={item.id} onClick={() => handleSelectChampion(item)}>
                                    <div className="img-body">
                                        <img src={item.src} alt={item.alt} />
                                    </div>
                                    <div>
                                        <p className="pajustes">{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <button onClick={handleCancelChange}>Cancelar</button>
                    </div>
                )}*/}