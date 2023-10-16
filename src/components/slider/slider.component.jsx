import { UseCanvas } from '@14islands/r3f-scroll-rig';
import { Image } from '@react-three/drei';
import React from 'react';

import image1 from '../../assets/images/1.jpeg';
import image2 from '../../assets/images/2.jpeg';
import image3 from '../../assets/images/3.jpeg';

const images = [image1, image2, image3];

const ImageWebGL = (props) => <Image {...props} />;

const Slider = () => (
    <UseCanvas>
        <>
            {images.map((img, index) => (
                <ImageWebGL
                    key={img}
                    url={img}
                    scale={[400, 200]}
                    position={[0, -index * 250, 1]}
                />
            ))}
        </>
    </UseCanvas>
);

export default Slider;

// {/* <Box args={[100, 100, 100]} /> */}
