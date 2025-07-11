import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Brain, Target, Calendar, Search, RefreshCw, User } from 'lucide-react';
import StockChart from './components/StockChart';
import PredictionPanel from './components/PredictionPanel';
import StockSelector from './components/StockSelector';
import ModelSelector from './components/ModelSelector';
import MetricsPanel from './components/MetricsPanel';
import { generateMockData, generatePredictions } from './utils/dataGenerator';
import { StockData, PredictionData, MLModel } from './types';

function App() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [selectedModel, setSelectedModel] = useState<MLModel>('LSTM');
  const [timeframe, setTimeframe] = useState('1Y');
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadStockData();
  }, [selectedStock, timeframe]);

  useEffect(() => {
    if (stockData.length > 0) {
      generatePredictionsData();
    }
  }, [stockData, selectedModel]);

  const loadStockData = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = generateMockData(selectedStock, timeframe);
    setStockData(data);
    setIsLoading(false);
  };

  const generatePredictionsData = async () => {
    const predictionData = generatePredictions(stockData, selectedModel);
    setPredictions(predictionData);
  };

  const refreshData = () => {
    loadStockData();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ML Stock Predictor</h1>
              <p className="text-gray-400 text-sm">Advanced Machine Learning Stock Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <User className="w-4 h-4" />
              <span>Created by <span className="text-blue-400 font-medium">Shrestha Behera</span></span>
            </div>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <StockSelector 
            selectedStock={selectedStock}
            onStockChange={setSelectedStock}
          />
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Time Period
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
              <option value="2Y">2 Years</option>
            </select>
          </div>
          <MetricsPanel predictions={predictions} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="xl:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-semibold">
                    {selectedStock} Stock Analysis
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Historical</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Predicted</span>
                </div>
              </div>
              
              <StockChart 
                data={stockData} 
                predictions={predictions}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Prediction Panel */}
          <div className="xl:col-span-1">
            <PredictionPanel
              selectedStock={selectedStock}
              selectedModel={selectedModel}
              predictions={predictions}
              stockData={stockData}
            />
          </div>
        </div>

        {/* Model Information */}
        <div className="mt-6 bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold">Model Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-blue-400 mb-2">LSTM Neural Network</h4>
              <p className="text-sm text-gray-300">
                Long Short-Term Memory networks excel at capturing long-term dependencies in sequential data, making them ideal for time series prediction.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-green-400 mb-2">Linear Regression</h4>
              <p className="text-sm text-gray-300">
                A simple yet effective approach that models the relationship between stock prices and time using linear equations.
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-amber-400 mb-2">Random Forest</h4>
              <p className="text-sm text-gray-300">
                An ensemble method that combines multiple decision trees to improve prediction accuracy and reduce overfitting.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-900/20 border border-amber-600/20 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-600 p-1 rounded-full flex-shrink-0 mt-0.5">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div>
              <h4 className="font-medium text-amber-400 mb-1">Investment Disclaimer</h4>
              <p className="text-sm text-amber-200">
                This tool is for educational and demonstration purposes only. Stock predictions are highly uncertain and should not be used as the sole basis for investment decisions. Always consult with financial professionals and conduct thorough research before making investment choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;