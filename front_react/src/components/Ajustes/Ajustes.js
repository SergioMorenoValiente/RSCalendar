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
                <h2 className="h2">
                    Selecciona tu campeón:
                </h2>
                {/* Carrusel de imágenes*/}
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

                {/* Cobaya */}
                {/*{selectedChampion && (
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

            </div>
        </div>
    );
}

export default Ajustes;