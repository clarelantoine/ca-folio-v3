import { useContext, useRef } from 'react';
import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';

import { easing } from 'maath';
import { useControls } from 'leva';
import gsap from 'gsap';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import waveVertexShader from '../shaders/wave-vertex.glsl';
import { PortfolioContext } from '../contexts/portfolio.context';
import { IMAGES } from '../resources';

const ImageShaderMaterial = shaderMaterial(
    {
        tMap: new THREE.Texture(),
        uPlaneSizes: new THREE.Vector2(0, 0),
        uImageSizes: new THREE.Vector2(0, 0),
        uViewportSizes: new THREE.Vector2(0, 0),
        uStrength: 0,

        uProgress: 0,
        uTime: 0,
    },
    waveVertexShader,
    fragmentShader
);

// declaratively
extend({ ImageShaderMaterial });

const Image = ({ scale, ...props }) => {
    const image = useRef();
    const mat = useRef();

    const { activeCase, hoverCase } = useContext(PortfolioContext);

    const texture = useTexture(IMAGES[hoverCase].image);

    // const { progress } = useControls({
    //     progress: {
    //         value: 0,
    //         min: 0,
    //         max: 1,
    //         step: 0.01,
    //     },
    // });

    const camera = useThree((state) => state.camera);
    const viewport = useThree((state) => state.viewport);

    const { width: vWidth, height: vHeight } = viewport.getCurrentViewport(
        camera,
        [0, 0, 1]
    );

    if (activeCase !== null) {
        const tl = gsap.timeline({
            defaults: { duration: 2, ease: 'expo.inOut' },
        });

        tl.to(
            mat.current.uniforms.uPlaneSizes.value,
            { x: vWidth / 2, y: vHeight },
            0
        )
            .to(image.current.scale, { x: vWidth / 2, y: vHeight }, 0)
            .to(image.current.position, { x: -image.current.scale.x, y: 0 }, 0)

            .to(mat.current.uniforms.uProgress, { value: 1, duration: 1 }, 0)
            .to(mat.current.uniforms.uProgress, { value: 0, duration: 1 }, 1)
            .call(() => console.log('animation done'));
    }

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
            mat.current.uniforms.uTime.value = state.clock.elapsedTime * 2.5;
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
                // uViewportSizes={[width, height]}
            />
        </mesh>
        // </group>
    );
};

export default Image;
