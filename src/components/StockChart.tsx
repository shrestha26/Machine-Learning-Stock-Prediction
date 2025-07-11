import React from 'react';
import { StockData, PredictionData } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockChartProps {
  data: StockData[];
  predictions: PredictionData[];
  isLoading: boolean;
}

const StockChart: React.FC<StockChartProps> = ({ data, predictions, isLoading }) => {
  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const allData = [...data];
  const maxPrice = Math.max(...allData.map(d => d.high), ...predictions.map(p => p.predicted));
  const minPrice = Math.min(...allData.map(d => d.low), ...predictions.map(p => p.predicted));
  const priceRange = maxPrice - minPrice;
  
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = 40;

  const getY = (price: number) => {
    return chartHeight - padding - ((price - minPrice) / priceRange) * (chartHeight - 2 * padding);
  };

  const getX = (index: number, totalPoints: number) => {
    return padding + (index / (totalPoints - 1)) * (chartWidth - 2 * padding);
  };

  // Create SVG path for historical data
  const historicalPath = data.map((point, index) => {
    const x = getX(index, data.length);
    const y = getY(point.close);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Create SVG path for predictions
  const predictionPath = predictions.map((point, index) => {
    const x = getX(data.length - 1 + index, data.length + predictions.length - 1);
    const y = getY(point.predicted);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const currentPrice = data[data.length - 1]?.close || 0;
  const predictedPrice = predictions[predictions.length - 1]?.predicted || 0;
  const priceChange = predictedPrice - currentPrice;
  const percentChange = (priceChange / currentPrice) * 100;

  return (
    <div className="space-y-4">
      {/* Price Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Current Price</p>
          <p className="text-lg font-bold">${currentPrice.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Predicted Price</p>
          <p className="text-lg font-bold">${predictedPrice.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Change</p>
          <div className="flex items-center space-x-1">
            {priceChange >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <p className={`text-lg font-bold ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Change %</p>
          <p className={`text-lg font-bold ${percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="w-full h-auto">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#374151" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Historical data line */}
          <path
            d={historicalPath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          
          {/* Prediction line */}
          {predictions.length > 0 && (
            <path
              d={predictionPath}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="drop-shadow-sm"
            />
          )}
          
          {/* Data points */}
          {data.slice(-30).map((point, index) => (
            <circle
              key={index}
              cx={getX(Math.max(0, data.length - 30) + index, data.length)}
              cy={getY(point.close)}
              r="3"
              fill="#3B82F6"
              className="hover:r-5 transition-all cursor-pointer"
            >
              <title>{`${point.date}: $${point.close.toFixed(2)}`}</title>
            </circle>
          ))}
          
          {/* Prediction points */}
          {predictions.map((point, index) => (
            <circle
              key={index}
              cx={getX(data.length - 1 + index, data.length + predictions.length - 1)}
              cy={getY(point.predicted)}
              r="3"
              fill="#10B981"
              className="hover:r-5 transition-all cursor-pointer"
            >
              <title>{`${point.date}: $${point.predicted.toFixed(2)} (${(point.confidence * 100).toFixed(1)}% confidence)`}</title>
            </circle>
          ))}
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const price = minPrice + ratio * priceRange;
            const y = getY(price);
            return (
              <g key={ratio}>
                <line x1={padding} y1={y} x2={padding - 5} y2={y} stroke="#9CA3AF" strokeWidth="1" />
                <text x={padding - 10} y={y + 4} textAnchor="end" fill="#9CA3AF" fontSize="12">
                  ${price.toFixed(0)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default StockChart;