
import React from 'react';

interface SummaryCardProps {
    title: string;
    value: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
    return (
        <div className="bg-slate-800 p-4 rounded-lg shadow-lg text-center">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-cyan-400 tracking-tight">{value}</p>
        </div>
    );
};

export default SummaryCard;
