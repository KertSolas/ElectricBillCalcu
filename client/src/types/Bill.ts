export interface Bill {
    _id?: string; // Optional for new bills
    previousReading: number;
    currentReading: number;
    rate: number;
    date: string;
    calculatedBill: number;
    shop: {name: string; _id: string};
    createdAt?: string;
  }
  