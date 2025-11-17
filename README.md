# partida-test

# 📊 Crypto Order Book Service

A small Node.js service that:
- Updates the order book every 60 seconds via REST API  
- Simultaneously listens for live price updates via WebSocket  
- Calculates **mid price** and **spread**  
- Stores the last 10 spread values in Redis and displays the average spread for the last minute  

---

## ⚙️ Run Instructions

Install dependencies:
    npm install
Run Docker
    docker compose up -d
Start the application 
    npm run start

💱 Selected Exchange
LBank Exchange
	•	REST API: https://www.lbank.com/en-US/docs/index.html￼
	•	WebSocket API: https://www.lbank.com/en-US/docs/index.html#websocket￼


Example Console Output
[2025-11-17T21:40:10.550] BTC/USDT lastPrice: 94124.01, mid: 94125.10, avgSpread: 0.00009%