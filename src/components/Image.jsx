import { useContext, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image as ImageImpl } from '@react-three/drei';
import { easing } from 'maath';
import { IMAGES } from '../resources';
import { PortfolioContext } from '../contexts/portfolio.context';

const Image = ({ position, ...props }) => {
    const { activeCase } = useContext(PortfolioContext);

    const image = useRef();

    useFrame((state, delta) => {
        const viewport = state.viewport.getCurrentViewport(
            state.camera,
            [0, 0, 1]
        );

        easing.damp3(
            image.current.position,
            [
                (state.pointer.x * viewport.width) / 2,
                (state.pointer.y * viewport.height) / 2,
                1,
            ],
            0.14,
            delta
        );
    });

    return <ImageImpl ref={image} url={IMAGES[activeCase].image} {...props} />;
};

export default Image;
