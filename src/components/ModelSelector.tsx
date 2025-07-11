import React from 'react';
import { Brain } from 'lucide-react';
import { MLModel } from '../types';

interface ModelSelectorProps {
  selectedModel: MLModel;
  onModelChange: (model: MLModel) => void;
}

const models: { value: MLModel; label: string; description: string; color: string }[] = [
  {
    value: 'LSTM',
    label: 'LSTM Neural Network',
    description: 'Deep learning approach for sequential data',
    color: 'text-blue-400'
  },
  {
    value: 'Linear Regression',
    label: 'Linear Regression',
    description: 'Statistical linear modeling',
    color: 'text-green-400'
  },
  {
    value: 'Random Forest',
    label: 'Random Forest',
    description: 'Ensemble learning method',
    color: 'text-amber-400'
  }
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        <Brain className="w-4 h-4 inline mr-2" />
        ML Model
      </label>
      
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value as MLModel)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {models.map(model => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
      
      <div className="mt-2">
        {models.map(model => (
          selectedModel === model.value && (
            <p key={model.value} className={`text-xs ${model.color}`}>
              {model.description}
            </p>
          )
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;