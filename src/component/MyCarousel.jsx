import React from 'react';
import { Carousel } from 'react-bootstrap';

const MyCarousel = () => {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <hr />
                    <img
                        style={{ width: "100%", height: "600px", objectFit: 'cover' }}
                        src="https://get.wallhere.com/photo/1920x1200-px-guitar-macro-music-1727051.jpg"

                    />
                    <Carousel.Caption>

                        <h3 style={{ fontFamily: 'Playfair Display' }}>Yamaha-магазин гитар, музыкальных инструментов в Бишкеке.</h3>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <hr />
                    <img
                        style={{ width: "100%", height: "600px", objectFit: 'cover' }}
                        src="https://im0-tub-ru.yandex.net/i?id=4d255e094d698c0e5188c07fc16a7d29-l&ref=rim&n=13&w=1080&h=1350"

                    />

                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <hr />
                    <img
                        style={{ width: "100%", height: "600px", objectFit: 'cover' }}
                        src="https://guitarplayer.ru/attach/232389-631252.jpg"

                    />

                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default MyCarousel;