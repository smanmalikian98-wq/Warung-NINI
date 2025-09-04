
import React from 'react';
import { DailySpeedRecord } from '../types';
import { formatCurrency, formatTime, formatPercentage } from '../utils/formatters';

interface DataTableProps {
    records: DailySpeedRecord[];
    onDelete: (id: string) => void;
}

const tableHeaders = [
    "Tgl", "A <5", "B 5-10", "C 10-15", "D 15-20", "E 20-30", "F >30", "Omset", "Speed Rata2",
    "All Transaksi", "Transaksi Hari Ini", "Transaksi Over", "% Tase", "+Transaksi Over/hari", "Hari",
    "Keterangan", "JUMLAH/QC", "Validasi", "Actions"
];

const DataTable: React.FC<DataTableProps> = ({ records, onDelete }) => {
    if (records.length === 0) {
        return (
            <div className="bg-slate-800 p-6 rounded-lg text-center text-slate-400">
                <h3 className="text-lg font-semibold">No Records Found</h3>
                <p>Add a new record using the form to see data here.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-700/50">
                        <tr>
                            {tableHeaders.map(header => (
                                <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider whitespace-nowrap">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-slate-800 divide-y divide-slate-700">
                        {records.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-700/50 transition-colors duration-200">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-200">{record.tgl}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.a}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.b}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.c}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.d}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.e}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.f}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300 font-semibold">{formatCurrency(record.omset)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-cyan-400">{formatTime(record.speedRata2)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.allTransaksi}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.transaksiHariIni}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-amber-400">{record.transaksiOver}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-amber-400">{formatPercentage(record.persentaseOver)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.plusTransaksiOver}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.hari}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-400 max-w-xs truncate">{record.keterangan}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-300">{record.jumlahQc}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.validasi ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                        {record.validasi ? 'TRUE' : 'FALSE'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => onDelete(record.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
