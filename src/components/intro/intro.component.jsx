import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './intro.syles.scss';
import { debounce } from 'lodash';
import SplitType from 'split-type';
import gsap from 'gsap';

const Intro = () => {
    const [isOpen, setIsOpen] = useState(true);
    const containerElement = useRef();

    const animateIn = async (textOne, textTwo) => {
        // console.log(textOne, textTwo);
        const tl = await gsap.timeline({
            defaults: { ease: 'power3.out' },
        });

        // [textOne, textTwo].forEach((el) => {
        //     // console.log(el);

        // });

        tl.from(textOne.lines, {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.5,
            // stagger: { amount: 0.1 },
        }).to(textOne.lines, {
            opacity: 0,
            y: -20,
            duration: 1.5,
            // delay: 0.5,
            ease: 'power3.in',
            // stagger: { amount: 0.1 },
        });
        tl.from(textTwo.lines, {
            opacity: 0,
            y: 20,
            duration: 1.5,
            ease: 'power3.out',
            // delay: 0.5,
            // stagger: { amount: 0.1 },
        })
            .to(textTwo.lines, {
                opacity: 0,
                y: -20,
                duration: 1.5,
                delay: 0.5,
                ease: 'power3.in',
                // stagger: { amount: 0.1 },
            })
            .call(() => setIsOpen(false));

        // setIsOpen(false);

        // gsap.from(text.words, {
        //     opacity: 0,
        //     y: 20,
        //     duration: 1,
        //     stagger: { amount: 0.1 },
        // });
    };

    useLayoutEffect(() => {
        const textOne = new SplitType('.text__one');
        const textTwo = new SplitType('.text__two');

        animateIn(textOne, textTwo);

        // const resizeObserver = new ResizeObserver(
        //     debounce(([entry]) => {
        //         // Note: you should add additional logic so the `split` method is only
        //         // called when the **width** of the container element has changed.
        //         textOne.split();
        //         textTwo.split();
        //         console.log('resized');
        //     }, 500)
        // );
        // resizeObserver.observe(containerElement.current);
    }, []);

    return (
        isOpen && (
            <div ref={containerElement} className="intro page">
                <p className="intro__text text__one">clarel antoine.</p>
                <p className="intro__text text__two">
                    An individual crafting digital experiences
                </p>
            </div>
        )
    );
};

export default Intro;
