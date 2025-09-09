// How to play image generator
export default async function handler(req, res) {
    const svg = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="1200" height="630" fill="url(#gradient)"/>
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1a1a"/>
                    <stop offset="100%" style="stop-color:#2d2d2d"/>
                </linearGradient>
            </defs>
            
            <!-- Header -->
            <text x="600" y="80" text-anchor="middle" font-family="Arial" font-size="42" fill="#f7931a" font-weight="bold">
                📖 How to Play
            </text>
            
            <!-- Step cards -->
            <!-- Step 1 -->
            <rect x="50" y="120" width="500" height="120" rx="15" fill="rgba(247,147,26,0.1)" stroke="#f7931a" stroke-width="2"/>
            <circle cx="120" cy="160" r="25" fill="#f7931a"/>
            <text x="120" y="170" text-anchor="middle" font-family="Arial" font-size="18" fill="white" font-weight="bold">1</text>
            <text x="170" y="150" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">Predict Block Transactions</text>
            <text x="170" y="180" font-family="Arial" font-size="14" fill="white">Guess how many transactions will be in</text>
            <text x="170" y="200" font-family="Arial" font-size="14" fill="white">the next Bitcoin block</text>
            <text x="170" y="220" font-family="Arial" font-size="14" fill="#ccc">Choose: Low, Medium, or High range</text>
            
            <!-- Step 2 -->
            <rect x="650" y="120" width="500" height="120" rx="15" fill="rgba(247,147,26,0.1)" stroke="#f7931a" stroke-width="2"/>
            <circle cx="720" cy="160" r="25" fill="#f7931a"/>
            <text x="720" y="170" text-anchor="middle" font-family="Arial" font-size="18" fill="white" font-weight="bold">2</text>
            <text x="770" y="150" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">Wait for Block Mining</text>
            <text x="770" y="180" font-family="Arial" font-size="14" fill="white">Bitcoin miners will create the next block</text>
            <text x="770" y="200" font-family="Arial" font-size="14" fill="white">Usually takes 10-15 minutes</text>
            <text x="770" y="220" font-family="Arial" font-size="14" fill="#ccc">We'll track the actual transaction count</text>
            
            <!-- Step 3 -->
            <rect x="50" y="270" width="500" height="120" rx="15" fill="rgba(247,147,26,0.1)" stroke="#f7931a" stroke-width="2"/>
            <circle cx="120" cy="310" r="25" fill="#f7931a"/>
            <text x="120" y="320" text-anchor="middle" font-family="Arial" font-size="18" fill="white" font-weight="bold">3</text>
            <text x="170" y="300" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">Get Rewards</text>
            <text x="170" y="330" font-family="Arial" font-size="14" fill="white">Closest predictions win $SECONDS tokens!</text>
            <text x="170" y="350" font-family="Arial" font-size="14" fill="white">🥇 1st: 500 tokens  🥈 2nd: 250 tokens</text>
            <text x="170" y="370" font-family="Arial" font-size="14" fill="#ccc">Perfect predictions get bonus rewards</text>
            
            <!-- Step 4 -->
            <rect x="650" y="270" width="500" height="120" rx="15" fill="rgba(247,147,26,0.1)" stroke="#f7931a" stroke-width="2"/>
            <circle cx="720" cy="310" r="25" fill="#f7931a"/>
            <text x="720" y="320" text-anchor="middle" font-family="Arial" font-size="18" fill="white" font-weight="bold">4</text>
            <text x="770" y="300" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">Play Again</text>
            <text x="770" y="330" font-family="Arial" font-size="14" fill="white">New blocks every ~10 minutes</text>
            <text x="770" y="350" font-family="Arial" font-size="14" fill="white">Keep predicting to climb the leaderboard</text>
            <text x="770" y="370" font-family="Arial" font-size="14" fill="#ccc">Build your winning streak! 🔥</text>
            
            <!-- Prediction ranges info -->
            <rect x="200" y="420" width="800" height="120" rx="15" fill="rgba(0,0,0,0.3)" stroke="rgba(247,147,26,0.3)" stroke-width="1"/>
            
            <text x="600" y="450" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">
                📊 PREDICTION RANGES
            </text>
            
            <text x="350" y="480" text-anchor="middle" font-family="Arial" font-size="16" fill="white" font-weight="bold">📉 LOW</text>
            <text x="350" y="500" text-anchor="middle" font-family="Arial" font-size="14" fill="#ccc">1,000 - 2,000 TX</text>
            
            <text x="600" y="480" text-anchor="middle" font-family="Arial" font-size="16" fill="white" font-weight="bold">📊 MEDIUM</text>
            <text x="600" y="500" text-anchor="middle" font-family="Arial" font-size="14" fill="#ccc">2,000 - 3,500 TX</text>
            
            <text x="850" y="480" text-anchor="middle" font-family="Arial" font-size="16" fill="white" font-weight="bold">📈 HIGH</text>
            <text x="850" y="500" text-anchor="middle" font-family="Arial" font-size="14" fill="#ccc">3,500+ TX</text>
            
            <!-- Footer -->
            <text x="600" y="580" text-anchor="middle" font-family="Arial" font-size="20" fill="#f7931a" font-weight="bold">
                🚀 Ready to start winning? Let's go!
            </text>
        </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(svg);
}