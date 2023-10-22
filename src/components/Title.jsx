import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useContext, useRef } from 'react';
import { PortfolioContext } from '../contexts/portfolio.context';

const Title = ({ text, index, ...props }) => {
    const { activeCase, setActiveCase } = useContext(PortfolioContext);

    const title = useRef();

    const handlePointerEnter = () => {
        document.body.style.cursor = 'pointer';
        setActiveCase(index);
    };

    const handlePointerLeave = () => {
        document.body.style.cursor = 'default';
        setActiveCase(activeCase);
    };

    useFrame(() => {
        title.current.material.depthTest = activeCase !== index;
        title.current.renderOrder = activeCase === index ? 2 : 0;
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
        >
            {text}
        </Text>
    );
};

export default Title;
