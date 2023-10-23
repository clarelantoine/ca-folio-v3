import { createContext, useState } from 'react';
import { IMAGES } from '../resources';

const imageArray = IMAGES.map((img) => img.image);

export const PortfolioContext = createContext({
    images: [],
    activeCase: null,
    hoverCase: null,
    setImages: () => {},
    setActiveCase: () => {},
    setHoverCase: () => {},
});

export const PortfolioProvider = ({ children }) => {
    const [images, setImages] = useState(imageArray);
    const [activeCase, setActiveCase] = useState(null);
    const [hoverCase, setHoverCase] = useState(2);

    const value = {
        images,
        activeCase,
        hoverCase,
        setImages,
        setActiveCase,
        setHoverCase,
    };
    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
