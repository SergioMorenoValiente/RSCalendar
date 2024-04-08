import React, { useState, useEffect } from 'react';
import './Ajustes.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Campeones from "./Campeones";
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
                    nombre: nombreCalendarioEditado,
                    descripcion: descripcionCalendarioEditado
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
        } catch (error) {
            setError(error.message);
        }
    };


    const crearCalendario = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://localhost:7143/api/calendarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombreCalendarioCrear,
                    descripcion: descripcionCalendarioCrear
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el calendario');
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
                <h1 className="h1">AJUSTES</h1>
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
                                <p>{item.title}</p>
                            </div>
                        </div>
                    ))}
                </Slider>

                Cobaya
                {selectedChampion && (
                    <div className="selected-champion">
                        <p>Tu campeón seleccionado es {selectedChampion.title}</p>
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
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <button onClick={handleCancelChange}>Cancelar</button>
                    </div>
                )}*/}

                
                        <h1 className="h1">AJUSTES</h1>
                   
                <h2 className="h2">
                    Calendarios:
                </h2>
                <h3>Calendarios del usuario:</h3>

                <button>Crear Calendario nuevo</button>

                <br /><br />

                <table>
                    <tbody>
                        {calendarios.map(calendario => (
                            <tr key={calendario.id}>
                                <td>{calendario.nombre}</td>
                                <td><button onClick={() => llenarFormularioEditar(calendario)}>Editar</button></td>
                                <td><button>Borrar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <br /><br />

                <h4>Crear Calendario</h4>
                <form onSubmit={crearCalendario}>
                    {error && <p>{error}</p>}
                    <div>
                        <label htmlFor="nombre">Nombre calendario:</label>
                        <input type="text" id="nombre" value={nombreCalendarioCrear} onChange={handleNombreChangeCrear} required />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción calendario:</label>
                        <input type="text" id="descripcion" value={descripcionCalendarioCrear} onChange={handleDescripcionChangeCrear} required />
                    </div>
                    <button type="submit">Crear Calendario</button>
                </form>

                <h4>Editar Calendario</h4>
                <form onSubmit={editarCalendario}>
                    <div>
                        <label htmlFor="nombre">Nombre calendario</label>
                        <input type="text" id="nombre" value={nombreCalendarioEditado} onChange={(event) => setNombreCalendarioEditado(event.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción calendario</label>
                        <input type="text" id="descripcion" value={descripcionCalendarioEditado} onChange={(event) => setDescripcionCalendarioEditado(event.target.value)} required />
                    </div>
                    <button type="submit">Editar Calendario</button>
                    <button onClick={() => setCalendarioEditado(null)}>Volver</button>
                </form>

                <br /><br /><br /><br />


                <h3>Calendarios de League of Legends:</h3>
                <ul>
                <li>Mundial</li>
                <li>Liga</li>
                </ul>


            </div>
        </div>
    );
}

export default Ajustes;