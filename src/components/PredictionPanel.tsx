import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Target, AlertTriangle } from 'lucide-react';
import { PredictionData, StockData, MLModel } from '../types';

interface PredictionPanelProps {
  selectedStock: string;
  selectedModel: MLModel;
  predictions: PredictionData[];
  stockData: StockData[];
}

const PredictionPanel: React.FC<PredictionPanelProps> = ({
  selectedStock,
  selectedModel,
  predictions,
  stockData
}) => {
  const currentPrice = stockData[stockData.length - 1]?.close || 0;
  const nextPrediction = predictions[0];
  const weekPrediction = predictions[6];
  const monthPrediction = predictions[29];

  const formatPrediction = (prediction: PredictionData | undefined, label: string) => {
    if (!prediction) return null;
    
    const change = prediction.predicted - currentPrice;
    const percentChange = (change / currentPrice) * 100;
    const isPositive = change >= 0;
    
    return (
      <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">{label}</span>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            ${prediction.predicted.toFixed(2)}
          </span>
          <div className="text-xs text-gray-400">
            {(prediction.confidence * 100).toFixed(1)}% confidence
          </div>
        </div>
        
        <div className="mt-2 bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${prediction.confidence * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">Predictions</h3>
        </div>
        
        <div className="space-y-4">
          {formatPrediction(nextPrediction, 'Next Day')}
          {formatPrediction(weekPrediction, '1 Week')}
          {formatPrediction(monthPrediction, '1 Month')}
        </div>
      </div>

      {/* Model Info */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold">Analysis Details</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Model:</span>
            <span className="text-white font-medium">{selectedModel}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Symbol:</span>
            <span className="text-white font-medium">{selectedStock}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Data Points:</span>
            <span className="text-white font-medium">{stockData.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Predictions:</span>
            <span className="text-white font-medium">{predictions.length}</span>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-amber-900/20 border border-amber-600/20 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-amber-400">Risk Assessment</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-amber-200">Volatility Risk:</span>
            <span className="text-amber-400 font-medium">
              {Math.random() > 0.5 ? 'Medium' : 'High'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-amber-200">Market Risk:</span>
            <span className="text-amber-400 font-medium">
              {Math.random() > 0.3 ? 'Medium' : 'Low'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-amber-200">Prediction Risk:</span>
            <span className="text-amber-400 font-medium">
              {predictions.length > 0 && predictions[0]?.confidence > 0.7 ? 'Low' : 'Medium'}
            </span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-amber-800/20 rounded-lg">
          <p className="text-xs text-amber-200">
            Remember: Past performance does not guarantee future results. 
            Use predictions as one factor among many in your analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionPanel;