import { UseCanvas } from '@14islands/r3f-scroll-rig';
import { Image } from '@react-three/drei';
import React from 'react';

const images = [
    './src/assets/images/1.jpeg',
    './src/assets/images/2.jpeg',
    './src/assets/images/3.jpeg',
];

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
