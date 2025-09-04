
export enum DayOfWeek {
  Senin = 'Senin',
  Selasa = 'Selasa',
  Rabu = 'Rabu',
  Kamis = 'Kamis',
  Jumat = 'Jumat',
  Sabtu = 'Sabtu',
  Minggu = 'Minggu',
}

export interface FormState {
    tgl: number;
    a: number; // <5
    b: number; // 5-10
    c: number; // 10-15
    d: number; // 15-20
    e: number; // 20-30
    f: number; // >30
    omset: number;
    hari: DayOfWeek;
    keterangan: string;
    jumlahQc: number;
    validasi: boolean;
}


export interface DailySpeedRecord extends FormState {
  id: string; // Unique ID for React keys
  // Calculated fields
  speedRata2: number; // in seconds
  allTransaksi: number;
  transaksiHariIni: number;
  transaksiOver: number;
  persentaseOver: number;
  plusTransaksiOver: number;
}
