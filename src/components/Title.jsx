import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useContext, useRef } from 'react';
// import { motion } from 'framer-motion-3d';
import { easing } from 'maath';
import { PortfolioContext } from '../contexts/portfolio.context';

const Title = ({ text, index, ...props }) => {
    const { activeCase, hoverCase, setActiveCase, setHoverCase } =
        useContext(PortfolioContext);

    const title = useRef();

    const handlePointerEnter = () => {
        if (!activeCase) document.body.style.cursor = 'pointer';
        if (!activeCase) setHoverCase(index);
    };

    const handlePointerLeave = () => {
        document.body.style.cursor = 'default';
        if (!activeCase) setHoverCase(hoverCase);
    };

    const handleClick = () => {
        if (!activeCase) setActiveCase(index);
    };

    useFrame((state, delta) => {
        title.current.material.depthTest = hoverCase !== index;
        title.current.renderOrder = hoverCase === index ? 2 : 0;

        activeCase
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
        </Text>
    );
};

export default Title;
