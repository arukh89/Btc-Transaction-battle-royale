// Main game image generator
export default async function handler(req, res) {
    const svg = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <!-- Background with gradient -->
            <rect width="1200" height="630" fill="url(#bgGradient)"/>
            <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0f0f0f"/>
                    <stop offset="50%" style="stop-color:#1a1a1a"/>
                    <stop offset="100%" style="stop-color:#2d2d2d"/>
                </linearGradient>
                
                <!-- Glowing effect -->
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Decorative Bitcoin symbols in background -->
            <circle cx="100" cy="100" r="40" fill="#f7931a" opacity="0.1"/>
            <text x="100" y="115" text-anchor="middle" font-family="Arial" font-size="30" fill="#f7931a" opacity="0.3">₿</text>
            
            <circle cx="1100" cy="100" r="40" fill="#f7931a" opacity="0.1"/>
            <text x="1100" y="115" text-anchor="middle" font-family="Arial" font-size="30" fill="#f7931a" opacity="0.3">₿</text>
            
            <circle cx="100" cy="530" r="40" fill="#f7931a" opacity="0.1"/>
            <text x="100" y="545" text-anchor="middle" font-family="Arial" font-size="30" fill="#f7931a" opacity="0.3">₿</text>
            
            <circle cx="1100" cy="530" r="40" fill="#f7931a" opacity="0.1"/>
            <text x="1100" y="545" text-anchor="middle" font-family="Arial" font-size="30" fill="#f7931a" opacity="0.3">₿</text>
            
            <!-- Main title - Mobile optimized font size -->
            <text x="600" y="150" text-anchor="middle" font-family="Arial" font-size="48" fill="#f7931a" font-weight="bold" filter="url(#glow)">
                🎮 Bitcoin TX Battle Royale
            </text>
            
            <!-- Subtitle - Readable on mobile -->
            <text x="600" y="200" text-anchor="middle" font-family="Arial" font-size="20" fill="#ccc">
                Predict • Compete • Win $SECONDS Tokens
            </text>
            
            <!-- Current stats -->
            <rect x="200" y="250" width="800" height="150" rx="15" fill="rgba(247,147,26,0.1)" stroke="#f7931a" stroke-width="2"/>
            
            <!-- Stats content -->
            <text x="400" y="290" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">
                📊 CURRENT STATS
            </text>
            <text x="400" y="320" text-anchor="middle" font-family="Arial" font-size="16" fill="white">
                Block: Loading...
            </text>
            <text x="400" y="345" text-anchor="middle" font-family="Arial" font-size="16" fill="white">
                Avg TX: Loading...
            </text>
            <text x="400" y="370" text-anchor="middle" font-family="Arial" font-size="16" fill="white">
                Players: 0
            </text>
            
            <text x="800" y="290" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">
                🏆 PRIZES
            </text>
            <text x="800" y="320" text-anchor="middle" font-family="Arial" font-size="16" fill="white">
                🥇 500 $SECONDS
            </text>
            <text x="800" y="345" text-anchor="middle" font-family="Arial" font-size="16" fill="white">
                🥈 250 $SECONDS
            </text>
            <text x="800" y="370" text-anchor="middle" font-family="Arial" font-size="16" fill="white">
                🥉 100 $SECONDS
            </text>
            
            <!-- Call to action -->
            <text x="600" y="470" text-anchor="middle" font-family="Arial" font-size="32" fill="white" font-weight="bold">
                Ready to Play? 🚀
            </text>
            
            <!-- Instructions -->
            <text x="600" y="520" text-anchor="middle" font-family="Arial" font-size="20" fill="#f7931a">
                Click "🎯 Make Prediction" to start!
            </text>
            
            <text x="600" y="550" text-anchor="middle" font-family="Arial" font-size="16" fill="#ccc">
                Predict the next Bitcoin block's transaction count and win tokens
            </text>
        </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(svg);
}
