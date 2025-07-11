export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PredictionData {
  date: string;
  predicted: number;
  confidence: number;
  actual?: number;
}

export type MLModel = 'LSTM' | 'Linear Regression' | 'Random Forest';

export interface ModelMetrics {
  accuracy: number;
  mse: number;
  mae: number;
  r2: number;
}

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
}