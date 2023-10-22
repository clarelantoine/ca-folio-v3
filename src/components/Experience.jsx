import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import VirtualScroll from 'virtual-scroll';
import { IMAGES } from '../resources';
import Title from './Title';
import Image from './Image';

// eslint-disable-next-line no-unused-vars
let scrollPositionY = 0;

const Experience = () => {
    const scroller = new VirtualScroll();

    const group = useRef();

    useEffect(() => {
        group.current.position.y = -(IMAGES.length - 1) / 2;

        scroller.on((event) => {
            scrollPositionY = event.y / 2000;
        });
    });

    useFrame(() => {
        group.current.position.y = -(IMAGES.length - 1) / 2;
    });

    return (
        <>
            <group ref={group}>
                {IMAGES.map((img, i) => (
                    <Title
                        key={i}
                        index={i}
                        position={[0, i * 1.05, 0]}
                        text={img.text.toUpperCase()}
                    />
                ))}
            </group>

            <Image scale={[3.5, 2]} />
        </>
    );
};

export default Experience;