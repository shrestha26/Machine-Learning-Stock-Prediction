import { StockData, PredictionData, MLModel } from '../types';

export const generateMockData = (symbol: string, timeframe: string): StockData[] => {
  const days = timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : timeframe === '6M' ? 180 : timeframe === '1Y' ? 365 : 730;
  const data: StockData[] = [];
  
  // Base prices for different stocks
  const basePrices: { [key: string]: number } = {
    'AAPL': 150,
    'GOOGL': 2800,
    'MSFT': 300,
    'AMZN': 3200,
    'TSLA': 800,
    'NVDA': 450,
    'META': 320,
    'NFLX': 500
  };
  
  let currentPrice = basePrices[symbol] || 100;
  const volatility = 0.02 + Math.random() * 0.02; // 2-4% daily volatility
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    // Generate realistic price movement
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const trendChange = Math.sin(i / 30) * 0.001; // Add some trend
    
    currentPrice *= (1 + randomChange + trendChange);
    
    const dayRange = currentPrice * (0.01 + Math.random() * 0.02);
    const open = currentPrice + (Math.random() - 0.5) * dayRange * 0.5;
    const close = currentPrice;
    const high = Math.max(open, close) + Math.random() * dayRange * 0.3;
    const low = Math.min(open, close) - Math.random() * dayRange * 0.3;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: Math.max(0.01, open),
      high: Math.max(0.01, high),
      low: Math.max(0.01, low),
      close: Math.max(0.01, close),
      volume: Math.floor(1000000 + Math.random() * 10000000)
    });
  }
  
  return data;
};

export const generatePredictions = (historicalData: StockData[], model: MLModel): PredictionData[] => {
  if (historicalData.length === 0) return [];
  
  const predictions: PredictionData[] = [];
  const lastPrice = historicalData[historicalData.length - 1].close;
  const recentPrices = historicalData.slice(-10).map(d => d.close);
  
  // Calculate trend
  const trend = (recentPrices[recentPrices.length - 1] - recentPrices[0]) / recentPrices[0];
  
  // Model-specific parameters
  const modelParams = {
    'LSTM': { volatility: 0.015, accuracy: 0.85, trendWeight: 0.7 },
    'Linear Regression': { volatility: 0.02, accuracy: 0.75, trendWeight: 0.9 },
    'Random Forest': { volatility: 0.018, accuracy: 0.8, trendWeight: 0.6 }
  };
  
  const params = modelParams[model];
  let currentPrediction = lastPrice;
  
  // Generate 30 days of predictions
  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Apply trend with some randomness
    const trendEffect = trend * params.trendWeight * (1 + (Math.random() - 0.5) * 0.3);
    const randomEffect = (Math.random() - 0.5) * 2 * params.volatility;
    const timeDecay = Math.pow(0.99, i); // Confidence decreases over time
    
    currentPrediction *= (1 + trendEffect * 0.1 + randomEffect);
    
    // Ensure price doesn't go negative
    currentPrediction = Math.max(0.01, currentPrediction);
    
    const baseConfidence = params.accuracy * timeDecay;
    const confidence = Math.max(0.3, Math.min(0.95, baseConfidence + (Math.random() - 0.5) * 0.1));
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      predicted: currentPrediction,
      confidence: confidence
    });
  }
  
  return predictions;
};