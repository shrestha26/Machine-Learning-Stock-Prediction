import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Stock } from '../types';

interface StockSelectorProps {
  selectedStock: string;
  onStockChange: (stock: string) => void;
}

const popularStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary' },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Discretionary' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Technology' },
  { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Communication Services' },
];

const StockSelector: React.FC<StockSelectorProps> = ({ selectedStock, onStockChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = popularStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStockData = popularStocks.find(stock => stock.symbol === selectedStock);

  return (
    <div className="relative bg-gray-800 rounded-xl p-4 border border-gray-700">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        <TrendingUp className="w-4 h-4 inline mr-2" />
        Select Stock
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-left hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex justify-between items-center">
          <div>
            <span className="font-medium text-white">{selectedStock}</span>
            {selectedStockData && (
              <p className="text-xs text-gray-400 truncate">{selectedStockData.name}</p>
            )}
          </div>
          <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 max-h-64 overflow-hidden">
          <div className="p-3 border-b border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => {
                  onStockChange(stock.symbol);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors focus:outline-none focus:bg-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-white">{stock.symbol}</span>
                    <p className="text-xs text-gray-400 truncate">{stock.name}</p>
                  </div>
                  <span className="text-xs text-blue-400 px-2 py-1 bg-blue-900/30 rounded">
                    {stock.sector}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSelector;