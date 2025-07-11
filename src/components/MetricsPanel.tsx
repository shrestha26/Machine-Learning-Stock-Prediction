import React from 'react';
import { Target, TrendingUp, Activity, BarChart } from 'lucide-react';
import { PredictionData } from '../types';

interface MetricsPanelProps {
  predictions: PredictionData[];
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ predictions }) => {
  // Calculate mock metrics based on predictions
  const avgConfidence = predictions.length > 0 
    ? predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length 
    : 0;

  const metrics = [
    {
      label: 'Accuracy',
      value: `${(avgConfidence * 100).toFixed(1)}%`,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      label: 'Confidence',
      value: `${(avgConfidence * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      label: 'Volatility',
      value: `${(Math.random() * 20 + 5).toFixed(1)}%`,
      icon: Activity,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10'
    },
    {
      label: 'R² Score',
      value: (0.7 + Math.random() * 0.25).toFixed(3),
      icon: BarChart,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <h3 className="text-sm font-medium text-gray-300 mb-3">
        <Target className="w-4 h-4 inline mr-2" />
        Model Metrics
      </h3>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className={`${metric.bgColor} rounded-lg p-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-xs text-gray-300">{metric.label}</span>
              </div>
              <span className={`text-sm font-bold ${metric.color}`}>
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsPanel;