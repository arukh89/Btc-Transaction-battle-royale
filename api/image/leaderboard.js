// Leaderboard image generator
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
            <text x="600" y="80" text-anchor="middle" font-family="Arial" font-size="48" fill="#f7931a" font-weight="bold">
                🏆 LEADERBOARD
            </text>
            
            <!-- Podium -->
            <!-- Second place -->
            <rect x="250" y="200" width="150" height="120" fill="rgba(192,192,192,0.3)" stroke="#c0c0c0" stroke-width="2"/>
            <text x="325" y="180" text-anchor="middle" font-family="Arial" font-size="24" fill="#c0c0c0">🥈</text>
            <text x="325" y="240" text-anchor="middle" font-family="Arial" font-size="16" fill="white" font-weight="bold">btc_predictor</text>
            <text x="325" y="265" text-anchor="middle" font-family="Arial" font-size="20" fill="#c0c0c0" font-weight="bold">980</text>
            <text x="325" y="290" text-anchor="middle" font-family="Arial" font-size="14" fill="#ccc">$SECONDS</text>
            
            <!-- First place (taller) -->
            <rect x="450" y="150" width="150" height="170" fill="rgba(247,147,26,0.3)" stroke="#f7931a" stroke-width="3"/>
            <text x="525" y="130" text-anchor="middle" font-family="Arial" font-size="28" fill="#f7931a">🥇</text>
            <text x="525" y="190" text-anchor="middle" font-family="Arial" font-size="16" fill="white" font-weight="bold">satoshi_fan</text>
            <text x="525" y="220" text-anchor="middle" font-family="Arial" font-size="24" fill="#f7931a" font-weight="bold">1,250</text>
            <text x="525" y="250" text-anchor="middle" font-family="Arial" font-size="14" fill="#ccc">$SECONDS</text>
            <text x="525" y="280" text-anchor="middle" font-family="Arial" font-size="12" fill="#f7931a">👑 CHAMPION</text>
            
            <!-- Third place -->
            <rect x="650" y="230" width="150" height="90" fill="rgba(205,127,50,0.3)" stroke="#cd7f32" stroke-width="2"/>
            <text x="725" y="210" text-anchor="middle" font-family="Arial" font-size="24" fill="#cd7f32">🥉</text>
            <text x="725" y="260" text-anchor="middle" font-family="Arial" font-size="16" fill="white" font-weight="bold">block_master</text>
            <text x="725" y="285" text-anchor="middle" font-family="Arial" font-size="18" fill="#cd7f32" font-weight="bold">875</text>
            <text x="725" y="305" text-anchor="middle" font-family="Arial" font-size="14" fill="#ccc">$SECONDS</text>
            
            <!-- Other players -->
            <rect x="150" y="380" width="900" height="180" fill="rgba(0,0,0,0.3)" stroke="rgba(247,147,26,0.3)" stroke-width="1"/>
            
            <text x="600" y="410" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">
                🎯 TOP PERFORMERS
            </text>
            
            <!-- Player list -->
            <text x="200" y="450" font-family="Arial" font-size="16" fill="white">4. tx_guru</text>
            <text x="750" y="450" text-anchor="end" font-family="Arial" font-size="16" fill="#f7931a">650 $SECONDS</text>
            
            <text x="200" y="480" font-family="Arial" font-size="16" fill="white">5. crypto_sage</text>
            <text x="750" y="480" text-anchor="end" font-family="Arial" font-size="16" fill="#f7931a">540 $SECONDS</text>
            
            <text x="200" y="510" font-family="Arial" font-size="16" fill="white">6. block_hunter</text>
            <text x="750" y="510" text-anchor="end" font-family="Arial" font-size="16" fill="#f7931a">420 $SECONDS</text>
            
            <text x="200" y="540" font-family="Arial" font-size="16" fill="white">7. bitcoin_pro</text>
            <text x="750" y="540" text-anchor="end" font-family="Arial" font-size="16" fill="#f7931a">380 $SECONDS</text>
            
            <!-- Footer -->
            <text x="600" y="590" text-anchor="middle" font-family="Arial" font-size="16" fill="#ccc">
                💪 Make your prediction to climb the leaderboard!
            </text>
        </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.send(svg);
}