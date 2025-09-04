
import React, { useState } from 'react';
import { DayOfWeek, FormState } from '../types';

interface InputFormProps {
    onSubmit: (formData: FormState) => void;
}

const initialFormState: FormState = {
    tgl: new Date().getDate(),
    a: 0, b: 0, c: 0, d: 0, e: 0, f: 0,
    omset: 0,
    hari: DayOfWeek.Senin,
    keterangan: '',
    jumlahQc: 0,
    validasi: true,
};

const InputGroup: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300">{label}</label>
        <p className="text-xs text-slate-500 mb-1">{description}</p>
        {children}
    </div>
);

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
    const [formState, setFormState] = useState<FormState>(initialFormState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormState(prev => ({ ...prev, [name]: checked }));
        } else {
             const parsedValue = type === 'number' && value !== '' ? parseInt(value, 10) : value;
             setFormState(prev => ({ ...prev, [name]: parsedValue }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
        setFormState(initialFormState); // Reset form after submission
    };

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-cyan-400">Add New Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup label="Tanggal" description="Day of the month (1-31)">
                        <input type="number" name="tgl" value={formState.tgl} onChange={handleChange} min="1" max="31" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                    <InputGroup label="Hari" description="Day of the week">
                         <select name="hari" value={formState.hari} onChange={handleChange} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                           {Object.values(DayOfWeek).map(day => (
                               <option key={day} value={day}>{day}</option>
                           ))}
                        </select>
                    </InputGroup>
                </div>
                
                <p className="text-sm font-medium text-slate-300 pt-2">Transaction Speed Categories</p>
                <div className="grid grid-cols-3 gap-4">
                     <InputGroup label="A" description="< 5 min">
                        <input type="number" name="a" value={formState.a} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                    <InputGroup label="B" description="5-10 min">
                        <input type="number" name="b" value={formState.b} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                    <InputGroup label="C" description="10-15 min">
                        <input type="number" name="c" value={formState.c} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                    <InputGroup label="D" description="15-20 min">
                        <input type="number" name="d" value={formState.d} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                    <InputGroup label="E" description="20-30 min">
                        <input type="number" name="e" value={formState.e} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                    <InputGroup label="F" description="> 30 min">
                        <input type="number" name="f" value={formState.f} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                </div>

                <InputGroup label="Omset" description="Total daily revenue (IDR)">
                    <input type="number" name="omset" value={formState.omset} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                </InputGroup>

                <InputGroup label="Keterangan" description="Notes for the day">
                    <textarea name="keterangan" value={formState.keterangan} onChange={handleChange} rows={2} className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                </InputGroup>
                
                <div className="grid grid-cols-2 gap-4">
                     <InputGroup label="Jumlah/QC" description="Quality Control count">
                        <input type="number" name="jumlahQc" value={formState.jumlahQc} onChange={handleChange} min="0" required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"/>
                    </InputGroup>
                     <div className="flex items-center pt-6">
                        <input type="checkbox" name="validasi" id="validasi" checked={formState.validasi} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 bg-slate-700"/>
                        <label htmlFor="validasi" className="ml-2 block text-sm font-medium text-slate-300">Validasi</label>
                    </div>
                </div>

                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                    Add Performance Record
                </button>
            </form>
        </div>
    );
};

export default InputForm;
