import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Carousel.css";

// import angel_logo from "/images/angel-logo.png";
// import bhsbc_logo from "/images/bhsbc_logo.png";
// import brandmates_logo from "/images/brandmates_logo.jpg";
// import brdc_logo from "/images/brdc_logo.jpg";
// import drHasan_logo from "/images/dr_hasan_logo.png";
// import greenTrends_logo from "/images/greentrends_logo.png";
// import pinakiRay_logo from "/images/pinaki_ray_logo.jpeg";
// import realmeStore_logo from "/images/realme_logo.png";
// import wb66_logo from "/images/wb66_logo.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Carousel = () => {
    const [carousel, setCarousel] = useState([]);

    // Fetch Clients Carousel Data
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_URL}/api/client`
                );
                setCarousel(response.data);
            } catch (error) {
                console.log("error fetching carousel", error);
            }
        };
        fetchImages();
    }, []);

    var settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 1500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className="slider-container ">
                {carousel.length > 0 ? (
                    <Slider {...settings}>
                        {carousel.map((image) => (
                            <div key={image._id}>
                                <img
                                    src={`${import.meta.env.VITE_LOCAL_URL}/${
                                        image.image
                                    }`}
                                    alt={image.name}
                                    width={200}
                                    className="img-fluid"
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <p> loading images</p>
                )}
            </div>
        </>
    );
};

export default Carousel;
