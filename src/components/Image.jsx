import { useContext, useRef } from 'react';
import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';

import { easing } from 'maath';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import { PortfolioContext } from '../contexts/portfolio.context';
import { IMAGES } from '../resources';

const ImageShaderMaterial = shaderMaterial(
    {
        tMap: new THREE.Texture(),
        uPlaneSizes: [0, 0],
        uImageSizes: [0, 0],
        uViewportSizes: [0, 0],
        uStrength: 0,
    },
    vertexShader,
    fragmentShader
);

// declaratively
extend({ ImageShaderMaterial });

const Image = ({ scale, ...props }) => {
    const image = useRef();
    const mat = useRef();

    const { activeCase, hoverCase } = useContext(PortfolioContext);

    const texture = useTexture(IMAGES[hoverCase].image);

    const { width, height } = useThree((state) => state.viewport);

    useFrame((state, delta) => {
        const viewport = state.viewport.getCurrentViewport(
            state.camera,
            [0, 0, 1]
        );

        if (activeCase === null) {
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

            easing.damp(
                mat.current.uniforms.uPlaneSizes.value,
                0,
                width / 2,
                0.14,
                delta
            );

            easing.damp(
                mat.current.uniforms.uPlaneSizes.value,
                1,
                height,
                0.14,
                delta
            );
        }
    });
    return (
        // <group ref={group} position={position}>

        <mesh ref={image} scale={[...scale, 1]} {...props}>
            <planeGeometry args={[1, 1, 16, 16]} />
            <imageShaderMaterial
                ref={mat}
                tMap={texture}
                uPlaneSizes={scale}
                uImageSizes={[texture.image.width, texture.image.height]}
                uViewportSizes={[width, height]}
            />
        </mesh>
        // </group>
    );
};

export default Image;
