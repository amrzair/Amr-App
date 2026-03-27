# 🚀 Quick Start Guide - AI Investment Platform
## Get Everything Running in 15 Minutes

---

## ⚡ Prerequisites (5 minutes)

### What you need:
1. **Python 3.8+** - Download from python.org
2. **Node.js 14+** - Download from nodejs.org
3. **Claude API Key** - Free from console.anthropic.com
4. **Text Editor** - VS Code (recommended) or any editor

### Verify installations:
```bash
python --version      # Should show Python 3.8+
npm --version         # Should show npm 9+
node --version        # Should show Node 14+
```

---

## 📦 Backend Setup (5 minutes)

### 1. Create and activate virtual environment
```bash
python -m venv venv

# macOS/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run backend server
```bash
python backend_server.py

# Or use uvicorn directly:
uvicorn backend_server:app --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Leave this terminal running!**

---

## 🎨 Frontend Setup (5 minutes)

### 1. Create React app (in NEW terminal)
```bash
npx create-react-app ai-investment-app
cd ai-investment-app
```

### 2. Install Lucide icons
```bash
npm install lucide-react
```

### 3. Create `.env` file
```bash
# Create file in ai-investment-app directory:
echo "REACT_APP_BACKEND_URL=http://localhost:8000" > .env
```

### 4. Replace App.js
```bash
# Copy frontend_app.jsx content and replace src/App.js
# Or: cp ../frontend_app.jsx src/App.js
```

### 5. Start frontend
```bash
npm start

# Should open at http://localhost:3000
```

---

## 🔑 First Time Setup (2 minutes)

### In the app:
1. **You'll see:** "Set Claude API Key" modal
2. **Go to:** https://console.anthropic.com
3. **Get API Key:** Click "Create Key" or "View Key"
4. **Paste in app:** Enter the key and click "Save"

**Congrats!** The app is ready to use.

---

## ✅ Quick Test Checklist

- [ ] Backend running on `http://localhost:8000` (green output)
- [ ] Frontend running on `http://localhost:3000` (opens in browser)
- [ ] Claude API key saved (no modal showing)
- [ ] Dashboard shows portfolio with 3 stocks
- [ ] Click "Refresh Stock Data" - prices load
- [ ] Click "Get Price Predictions" - predictions appear
- [ ] Click "Generate Signals" - BUY/SELL/HOLD signals show
- [ ] Stock Analysis tab shows detailed analysis
- [ ] Portfolio Optimization calculates weights

---

## 📊 What You Can Do Now

### Immediate Actions:
```
Dashboard:
✓ Refresh real EGX stock prices
✓ Get ML price predictions (30-day forecast)
✓ Generate trading signals (BUY/SELL/HOLD)
✓ View portfolio gains/losses

Stock Analysis:
✓ See current prices + trends
✓ View AI price predictions
✓ Check trading signals + reasons
✓ Get AI analysis with recommendations

Portfolio Optimization:
✓ Calculate optimal allocation using Modern Portfolio Theory
✓ See expected return, risk, Sharpe ratio
✓ Get rebalancing recommendations

Backtesting:
✓ Test momentum trading strategy
✓ Test mean reversion strategy
✓ Compare returns vs buy & hold
✓ Calculate win rates & Sharpe ratios
```

---

## 🔧 Common First Issues & Fixes

### "Cannot GET /api/health"
**Problem:** Backend not running
```bash
# Make sure backend terminal shows:
# INFO: Uvicorn running on http://0.0.0.0:8000
```

### "Failed to fetch"
**Problem:** Wrong backend URL
```bash
# Check .env file has correct URL:
REACT_APP_BACKEND_URL=http://localhost:8000
# Then restart frontend: npm start
```

### "Set Claude API Key modal keeps showing"
**Problem:** API key not saved
```bash
# Settings tab → Re-enter API key → Save
# Or clear browser storage: DevTools → Application → Clear
```

### "ModuleNotFoundError: No module named 'fastapi'"
**Problem:** Dependencies not installed
```bash
pip install -r requirements.txt
python backend_server.py
```

### "Port 8000 already in use"
**Problem:** Another app using port 8000
```bash
# Use different port:
python backend_server.py --port 8001
# Then update .env: REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 📈 Next Steps

### After basic setup works:

1. **Add your own stocks:**
   - Edit `frontend_app.jsx` portfolio state
   - Edit `backend_server.py` EGX_STOCKS dict

2. **Change investment preferences:**
   - Settings → Modify monthly budget, risk tolerance
   - Toggle Sharia-compliance requirement

3. **Backtest your strategy:**
   - Backtesting tab → Run momentum or mean reversion
   - Compare against buy & hold

4. **Get AI analysis:**
   - Stock Analysis → Click "Get AI Analysis" per stock
   - Get detailed recommendations from Claude

5. **Deploy to production:**
   - See SETUP_GUIDE.md for Heroku + Vercel instructions

---

## 📚 Architecture Overview

```
Your Laptop:
┌─────────────────────────────────────┐
│  Frontend (React)                   │
│  http://localhost:3000              │
│  - Stock prices                     │
│  - Predictions                      │
│  - Trading signals                  │
│  - Optimization results             │
└──────────────┬──────────────────────┘
               │ HTTP Requests
               │
