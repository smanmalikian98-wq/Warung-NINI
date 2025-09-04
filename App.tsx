

import React, { useState, useMemo, useCallback } from 'react';
// Fix: Import DayOfWeek enum to correctly type the 'hari' property.
import { DailySpeedRecord, FormState, DayOfWeek } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import DataTable from './components/DataTable';
import SummaryCard from './components/SummaryCard';
import { formatCurrency, formatPercentage, formatTime } from './utils/formatters';

const initialData: DailySpeedRecord[] = [
    {
        id: 'initial-1',
        tgl: 1,
        a: 60,
        b: 95,
        c: 15,
        d: 1,
        e: 0,
        f: 0,
        omset: 16945250,
        // Fix: Use DayOfWeek.Senin enum member instead of a string literal.
        hari: DayOfWeek.Senin,
        keterangan: 'Gorengan goreng baru',
        jumlahQc: 5,
        validasi: true,
        speedRata2: 377,
        allTransaksi: 171,
        transaksiHariIni: 171,
        transaksiOver: 16,
        persentaseOver: 0.0935672514619883,
        plusTransaksiOver: 16,
    },
];

const App: React.FC = () => {
    const [records, setRecords] = useState<DailySpeedRecord[]>(initialData);

    const handleAddRecord = useCallback((formData: FormState) => {
        const { a, b, c, d, e, f } = formData;
        const allTransaksi = a + b + c + d + e + f;
        const transaksiOver = c + d + e + f;
        const persentaseOver = allTransaksi > 0 ? transaksiOver / allTransaksi : 0;
        
        // Midpoint times in seconds
        const timeMidpoints = { a: 2.5 * 60, b: 7.5 * 60, c: 12.5 * 60, d: 17.5 * 60, e: 25 * 60, f: 35 * 60 };
        const totalTimeInSeconds = (a * timeMidpoints.a) + (b * timeMidpoints.b) + (c * timeMidpoints.c) + (d * timeMidpoints.d) + (e * timeMidpoints.e) + (f * timeMidpoints.f);
        const speedRata2 = allTransaksi > 0 ? totalTimeInSeconds / allTransaksi : 0;

        const newRecord: DailySpeedRecord = {
            id: new Date().toISOString(),
            ...formData,
            allTransaksi,
            transaksiHariIni: allTransaksi,
            transaksiOver,
            plusTransaksiOver: transaksiOver,
            persentaseOver,
            speedRata2
        };

        setRecords(prevRecords => [newRecord, ...prevRecords]);
    }, []);

    const handleDeleteRecord = useCallback((id: string) => {
        setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
    }, []);
    
    const summary = useMemo(() => {
        const totalOmset = records.reduce((acc, curr) => acc + curr.omset, 0);
        const totalTransactions = records.reduce((acc, curr) => acc + curr.allTransaksi, 0);
        const totalOver = records.reduce((acc, curr) => acc + curr.transaksiOver, 0);
        const totalTime = records.reduce((acc, curr) => acc + (curr.speedRata2 * curr.allTransaksi), 0);
        
        const avgSpeed = totalTransactions > 0 ? totalTime / totalTransactions : 0;
        const overallOverPercentage = totalTransactions > 0 ? totalOver / totalTransactions : 0;

        return {
            totalOmset,
            totalTransactions,
            avgSpeed,
            overallOverPercentage
        };
    }, [records]);


    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />

                <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <InputForm onSubmit={handleAddRecord} />
                    </div>
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                           <SummaryCard title="Total Omset" value={formatCurrency(summary.totalOmset)} />
                           <SummaryCard title="Total Transaksi" value={summary.totalTransactions.toLocaleString()} />
                           <SummaryCard title="Avg Speed / Transaksi" value={formatTime(summary.avgSpeed)} />
                           <SummaryCard title="Overall Over %" value={formatPercentage(summary.overallOverPercentage)} />
                        </div>
                        <DataTable records={records} onDelete={handleDeleteRecord} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;