import { createContext, useState } from 'react';

export const PortfolioContext = createContext({
    activeCase: null,
    hoverCase: null,
    setActiveCase: () => {},
    setHoverCase: () => {},
});

export const PortfolioProvider = ({ children }) => {
    const [activeCase, setActiveCase] = useState(null);
    const [hoverCase, setHoverCase] = useState(2);

    const value = {
        activeCase,
        hoverCase,
        setActiveCase,
        setHoverCase,
    };
    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
