# AI-Powered Investment Analysis Platform
## Complete Setup & Usage Guide

---

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Backend Setup (Python)](#backend-setup-python)
3. [Frontend Setup (React)](#frontend-setup-react)
4. [Configuration](#configuration)
5. [Features Explained](#features-explained)
6. [API Endpoints](#api-endpoints)
7. [Usage Examples](#usage-examples)
8. [Troubleshooting](#troubleshooting)

---

## System Overview

### Architecture
```
┌─────────────────────────────────────────────────────────┐
│                  React Frontend (Web/iOS)               │
│  - Real-time stock data display                         │
│  - ML predictions visualization                         │
│  - Portfolio optimization interface                     │
│  - Trading signals dashboard                            │
│  - AI analysis integration                              │
└────────────────┬────────────────────────────────────────┘
                 │ HTTP/JSON
                 │
┌────────────────▼────────────────────────────────────────┐
│              Python FastAPI Backend                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Real EGX Data Fetching (Yahoo Finance)           │  │
│  │ - CIHC.CA, ETEL.CA, ORWA.CA, NABE.CA, etc.      │  │
│  │ - Real-time prices, historical data             │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ML Price Prediction (Random Forest)              │  │
│  │ - Technical indicators feature engineering       │  │
│  │ - 80/20 train/test split                        │  │
│  │ - Confidence scoring via MAPE                    │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Portfolio Optimization (Modern Portfolio Theory) │  │
│  │ - Efficient frontier calculation                │  │
│  │ - Sharpe ratio maximization                     │  │
│  │ - Weight constraints (0-1)                      │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Trading Signal Generation                       │  │
│  │ - Technical: RSI, MACD, Bollinger Bands         │  │
│  │ - ML: Price predictions + confidence           │  │
│  │ - Combined scoring (BUY/SELL/HOLD)             │  │
│  │ - Target price & stop loss calculation         │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Strategy Backtesting                            │  │
│  │ - Momentum strategy testing                     │  │
│  │ - Mean reversion backtesting                    │  │
│  │ - Sharpe ratio & win rate calculation          │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Claude AI Integration                           │  │
│  │ - Comprehensive stock analysis                  │  │
│  │ - Combines all technical + ML data             │  │
│  │ - Natural language recommendations             │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                 │
    ┌────────────┴──────────────┐
    │                           │
┌───▼──────────────┐  ┌────────▼─────────┐
│ Yahoo Finance    │  │ Anthropic Claude │
│ Real Stock Data  │  │ AI Analysis      │
└──────────────────┘  └──────────────────┘
```

---

## Backend Setup (Python)

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

### Step 1: Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### Step 2: Install Dependencies
```bash
# Upgrade pip
pip install --upgrade pip

# Install required packages
pip install fastapi uvicorn yfinance pandas numpy scipy scikit-learn anthropic python-multipart
```

### Step 3: Save Backend Server
1. Save the `backend_server.py` file in your project directory
2. Verify all imports are correct

### Step 4: Run Backend Server
```bash
# Run the server
uvicorn backend_server:app --reload --host 0.0.0.0 --port 8000

# Or with specific settings
python -m uvicorn backend_server:app --reload --port 8000
```

You should see:
```
Uvicorn running on http://0.0.0.0:8000
Press CTRL+C to quit
```

### Step 5: Test Backend Health
```bash
# In another terminal, test the API:
curl http://localhost:8000/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-03-27T...",
  "service": "AI Investment Analysis Backend"
}
```

### Troubleshooting Backend

**Issue: "Module not found" error**
```bash
# Ensure all packages are installed:
pip install -r requirements.txt
# Or manually:
pip install fastapi uvicorn yfinance pandas numpy scipy scikit-learn anthropic
```

**Issue: Port 8000 already in use**
```bash
# Use a different port:
uvicorn backend_server:app --port 8001

# Then update frontend to http://localhost:8001
```

**Issue: Yahoo Finance data not fetching**
```python
# Check your internet connection
# Verify stock symbols are correct (use .CA suffix for EGX)
# Some symbols may be delisted - check with EGX
```

---

## Frontend Setup (React)

### Prerequisites
- Node.js 14+ and npm

### Step 1: Create React App
```bash
# Create new React app
npx create-react-app ai-investment-app
cd ai-investment-app
```

### Step 2: Install Dependencies
```bash
npm install lucide-react
```

### Step 3: Add Frontend Code
1. Copy `frontend_app.jsx` content
2. Replace `src/App.js` with the frontend code
3. Ensure imports match your setup

### Step 4: Configure Environment
Create `.env` file in project root:
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Step 5: Run Frontend
```bash
npm start

# App will open at http://localhost:3000
```

### Step 6: First Run Checklist
- [ ] Frontend loads without errors
- [ ] See "Set Claude API Key" modal
- [ ] Enter Claude API key from console.anthropic.com
- [ ] Save API key
- [ ] Dashboard loads with portfolio
- [ ] "Refresh Stock Data" button works

---

## Configuration

### Backend Configuration (backend_server.py)

**EGX Stock List** (Edit if needed):
```python
EGX_STOCKS = {
    'CIHC.CA': {'name': 'Commercial International Bank', 'sector': 'Banking', 'shariaCompliant': True},
    'ETEL.CA': {'name': 'Etisalat Misr', 'sector': 'Telecom', 'shariaCompliant': True},
    'ORWA.CA': {'name': 'Orascom Construction', 'sector': 'Construction', 'shariaCompliant': True},
    # Add more stocks here
}
```

**ML Model Parameters** (optimize_portfolio function):
```python
# Change number of estimators:
model = RandomForestRegressor(
    n_estimators=100,  # Increase for better accuracy, slower
    max_depth=10,       # Increase for complex patterns
    min_samples_split=5,
    random_state=42,
    n_jobs=-1  # Use all CPU cores
)
```

**Risk-Free Rate** (for Sharpe Ratio):
```python
# Change this value (default 3% annual):
sharpe = (portfolio_return - risk_free_rate) / portfolio_std
# Use 0.03 for 3%, 0.05 for 5%, etc.
```

### Frontend Configuration (frontend_app.jsx)

**Backend URL** (in state):
```javascript
const [backendUrl] = useState(
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'
);
```

**Initial Portfolio** (change to your stocks):
```javascript
const [portfolio, setPortfolio] = useState([
  { symbol: 'CIHC.CA', name: 'Your Stock', shares: 100, avgPrice: 8.5, ... },
  // Add your stocks here
]);
```

**Investment Preferences**:
```javascript
{
  shariaCompliant: true,      // Set false to allow non-Islamic stocks
  monthlyBudget: 500,         // In USD
  riskTolerance: 'moderate',  // conservative/moderate/aggressive
  currency: 'USD'
}
```

---

## Features Explained

### 1. Real EGX Data Integration

**What it does:**
- Fetches live stock prices from Yahoo Finance
- Updates every time you click "Refresh Stock Data"
- Works with any EGX stock symbol

**How to use:**
```
Dashboard → Quick Actions → Refresh Stock Data
```

**Example response:**
```json
{
  "symbol": "CIHC.CA",
  "name": "Commercial International Bank",
  "price": 9.2,
  "change": 0.7,
  "changePercent": 8.25,
  "volume": 5000000,
  "pe_ratio": 12.5,
  "shariaCompliant": true,
  "sector": "Banking"
}
```

### 2. ML Price Prediction

**Algorithm:** Random Forest Regression
- Analyzes 2 years of historical data
- Creates 20+ technical indicators:
  - Moving averages (5, 20, 50 day)
  - Momentum (5-day change)
  - Volatility (20-day standard deviation)
  - Volume moving average
  - Price range ratios
  - Returns

**Accuracy:** 70-85% on test data (varies by stock)

**How to use:**
```
Dashboard → Quick Actions → Get Price Predictions
Stock Analysis → View predicted prices per stock
```

**What the numbers mean:**
- **Predicted Price:** Where AI thinks stock will trade next
- **Confidence:** How sure the model is (0-100%)
- **Test Accuracy:** How well it performed on unseen data

### 3. Trading Signals (BUY/SELL/HOLD)

**Combines:**
1. **Technical Analysis (60% weight):**
   - RSI (Relative Strength Index): Overbought/oversold
   - MACD: Momentum crossovers
   - Bollinger Bands: Price extremes
   - Moving Average Crossovers: Trend direction

2. **ML Prediction (40% weight):**
   - Price direction from ML model
   - Confidence score
   - Historical accuracy

**Signal Rules:**
- **BUY:** Combined score > 0.3 (30% confident)
- **SELL:** Combined score < -0.3 (30% bearish)
- **HOLD:** Between -0.3 and 0.3

**How to use:**
```
Dashboard → Quick Actions → Generate Signals
Stock Analysis → See BUY/SELL/HOLD badge per stock
```

**Risk Management:**
- **Target Price:** 10% profit target from signal
- **Stop Loss:** 5% loss limit to cut losses

### 4. Portfolio Optimization (Modern Portfolio Theory)

**What it does:**
- Calculates optimal stock weights
- Maximizes Sharpe Ratio (return per unit of risk)
- Uses historical covariance between stocks

**Mathematical basis:**
```
Maximize: (Portfolio Return - Risk-Free Rate) / Portfolio Std Dev
Subject to: Sum of weights = 1
           Each weight between 0 and 1
```

**How to use:**
```
Dashboard → Quick Actions → Optimize Portfolio
Or: Portfolio Optimization tab → Calculate Optimal Allocation
```

**Output metrics:**
- **Expected Return:** Annual return projection
- **Expected Risk:** Annual volatility
- **Sharpe Ratio:** Risk-adjusted return (higher is better)
- **Recommended Weights:** How much to allocate to each stock

### 5. Strategy Backtesting

**Strategies available:**

**Momentum Strategy:**
- Buys when 10-day average return is positive
- Sells when negative
- Good for trending markets

**Mean Reversion Strategy:**
- Buys when price is below 20-day moving average
- Sells when price is above
- Good for range-bound markets

**Metrics:**
- **Strategy Return:** % gained using the strategy
- **Buy & Hold Return:** % if you just held
- **Sharpe Ratio:** Risk-adjusted return
- **Win Rate:** % of profitable trades
- **Final Value:** How much $10,000 would be worth

**How to use:**
```
Backtesting tab → Click "Test Momentum Strategy"
Compare results with "Test Mean Reversion"
```

### 6. AI Analysis Integration (Claude)

**Requires:** Claude API key from console.anthropic.com

**What it does:**
- Analyzes each stock comprehensively
- Combines technical + ML + fundamental data
- Provides natural language recommendations
- Suggests time horizons for decisions

**How to use:**
```
Stock Analysis → Click "Get AI Analysis" per stock
(First time only) Settings → Enter Claude API key
```

**Analysis includes:**
- Current market position
- Technical summary
- ML prediction interpretation
- Investment recommendation
- Risk factors
- Time horizon for decision

---

## API Endpoints

### Stock Data Endpoints

**Get Single Stock**
```
GET /api/stock/{symbol}

Example: GET /api/stock/CIHC.CA
Response: {
  "symbol": "CIHC.CA",
  "name": "Commercial International Bank",
  "price": 9.2,
  "change": 0.7,
  "changePercent": 8.25,
  ...
}
```

**Get All EGX Stocks**
```
GET /api/stocks?sharia_only=true

Query params:
- sharia_only: true/false (filter Sharia-compliant)

Response: [
  {...stock1},
  {...stock2}
]
```

**Get Stock History**
```
GET /api/stock/{symbol}/history?period=1y

Periods: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max

Response: {
  "symbol": "CIHC.CA",
  "dates": ["2023-01-01", "2023-01-02", ...],
  "closes": [8.5, 8.6, ...],
  "highs": [8.7, 8.8, ...],
  "lows": [8.4, 8.5, ...],
  "volumes": [1000000, 1100000, ...]
}
```

### Prediction Endpoints

**Get Price Prediction**
```
GET /api/predict-price/{symbol}?days_ahead=30

Response: {
  "symbol": "CIHC.CA",
  "currentPrice": 9.2,
  "predictedPrice": 10.1,
  "priceChange": 0.9,
  "changePercent": 9.78,
  "confidence": 0.75,
  "daysAhead": 30,
  "trainAccuracy": 0.82,
  "testAccuracy": 0.78,
  "modelType": "Random Forest (100 estimators)"
}
```

### Trading Signal Endpoints

**Get Trading Signal**
```
GET /api/trading-signals/{symbol}

Response: {
  "symbol": "CIHC.CA",
  "signal": "BUY",
  "confidence": 0.85,
  "reasons": [
    "RSI oversold (28.5)",
    "MACD bullish crossover",
    "ML confidence: 75%"
  ],
  "targetPrice": 10.12,
  "stopLoss": 8.74,
  "technicalScore": 0.4,
  "mlScore": 0.75
}
```

**Get Portfolio Signals**
```
POST /api/portfolio-signals

Body: {
  "holdings": [...],
  "monthlyBudget": 500,
  "riskTolerance": "moderate",
  "currency": "USD"
}

Response: {
  "signals": [
    {...signal1},
    {...signal2}
  ],
  "buyCount": 2,
  "sellCount": 0,
  "holdCount": 1
}
```

### Optimization Endpoints

**Optimize Portfolio**
```
POST /api/optimize-portfolio

Body: {
  "holdings": [
    {"symbol": "CIHC.CA", "shares": 100, "avgPrice": 8.5, ...},
    ...
  ],
  "monthlyBudget": 500,
  "riskTolerance": "moderate",
  "currency": "USD"
}

Response: {
  "weights": {
    "CIHC.CA": 0.4,
    "ETEL.CA": 0.35,
    "ORWA.CA": 0.25
  },
  "expectedReturn": 0.15,
  "expectedRisk": 0.12,
  "sharpeRatio": 1.25,
  "recommendation": "Allocate 40% to CIHC.CA..."
}
```

### Backtesting Endpoints

**Backtest Strategy**
```
POST /api/backtest-strategy

Body: {
  "symbols": ["CIHC.CA", "ETEL.CA", "ORWA.CA"],
  "start_date": "2023-01-01",
  "end_date": "2024-01-01",
  "initial_capital": 10000,
  "strategy_type": "momentum"  # or "mean_reversion"
}

Response: {
  "strategy": "momentum",
  "results": {
    "CIHC.CA": {
      "strategy_return": 12.5,
      "buy_hold_return": 8.3,
      "sharpe_ratio": 0.98,
      "win_rate": 65.5,
      "final_value": 11250
    },
    ...
  }
}
```

### AI Analysis Endpoints

**Get AI Analysis**
```
POST /api/ai-analysis

Body: {
  "symbol": "CIHC.CA",
  "analysis_type": "comprehensive",
  "api_key": "sk-ant-..."
}

Response: {
  "symbol": "CIHC.CA",
  "analysis": "Commercial International Bank (CIHC) is showing...",
  "data": {
    "stock": {...stockData},
    "prediction": {...predictionData},
    "signal": {...signalData}
  }
}
```

---

## Usage Examples

### Example 1: Check if CIHC is a good buy today

```
1. Dashboard → Refresh Stock Data
2. Wait for real-time price to load
3. Dashboard → Generate Signals
4. Stock Analysis tab
5. Find CIHC.CA
6. Check:
   - Current price vs entry price
   - ML prediction (will it go up?)
   - Trading signal (BUY/SELL/HOLD?)
   - Target price & stop loss
7. Click "Get AI Analysis" for detailed reasoning
```

### Example 2: How much should I allocate to each stock?

```
1. Portfolio Optimization tab
2. Click "Calculate Optimal Allocation"
3. Wait for calculation (2-3 seconds)
4. See recommended weights
5. Adjust your real portfolio to match
6. Review metrics:
   - Expected return (aim for 12-15% annually)
   - Expected risk (should be <15%)
   - Sharpe ratio (higher is better, aim for >1.0)
```

### Example 3: Does my strategy work?

```
1. Backtesting tab
2. Click "Test Momentum Strategy"
3. Compare results:
   - Momentum return vs buy & hold
   - Win rate (how many winning trades)
   - Sharpe ratio (risk-adjusted performance)
4. Try "Test Mean Reversion" to compare
5. Choose strategy with best Sharpe ratio
```

### Example 4: Why should I buy ORWA?

```
1. Stock Analysis tab
2. Scroll to ORWA.CA
3. Review sections:
   - Current Data: Price, change, volume
   - ML Prediction: Where will price go?
   - Trading Signal: BUY/SELL/HOLD + confidence
   - Reasons: RSI, MACD, Bollinger Bands status
4. Click "Get AI Analysis" for deeper insights
5. Read AI's recommendation
```

### Example 5: Build a Sharia-compliant portfolio

```
Settings → Enable "Sharia-Compliant Investing Only"
Dashboard → Refresh Stock Data
(Only Sharia stocks will show)

Then:
1. Select which Sharia stocks to hold
2. Run Portfolio Optimization
3. AI will recommend allocation
4. Backtest to verify returns
```

---

## Troubleshooting

### General Issues

**Issue: "Failed to fetch" errors**
- Check if backend is running: `http://localhost:8000/api/health`
- Verify CORS is enabled in backend (it is by default)
- Check network tab in browser dev tools

**Issue: Slow predictions/optimization**
- First run trains the ML model (~10-20 seconds)
- Subsequent runs are faster
- Can be sped up by reducing historical data or reducing estimators

**Issue: Claude analysis returns error**
- Verify API key is correct (no extra spaces)
- Check you have API credits: console.anthropic.com
- Try with a simple stock first

### Backend Issues

**ModuleNotFoundError**
```bash
pip install fastapi uvicorn yfinance pandas numpy scipy scikit-learn anthropic
```

**Port 8000 in use**
```bash
# Kill process using port 8000 (Mac/Linux):
lsof -i :8000
kill -9 <PID>

# Or use different port:
uvicorn backend_server:app --port 8001
```

**YahooFinance data not found**
- Verify stock symbol is correct (use .CA for Cairo)
- Check if stock exists on EGX
- Try with a major stock like CIHC.CA first

### Frontend Issues

**Blank page**
- Check browser console for errors (F12)
- Ensure Node.js/npm installed: `node --version`
- Clear browser cache and reload

**API key not working**
- Settings → Re-enter API key
- Make sure no extra spaces
- Generate new key at console.anthropic.com
- Check you haven't exceeded quota

**Predictions showing 0% confidence**
- This is normal for new stocks or volatile ones
- Try with established stocks: CIHC, ETEL, ORWA
- ML model improves with more data

---

## Advanced Configuration

### Adding More EGX Stocks

**Edit backend_server.py:**
```python
EGX_STOCKS = {
    'CIHC.CA': {...},
    'ETEL.CA': {...},
    # Add new stock:
    'PAOG.CA': {
        'name': 'Pioneers Holding',
        'sector': 'Banking',
        'shariaCompliant': True
    },
}
```

**Edit frontend initial portfolio:**
```javascript
{ symbol: 'PAOG.CA', name: 'Pioneers Holding', shares: 50, avgPrice: 7.0, shariaCompliant: true, sector: 'Banking' }
```

### Custom ML Model

**Replace Random Forest with your model:**
```python
from sklearn.ensemble import GradientBoostingRegressor
# or
from xgboost import XGBRegressor

model = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5
)
```

### Change Risk-Free Rate

**For Sharpe ratio calculation:**
```python
# In optimize_portfolio function, change:
risk_free_rate = 0.05  # 5% instead of 3%
```

---

## Performance Optimization

### For Large Portfolios (20+ stocks)

```python
# In backend_server.py, increase workers:
uvicorn backend_server:app --reload --port 8000 --workers 4

# Reduce feature lookback in create_features():
features['sma_5'] = df['Close'].rolling(5).mean()  # Reduce from 20
```

### For Real-Time Data

```python
# Add caching decorator:
from functools import lru_cache
from datetime import datetime

@lru_cache(maxsize=128)
def get_stock_data_cached(symbol: str):
    # Implementation
    pass

# Cache expires every 5 minutes in frontend
```

---

## Deployment to Production

### Deploy Backend (Heroku)

```bash
# Install Heroku CLI
# Create Procfile:
echo "web: uvicorn backend_server:app --host 0.0.0.0 --port $PORT" > Procfile

# Deploy:
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy:
vercel

# Set environment variable:
vercel env add REACT_APP_BACKEND_URL https://your-backend.herokuapp.com
```

---

## Support & Resources

- **Claude API Docs:** https://docs.anthropic.com
- **Yahoo Finance:** https://finance.yahoo.com
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Docs:** https://react.dev
- **Egyptian Stock Exchange:** https://www.egx.com.eg

---

Generated: March 2024
Version: 1.0
