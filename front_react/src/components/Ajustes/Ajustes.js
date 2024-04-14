import React, { useState, useEffect } from 'react';
import './Ajustes.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Campeones from "./Campeones";
import { getStoredUserId } from '../Utils';
import { fetchData } from '../Services/Peticiones';
function Ajustes() {

    //Constantes
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
    const [nombreCalendarioError, setNombreCalendarioError] = useState('');
    const [descripcionCalendarioError, setDescripcionCalendarioError] = useState('');
    const [nombreErrorVisible, setNombreErrorVisible] = useState(false);
    const [nombreeErrorVisible, setNombreeErrorVisible] = useState(false);

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

    useEffect(() => {
        cargarCalendariosUsuarios();
        cargarCalendarios();
    }, []);

    //Cargar calendarios del susuario
    const cargarCalendariosUsuarios = async () => {
        try {
            const calendariosDelUsuario = await fetchData();
            setCalendarios(calendariosDelUsuario);
        } catch (error) {
            setError(error.message);
        }
    };

    const cargarCalendarios = async () => {
        try {
            const response = await fetch('https://localhost:7143/api/calendarios');
            const data = await response.json();
            setCalendarios(data);
        } catch (error) {
            setError(error.message);
        }
    };

    //Rellenar los campos del formulario con los del calendario a editar
    const llenarFormularioEditar = (calendario) => {
        setCalendarioEditado(calendario);
        setNombreCalendarioEditado(calendario.nombre);
        setDescripcionCalendarioEditado(calendario.descripcion);
        setShowDiv1(false);
        setShowDiv3(true);
        setNombreCalendarioError('');
    };

    //Vaciar campos del formulario
    const vaciarCampos = () => {
        setNombreCalendarioCrear("");
        setDescripcionCalendarioCrear("");
        setNombreCalendario('');
        setError('');
        setCalendarioEditado(null);
        setNombreCalendarioError('');
    };

    //Editar calendario
    const editarCalendario = async (event) => {
        event.preventDefault();

        setNombreCalendarioError('');
        setNombreErrorVisible(false);
        setNombreeErrorVisible(false);

        let hasError = false;

        if (!nombreCalendarioEditado) {
            setNombreCalendarioError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setNombreeErrorVisible(true);
            hasError = true;
        }

        if (hasError) {
            return;
        }
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
            vaciarCampos()
            cargarCalendariosUsuarios();
            setShowDiv1(true);
            setShowDiv3(false);
        } catch (error) {
            setError(error.message);
        }
    };

    //Borrar calendario
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
            cargarCalendariosUsuarios();
            setShowDiv1(true);
            setShowDiv2(false);
        } catch (error) {
            setError(error.message);
        }
    };

    //Crear calendario
    const crearCalendario = async (event) => {
        event.preventDefault();

        setNombreCalendarioError('');
        setNombreErrorVisible(false);
        setNombreeErrorVisible(false);

        let hasError = false;

        if (!nombreCalendarioCrear) {
            setNombreCalendarioError('¡Llena el vacío con tus poderes invocadores y conquista la Grieta!');
            setNombreErrorVisible(true);
            hasError = true;
        }

        if (hasError) {
            return;
        }
        try {
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
            const nuevoCalendario = await response.json();
            const calendarioId = nuevoCalendario.id;

            const usuarioCalendariosResponse = await fetch('https://localhost:7143/api/UsuarioCalendarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    calendarioId: calendarioId,
                    usuarioId: getStoredUserId()
                })
            });

            if (!usuarioCalendariosResponse.ok) {
                throw new Error('Error al agregar entrada en UsuarioCalendarios');
            }

            vaciarCampos()
            cargarCalendariosUsuarios();
            setShowDiv1(true);
            setShowDiv2(false);
        } catch (error) {
            setError(error.message);
        }
    };

