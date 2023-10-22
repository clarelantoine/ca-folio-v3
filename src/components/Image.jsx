import { useContext, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image as ImageImpl } from '@react-three/drei';
import { easing } from 'maath';
import { IMAGES } from '../resources';
import { PortfolioContext } from '../contexts/portfolio.context';

const Image = ({ position, ...props }) => {
    const { activeCase, hoverCase } = useContext(PortfolioContext);

    const image = useRef();

    useFrame((state, delta) => {
        const viewport = state.viewport.getCurrentViewport(
            state.camera,
            [0, 0, 1]
        );

        if (!activeCase) {
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
        } else {
            easing.damp2(
                image.current.position,
                [-image.current.scale.x / 2, 0],
                0.14,
                delta
            );

            easing.damp2(
                image.current.scale,
                [viewport.width / 2, viewport.height],
                0.14,
                delta
            );
        }
    });

    return <ImageImpl ref={image} url={IMAGES[hoverCase].image} {...props} />;
};

export default Image;
