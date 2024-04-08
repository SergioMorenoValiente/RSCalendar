import React from 'react';
import { useState } from "react";
import './Ajustes.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Campeones from "./Campeones";

function Ajustes() {
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

                <h2 className="h2">
                    Calendarios:
                </h2>
                <h3>Calendarios del usuario:</h3>

                <button>Crear Calendario nuevo</button>


                <br /><br />
                <table>
                    <tbody>
                        <tr>
                            <td>Personal</td>
                            <td><button>Editar</button></td>
                            <td><button>Borrar</button></td>
                        </tr>
                        <tr>
                            <td>Trabajo</td>
                            <td><button>Editar</button></td>
                            <td><button>Borrar</button></td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />

                <h4>Crear Calendario</h4>
                <form>
                    <div>
                        <label htmlFor="nombre">Nombre calendario</label>
                        <input type="text" id="nombre"></input>
                    </div>
                    <div>
                        <label htmlFor="descripcion">Nombre calendario</label>
                        <input type="text" id="descripcion"></input>
                    </div>
                    <button>Crear Calendario</button>
                    <button>Volver</button>
                </form>

                <h4>Editar Calendario</h4>
                <form>
                    <div>
                        <label htmlFor="nombre">Nombre calendario</label>
                        <input type="text" id="nombre"></input>
                    </div>
                    <div>
                        <label htmlFor="descripcion">Nombre calendario</label>
                        <input type="text" id="descripcion"></input>
                    </div>
                    <button>Editar Calendario</button>
                    <button>Volver</button>
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