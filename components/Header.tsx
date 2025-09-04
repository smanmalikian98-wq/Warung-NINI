
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">
                Daily Speed Performance Tracker
            </h1>
            <p className="mt-2 text-lg text-slate-400">
                Input daily transaction data to analyze speed and performance metrics.
            </p>
        </header>
    );
};

export default Header;