//-----------------------------Esta seccion del codigo es para RSCalendar 2.0 :)---------------------------------------------------------------------------------------------------
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

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    const [currentPage, setCurrentPage] = useState(1);
    const [calendariosPerPage, setCalendariosPerPage] = useState(4);
    const indexOfLastCalendario = currentPage * calendariosPerPage;
    const indexOfFirstCalendario = indexOfLastCalendario - calendariosPerPage;
    const currentCalendarios = calendarios.slice(indexOfFirstCalendario, indexOfLastCalendario);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(calendarios.length / calendariosPerPage); i++) {
        pageNumbers.push(i);
    }
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        const totalPages = Math.ceil(calendarios.length / calendariosPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const totalPages = Math.ceil(calendarios.length / calendariosPerPage);

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


                                <div className="table-container">
                                    <div className="arrow-container">
                                        {currentPage > 1 && (
                                            <a href="#" onClick={goToPreviousPage} className="arrow-icon">
                                                <img src="images/Iconos/Icono22Izq.png" alt="Anterior" className="icono21"/>
                                            </a>
                                        )}
                                    </div>
                                    <table>
                                        <tbody>
                                        {currentCalendarios.map(calendario => (
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
                                    <div className="arrow-container">
                                        {currentPage < totalPages && (
                                            <a href="#" onClick={goToNextPage} className="arrow-icon">
                                                <img src="images/Iconos/Icono22Drc.png" alt="Siguiente" className="icono22" />
                                            </a>
                                        )}
                                    </div>
                                </div>

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
                                    htmlFor="nombre">Nombre del calendario</label>
                                <input type="text" id="nombre"
                                    value={nombreCalendarioCrear}
                                            onChange={handleNombreChangeCrear}
                                            onClick={() => {
                                                setNombreCalendarioError('');
                                                setNombreErrorVisible(false);
                                            }}
                                            className={nombreErrorVisible ? 'inputajustes error' : 'inputajustes'}
                                        />
                                        {nombreErrorVisible && (
                                            <div className="validacionajustes">
                                                <img src="images/Iconos/Icono21.png" className="icono10" />
                                                <p className="pajustes">{nombreCalendarioError}</p>
                                            </div>
                                        )}
                            </div>
                            <div>
                                <label className="labelajustes"
                                    htmlFor="descripcion">Descripción del calendario</label>
                                <input className="input2ajustes" type="text" id="descripcion"
                                    value={descripcionCalendarioCrear}
                                    onChange={handleDescripcionChangeCrear} />
                            </div>
                                <button className="button3ajustes"
                                    type="submit">Crear</button>
                                <button className="button4ajustes"
                                    onClick={() => {
                                        setShowDiv1(true);
                                        setShowDiv2(false);
                                        vaciarCampos();
                                        setNombreErrorVisible(false);
                                        setNombreeErrorVisible(false);
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
                                            onClick={() => {
                                                setNombreCalendarioError('');
                                                setNombreeErrorVisible(false);
                                            }}
                                            className={nombreeErrorVisible ? 'inputajustes error' : 'inputajustes'}
                                        />
                                    </div>
                                    {nombreeErrorVisible && (
                                        <div className="validacionajustes">
                                            <img src="images/Iconos/Icono21.png" className="icono10" />
                                            <p className="pajustes">{nombreCalendarioError}</p>
                                        </div>
                                    )}
                            <div>
                                <label className="labelajustes"
                                    htmlFor="descripcion">Descripción calendario</label>
                                <input className="input2ajustes" type="text" id="descripcion"
                                    value={descripcionCalendarioEditado}
                                    onChange={(event) => setDescripcionCalendarioEditado(event.target.value)}/>
                                    </div>
                            <button className="button3ajustes" type="submit">Guardar</button>
                                <button className="button4ajustes"
                                        onClick={() => {
                                        vaciarCampos();
                                        setCalendarioEditado(null);
                                        setShowDiv1(true);
                                            setShowDiv3(false);
                                            setNombreErrorVisible(false);
                                            setNombreeErrorVisible(false);
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