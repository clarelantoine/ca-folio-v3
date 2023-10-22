import { createContext, useState } from 'react';

export const PortfolioContext = createContext({
    activeCase: null,
    setActiveCase: () => {},
});

export const PortfolioProvider = ({ children }) => {
    const [activeCase, setActiveCase] = useState(2);

    const value = {
        activeCase,
        setActiveCase,
    };
    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};
