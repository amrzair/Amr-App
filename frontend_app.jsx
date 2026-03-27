import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Plus, CheckCircle, Clock, BookOpen, Zap, Brain, Target, BarChart3, MessageSquare, Settings, Home, Menu, X, Send, TrendingUp, DollarSign, Shield, PieChart, AlertCircle, Filter, LineChart, Activity, RefreshCw, Zap as ZapIcon } from 'lucide-react';

const AIInvestmentApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendUrl] = useState(process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000');
  const [apiKey, setApiKey] = useState(localStorage.getItem('claudeApiKey') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(!apiKey);
  
  // Portfolio and stocks
  const [portfolio, setPortfolio] = useState([
    { symbol: 'CIHC.CA', name: 'Commercial International Bank', shares: 100, avgPrice: 8.5, shariaCompliant: true, sector: 'Banking' },
    { symbol: 'ETEL.CA', name: 'Etisalat Misr', shares: 50, avgPrice: 12.0, shariaCompliant: true, sector: 'Telecom' },
    { symbol: 'ORWA.CA', name: 'Orascom Construction', shares: 75, avgPrice: 450, shariaCompliant: true, sector: 'Construction' }
  ]);
  const [stocksData, setStocksData] = useState({});
  const [predictions, setPredictions] = useState({});
  const [tradingSignals, setTradingSignals] = useState({});
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [backtestResults, setBacktestResults] = useState(null);
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [loadingPredictions, setLoadingPredictions] = useState(false);
  const [loadingSignals, setLoadingSignals] = useState(false);
  const [loadingOptimization, setLoadingOptimization] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [analysisLoading, setAnalysisLoading] = useState({});

  // Fetch stock data
  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(`${backendUrl}/api/stock/${symbol}`);
      const data = await response.json();
      setStocksData(prev => ({ ...prev, [symbol]: data }));
      return data;
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error);
    }
  };

  // Fetch all portfolio stocks
  const fetchPortfolioData = async () => {
    setLoadingStocks(true);
    for (const holding of portfolio) {
      await fetchStockData(holding.symbol);
    }
    setLoadingStocks(false);
  };

  // Fetch price predictions
  const fetchPredictions = async () => {
    setLoadingPredictions(true);
    for (const holding of portfolio) {
      try {
        const response = await fetch(`${backendUrl}/api/predict-price/${holding.symbol}`);
        const data = await response.json();
        setPredictions(prev => ({ ...prev, [holding.symbol]: data }));
      } catch (error) {
        console.error(`Error predicting ${holding.symbol}:`, error);
      }
    }
    setLoadingPredictions(false);
  };

  // Generate trading signals
  const fetchTradingSignals = async () => {
    setLoadingSignals(true);
    for (const holding of portfolio) {
      try {
        const response = await fetch(`${backendUrl}/api/trading-signals/${holding.symbol}`);
        const data = await response.json();
        setTradingSignals(prev => ({ ...prev, [holding.symbol]: data }));
      } catch (error) {
        console.error(`Error generating signal for ${holding.symbol}:`, error);
      }
    }
    setLoadingSignals(false);
  };

  // Optimize portfolio
  const optimizePortfolio = async () => {
    setLoadingOptimization(true);
    try {
      const response = await fetch(`${backendUrl}/api/optimize-portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holdings: portfolio,
          monthlyBudget: 500,
          riskTolerance: 'moderate',
          currency: 'USD'
        })
      });
      const data = await response.json();
      setOptimizationResult(data);
    } catch (error) {
      console.error('Error optimizing portfolio:', error);
    }
    setLoadingOptimization(false);
  };

  // Backtest strategy
  const backtestStrategy = async (strategyType = 'momentum') => {
    try {
      const response = await fetch(`${backendUrl}/api/backtest-strategy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbols: portfolio.map(h => h.symbol),
          start_date: '2023-01-01',
          end_date: '2024-01-01',
          initial_capital: 10000,
          strategy_type: strategyType
        })
      });
      const data = await response.json();
      setBacktestResults(data);
    } catch (error) {
      console.error('Error backtesting:', error);
    }
  };

  // Get AI analysis
  const getAIAnalysis = async (symbol, analysisType = 'comprehensive') => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setAnalysisLoading(prev => ({ ...prev, [symbol]: true }));
    try {
      const response = await fetch(`${backendUrl}/api/ai-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol,
          analysis_type: analysisType,
          api_key: apiKey
        })
      });
      const data = await response.json();
      setAiAnalysis(prev => ({ ...prev, [symbol]: data }));
    } catch (error) {
      console.error(`Error getting AI analysis for ${symbol}:`, error);
    }
    setAnalysisLoading(prev => ({ ...prev, [symbol]: false }));
  };

  // Initialize
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const saveApiKey = (key) => {
    localStorage.setItem('claudeApiKey', key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  // ============================================================================
  // COMPONENTS
  // ============================================================================

  // Dashboard
  const Dashboard = () => {
    const portfolioValue = Object.entries(stocksData).reduce((sum, [symbol, data]) => {
      const holding = portfolio.find(h => h.symbol === symbol);
      return sum + (holding ? holding.shares * data.price : 0);
    }, 0);

    const portfolioCost = portfolio.reduce((sum, h) => sum + (h.shares * h.avgPrice), 0);
    const totalGain = portfolioValue - portfolioCost;
    const gainPercent = portfolioCost > 0 ? ((totalGain / portfolioCost) * 100) : 0;

    const buySignalsCount = Object.values(tradingSignals).filter(s => s.signal === 'BUY').length;
    const sellSignalsCount = Object.values(tradingSignals).filter(s => s.signal === 'SELL').length;

    return (
      <div className="space-y-6 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">AI Investment Dashboard</h1>
          <p className="text-blue-100">Real-time EGX analysis with ML predictions & trading signals</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Portfolio Value</div>
            <div className="text-2xl font-bold text-green-600">{(portfolioValue / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-500 mt-1">EGP</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Total Gain</div>
            <div className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>{gainPercent.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">{totalGain > 0 ? '+' : ''}{totalGain.toFixed(0)} EGP</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Buy Signals</div>
            <div className="text-2xl font-bold text-green-600">{buySignalsCount}</div>
            <div className="text-xs text-gray-500 mt-1">Ready to buy</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Sell Signals</div>
            <div className="text-2xl font-bold text-red-600">{sellSignalsCount}</div>
            <div className="text-xs text-gray-500 mt-1">Consider selling</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button onClick={fetchPortfolioData} className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg font-semibold text-blue-600 transition flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" /> Refresh Stock Data
            </button>
            <button onClick={fetchPredictions} className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg font-semibold text-purple-600 transition flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" /> Get Price Predictions
            </button>
            <button onClick={fetchTradingSignals} className="p-3 bg-green-50 hover:bg-green-100 rounded-lg font-semibold text-green-600 transition flex items-center justify-center gap-2">
              <ZapIcon className="w-5 h-5" /> Generate Signals
            </button>
            <button onClick={optimizePortfolio} className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg font-semibold text-yellow-600 transition flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" /> Optimize Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Stock Analysis
  const StockAnalysis = () => (
    <div className="space-y-6 pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 -mx-4 mb-4">
        <h1 className="text-2xl font-bold">📊 Stock Analysis</h1>
        <p className="text-gray-600 text-sm">Real-time data + ML predictions + Trading signals</p>
      </div>

      {loadingStocks && <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-blue-700">Loading stock data...</div>}

      <div className="space-y-4">
        {portfolio.map((holding) => {
          const stockData = stocksData[holding.symbol];
          const prediction = predictions[holding.symbol];
          const signal = tradingSignals[holding.symbol];
          const analysis = aiAnalysis[holding.symbol];

          return (
            <div key={holding.symbol} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{holding.name}</h3>
                    <p className="text-sm text-gray-600">{holding.symbol} • {holding.sector}</p>
                  </div>
                  {signal && (
                    <div className={`px-3 py-1 rounded-full font-bold text-sm ${
                      signal.signal === 'BUY' ? 'bg-green-100 text-green-800' :
                      signal.signal === 'SELL' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {signal.signal}
                    </div>
                  )}
                </div>
              </div>

              {/* Current Data */}
              {stockData && (
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600">Current Price</div>
                      <div className="font-bold text-gray-800">{stockData.price.toFixed(2)} EGP</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Change</div>
                      <div className={`font-bold ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stockData.change >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Your Holdings</div>
                      <div className="font-bold">{(holding.shares * stockData.price).toFixed(0)} EGP</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Entry Price</div>
                      <div className="font-bold">{holding.avgPrice.toFixed(2)} EGP</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ML Prediction */}
              {prediction && (
                <div className="p-4 border-b border-gray-200 bg-purple-50">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    ML Price Prediction
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600">Predicted Price</div>
                      <div className="font-bold text-purple-600">{prediction.predictedPrice.toFixed(2)} EGP</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Expected Change</div>
                      <div className={`font-bold ${prediction.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {prediction.changePercent >= 0 ? '+' : ''}{prediction.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Confidence</div>
                      <div className="font-bold">{(prediction.confidence * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Model Accuracy</div>
                      <div className="font-bold">{(prediction.testAccuracy * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trading Signal */}
              {signal && (
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <ZapIcon className="w-4 h-4 text-blue-600" />
                    Trading Signal Analysis
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div>
                      <div className="text-gray-600">Signal Confidence</div>
                      <div className="font-bold">{(signal.confidence * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Technical Score</div>
                      <div className="font-bold">{signal.technicalScore.toFixed(2)}</div>
                    </div>
                    {signal.targetPrice && (
                      <div>
                        <div className="text-gray-600">Target Price</div>
                        <div className="font-bold text-green-600">{signal.targetPrice.toFixed(2)}</div>
                      </div>
                    )}
                    {signal.stopLoss && (
                      <div>
                        <div className="text-gray-600">Stop Loss</div>
                        <div className="font-bold text-red-600">{signal.stopLoss.toFixed(2)}</div>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-700">
                    <strong>Reasons:</strong>
                    <ul className="mt-1 space-y-1">
                      {signal.reasons.slice(0, 3).map((reason, idx) => (
                        <li key={idx}>• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* AI Analysis */}
              <div className="p-4">
                <button
                  onClick={() => getAIAnalysis(holding.symbol, 'comprehensive')}
                  disabled={analysisLoading[holding.symbol]}
                  className="w-full p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded font-semibold transition mb-3"
                >
                  {analysisLoading[holding.symbol] ? 'Getting AI Analysis...' : '🤖 Get AI Analysis'}
                </button>

                {analysis && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg text-sm text-gray-700 border-l-4 border-blue-600">
                    <p>{analysis.analysis.substring(0, 500)}...</p>
                    <button className="text-blue-600 font-semibold mt-2">Read Full Analysis →</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Portfolio Optimization
  const PortfolioOptimization = () => (
    <div className="space-y-6 pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 -mx-4 mb-4">
        <h1 className="text-2xl font-bold">🎯 Portfolio Optimization</h1>
        <p className="text-gray-600 text-sm">Modern Portfolio Theory - Efficient Frontier</p>
      </div>

      <button
        onClick={optimizePortfolio}
        disabled={loadingOptimization}
        className="w-full p-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
      >
        {loadingOptimization ? 'Optimizing...' : <><BarChart3 className="w-5 h-5" /> Calculate Optimal Allocation</>}
      </button>

      {optimizationResult && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Optimal Portfolio Weights</h2>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Expected Annual Return</div>
              <div className="text-2xl font-bold text-green-600">{(optimizationResult.expectedReturn * 100).toFixed(2)}%</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600">Expected Risk (Std Dev)</div>
              <div className="text-2xl font-bold text-blue-600">{(optimizationResult.expectedRisk * 100).toFixed(2)}%</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600">Sharpe Ratio</div>
              <div className="text-2xl font-bold text-purple-600">{optimizationResult.sharpeRatio.toFixed(3)}</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-sm text-gray-600">Risk-Adjusted Return</div>
              <div className="text-2xl font-bold text-yellow-600">{(optimizationResult.sharpeRatio * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* Allocation */}
          <h3 className="font-bold text-lg mb-4">Recommended Allocation</h3>
          <div className="space-y-3">
            {Object.entries(optimizationResult.weights)
              .filter(([_, w]) => w > 0.01)
              .sort((a, b) => b[1] - a[1])
              .map(([symbol, weight]) => {
                const holding = portfolio.find(h => h.symbol === symbol);
                const stockData = stocksData[symbol];
                return (
                  <div key={symbol} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-bold text-gray-800">{holding?.name}</div>
                        <div className="text-sm text-gray-600">{symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{(weight * 100).toFixed(1)}%</div>
                        {stockData && <div className="text-sm text-gray-600">{stockData.price.toFixed(2)} EGP</div>}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${weight * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">💡 Recommendation</h4>
            <p className="text-sm text-green-700">{optimizationResult.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );

  // Backtesting
  const Backtesting = () => (
    <div className="space-y-6 pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 -mx-4 mb-4">
        <h1 className="text-2xl font-bold">📈 Strategy Backtesting</h1>
        <p className="text-gray-600 text-sm">Test trading strategies on historical data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => backtestStrategy('momentum')}
          className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-bold transition"
        >
          📊 Test Momentum Strategy
        </button>
        <button
          onClick={() => backtestStrategy('mean_reversion')}
          className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-bold transition"
        >
          ↩️ Test Mean Reversion
        </button>
      </div>

      {backtestResults && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">
            {backtestResults.strategy === 'momentum' ? '📊 Momentum' : '↩️ Mean Reversion'} Strategy Results
          </h2>
          <p className="text-sm text-gray-600 mb-4">Period: {backtestResults.start_date} to {backtestResults.end_date}</p>

          <div className="space-y-4">
            {Object.entries(backtestResults.results).map(([symbol, result]) => (
              <div key={symbol} className="border border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold text-gray-800">{symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${result.strategy_return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.strategy_return >= 0 ? '+' : ''}{result.strategy_return.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-600">Strategy Return</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Buy & Hold</div>
                    <div className={`font-bold ${result.buy_hold_return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.buy_hold_return >= 0 ? '+' : ''}{result.buy_hold_return.toFixed(2)}%
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Sharpe Ratio</div>
                    <div className="font-bold text-blue-600">{result.sharpe_ratio.toFixed(3)}</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Win Rate</div>
                    <div className="font-bold text-purple-600">{result.win_rate.toFixed(1)}%</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">Final Value</div>
                    <div className="font-bold">{(result.final_value).toFixed(0)} EGP</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Settings
  const SettingsTab = () => (
    <div className="space-y-6 pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 -mx-4 mb-4">
        <h1 className="text-2xl font-bold">⚙️ Settings</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-lg mb-4">Claude API Key</h3>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Claude API key"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
        />
        <button
          onClick={() => saveApiKey(apiKey)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
        >
          Save API Key
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-lg mb-4">Backend Connection</h3>
        <p className="text-sm text-gray-600 mb-2">Backend URL: {backendUrl}</p>
        <p className="text-xs text-gray-500">Ensure the Python backend is running on this URL</p>
      </div>
    </div>
  );

  // Render content
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'analysis': return <StockAnalysis />;
      case 'optimization': return <PortfolioOptimization />;
      case 'backtest': return <Backtesting />;
      case 'settings': return <SettingsTab />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center lg:hidden z-40">
        <h1 className="font-bold text-lg">AI Investment</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-white border-r border-gray-200 min-h-screen`}>
          <div className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'analysis', label: 'Stock Analysis', icon: LineChart },
              { id: 'optimization', label: 'Optimization', icon: BarChart3 },
              { id: 'backtest', label: 'Backtesting', icon: Activity },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setMobileMenuOpen(false); }}
                className={`w-full text-left p-3 rounded-lg font-semibold flex items-center gap-2 transition ${
                  activeTab === id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 lg:px-8 py-6 max-w-5xl mx-auto w-full">
          {renderContent()}
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Set Up Claude API</h2>
            <p className="text-gray-600 text-sm mb-4">
              Get your free API key from <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Anthropic Console</a>
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Claude API key"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
            />
            <button
              onClick={() => saveApiKey(apiKey)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition"
            >
              Save & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInvestmentApp;
