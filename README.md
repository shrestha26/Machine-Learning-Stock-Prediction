# Machine Learning Stock Prediction

This repository provides a comprehensive framework for predicting stock prices using various machine learning algorithms. The goal is to analyze historical stock data, apply data preprocessing and feature engineering techniques, and build predictive models to forecast future stock prices.

## Features

- Data collection from reliable financial data sources
- Data cleaning and preprocessing
- Exploratory data analysis (EDA) and visualization
- Feature engineering for improved predictive performance
- Implementation of multiple machine learning models:
  - Linear Regression
  - Random Forest
  - LSTM (Long Short-Term Memory networks)
  - Other popular algorithms
- Model evaluation and comparison
- Hyperparameter tuning
- Visualization of predictions vs. actual prices

## Project Structure

```
.
├── data/                 # Raw and processed data files
├── notebooks/            # Jupyter notebooks for EDA, modeling, etc.
├── src/                  # Source code for data loading, preprocessing, modeling
├── models/               # Saved trained models
├── requirements.txt      # Python dependencies
├── README.md             # Project documentation
└── ...                   # Other miscellaneous files
```

## Getting Started

### Prerequisites

- Python 3.7+
- pip

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/shrestha26/Machine-Learning-Stock-Prediction.git
    cd Machine-Learning-Stock-Prediction
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Usage

1. **Prepare Data**
   - Place your stock data CSV files in the `data/` folder.

2. **Run Notebooks or Scripts**
   - Explore the `notebooks/` directory for step-by-step analysis and model building.
   - Alternatively, use scripts in the `src/` folder for end-to-end execution.

3. **Train Models**
   - Follow the instructions in the notebooks or scripts to train and evaluate models.

4. **Prediction**
   - Use the trained models to predict future stock prices.

## Example

```python
from src.model import predict_stock_price

predictions = predict_stock_price('AAPL', model_type='lstm', days=30)
print(predictions)
```

## Results

Model performance metrics and prediction visualizations will be available in the `notebooks/` or `results/` folder.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [pandas](https://pandas.pydata.org/)
- [scikit-learn](https://scikit-learn.org/)
- [TensorFlow](https://www.tensorflow.org/)
- [Yahoo Finance API](https://finance.yahoo.com/)

---

*Happy Predicting!*
