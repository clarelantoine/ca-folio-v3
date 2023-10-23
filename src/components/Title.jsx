import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useContext, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion-3d';
import { easing } from 'maath';
import { PortfolioContext } from '../contexts/portfolio.context';

const Title = ({ text, index, ...props }) => {
    const { activeCase, hoverCase, setActiveCase, setHoverCase } =
        useContext(PortfolioContext);

    const title = useRef();

    const handlePointerEnter = () => {
        if (activeCase === null) {
            document.body.style.cursor = 'pointer';
            setHoverCase(index);
        }
    };

    const handlePointerLeave = () => {
        document.body.style.cursor = 'default';
        // setHoverCase(hoverCase);
    };

    const handleClick = () => {
        if (activeCase === null) setActiveCase(index);
    };

    // useEffect(() => {
    //     console.log(activeCase);
    // }, [activeCase]);

    useFrame((state, delta) => {
        title.current.material.depthTest = hoverCase !== index;
        title.current.renderOrder = hoverCase === index ? 2 : 0;

        activeCase !== null
            ? easing.damp(title.current.clipRect, 1, 0.5, 0.14, delta * 0.5)
            : easing.damp(title.current.clipRect, 1, -0.5, 0.14, delta * 0.5);
    });

    return (
        <Text
            {...props}
            ref={title}
            index={index}
            anchorX="center"
            anchorY="middle"
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onClick={handleClick}
            clipRect={[-10, -1, 10, 1]}
        >
            {text}
            <meshBasicMaterial blending={THREE.AdditiveBlending} />
        </Text>
    );
};

export default Title;