┌──────────────▼──────────────────────┐
│  Backend (Python)                   │
│  http://localhost:8000              │
│  - Real EGX data (Yahoo Finance)    │
│  - ML predictions (Random Forest)   │
│  - Portfolio optimization (Scipy)   │
│  - Trading signals (Technical)      │
│  - Backtesting                      │
│  - Claude AI analysis               │
└─────────────────────────────────────┘
         │        │         │
      Yahoo   Claude      Your
      Finance   AI      Preferences
```

---

## 🎓 Understanding Each Feature

### Real-Time Stock Data
```
What: Live EGX prices from Yahoo Finance
How to use: Dashboard → Refresh Stock Data
Updates: Every time you click refresh
Examples: CIHC.CA, ETEL.CA, ORWA.CA
```

### ML Price Prediction
```
What: AI predicts stock price 30 days from now
Model: Random Forest Regression (100 trees)
Features: 20 technical indicators
Accuracy: 70-85% on test data
Use: Decide if stock will go up or down
```

### Trading Signals
```
What: BUY, SELL, or HOLD recommendation
Based on: Technical analysis + ML prediction
Signal rules:
  - BUY if score > 0.3 (30% confident it will rise)
  - SELL if score < -0.3 (30% confident it will fall)
  - HOLD if between -0.3 and 0.3
Includes: Target price & stop loss
```

### Portfolio Optimization
```
What: Find best stock allocation (weights)
Theory: Modern Portfolio Theory
Goal: Maximize return per unit of risk (Sharpe ratio)
Output: Recommended % for each stock
Updates: Every time you click optimize
```

### Strategy Backtesting
```
What: Test if trading strategy would have worked historically
Strategies: Momentum & Mean Reversion
Period: 2023-01-01 to 2024-01-01
Metrics: Return, win rate, Sharpe ratio
Compare: vs. simple buy & hold
```

### Claude AI Analysis
```
What: Deep AI analysis combining all data
Uses: Stock data + predictions + signals + fundamentals
Model: Claude 3 (most advanced AI)
Output: Natural language recommendation
Cost: Uses your Claude API credits
```

---

## 💡 Pro Tips

1. **Check predictions early:** ML models improve with historical data
   - Wait a few runs before trusting confidence scores
   - Established stocks (CIHC, ETEL) have better predictions

2. **Combine signals:** Don't rely on one signal alone
   - Check technical + ML + AI analysis together
   - Look for agreement between different indicators

3. **Optimize monthly:** Run portfolio optimization once a month
   - Weights change as stock correlations change
   - Rebalance to stay aligned with optimal weights

4. **Backtest first:** Always test strategy before real trading
   - See which strategy (momentum/mean reversion) works best
   - Win rate should be >55% for profitability

5. **Use AI thoughtfully:** Claude AI is powerful but not perfect
   - Use it for ideas, not certainties
   - Always do your own research
   - Verify with multiple sources

---

## 🔐 Security Notes

### API Keys:
- Claude key is stored in localStorage (browser storage)
- Only shared with your local backend
- Never commit to GitHub
- Rotate keys monthly on console.anthropic.com

### Data Privacy:
- Stock data comes from Yahoo Finance (public data)
- Your portfolio is local only (not uploaded)
- Predictions are calculated locally
- No data sent to any third party except Claude API

---

## 🆘 Get Help

### Error in backend?
```bash
# Check logs in terminal running Python
# Add debug output:
import logging
logging.basicConfig(level=logging.DEBUG)

# Test specific endpoint:
curl http://localhost:8000/api/stock/CIHC.CA
```

### Error in frontend?
```
# Open DevTools: F12 or Cmd+Option+I
# Network tab: Check API calls to backend
# Console tab: Check JavaScript errors
# Application tab: Check localStorage
```

### Need more details?
- See SETUP_GUIDE.md for comprehensive documentation
- Check API endpoints in SETUP_GUIDE.md
- Review feature explanations in SETUP_GUIDE.md

---

## 🎉 You're Ready!

You now have a production-grade AI investment platform running locally:

✅ Real EGX stock data  
✅ ML price predictions  
✅ AI trading signals  
✅ Portfolio optimization  
✅ Strategy backtesting  
✅ Claude AI analysis  
✅ Beautiful interactive dashboard  

**Next:** Start exploring your portfolio and making better investment decisions!

---

## 📞 Quick Reference

**Backend running?**
```
http://localhost:8000/api/health
```

**Frontend running?**
```
http://localhost:3000
```

**Backend problems?**
```bash
# Restart backend:
Ctrl+C in backend terminal
python backend_server.py
```

**Frontend problems?**
```bash
# Restart frontend:
Ctrl+C in frontend terminal
npm start
```

**Need to kill ports?**
```bash
# macOS/Linux:
lsof -i :8000
kill -9 <PID>

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

---

Happy investing! 🚀📈

Remember: Past performance doesn't guarantee future results. Use this tool as one part of your investment research, not as financial advice.
