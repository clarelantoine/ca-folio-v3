import {
    MeshDistortMaterial,
    Scroll,
    ScrollControls,
    useScroll,
    useTexture,
} from '@react-three/drei';
import React, { useRef } from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import image1 from '../../assets/images/1.jpeg';
import image2 from '../../assets/images/2.jpeg';
import image3 from '../../assets/images/3.jpeg';

const images = [image1, image2, image3];

const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

// const ImageWebGL = (props) => <Image {...props} />;

const ImageWebGL = ({ index, scale, position, url }) => {
    const data = useScroll();
    const ref = useRef();

    const texture = useTexture(url);

    useFrame(() => {
        const a = data.range(index, 1 / 3);
        const f = data.visible(2 / 3, 1 / 3);

        const inViewportZero = data.range(0, 1.5 / 3);
        const inViewportFirst = 1 - data.curve(1 / 3, 1 / 3, 0.3);
        const inViewportSecond = 1 - data.range(1.5 / 3, 1.5 / 3);

        if (index === 0) {
            ref.current.rotation.z = inViewportZero;

            // console.log(ref.current.rotation.z);
        }
        if (index === 1) {
            ref.current.rotation.z = -inViewportFirst;
            // console.log(map(inViewportFirst, 0.6, 0, -1, 1));
        }
        if (index === 2) {
            ref.current.rotation.z = inViewportSecond;

            // console.log(inViewportSecond);
        }
    });

    return (
        <mesh ref={ref} scale={scale} position={position}>
            <planeGeometry args={[1, 1, 16, 16]} />
            <MeshDistortMaterial map={texture} distort={0.3} speed={5} />
        </mesh>
    );
};

const Slider = () => {
    const { viewport } = useThree((state) => state);
    return (
        <ScrollControls pages={3} damping={0.1}>
            <Scroll>
                <>
                    {images.map((img, index) => (
                        <ImageWebGL
                            key={img}
                            index={index}
                            url={img}
                            scale={[6, 4, 1]}
                            position={[0, -viewport.height * index, 0]}
                        />
                    ))}
                </>
            </Scroll>
        </ScrollControls>
    );
};

export default Slider;

// {/* <Box args={[100, 100, 100]} /> */}
