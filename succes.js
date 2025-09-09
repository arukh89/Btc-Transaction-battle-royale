// Success message image generator
export default async function handler(req, res) {
    const { prediction = '2850', block = '913889' } = req.query;
    
    // Format prediction with commas
    const formattedPrediction = parseInt(prediction).toLocaleString() + ' transactions';
    const formattedBlock = '#' + parseInt(block).toLocaleString();
    
    const svg = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="1200" height="630" fill="url(#gradient)"/>
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1a1a1a"/>
                    <stop offset="50%" style="stop-color:#2d2d2d"/>
                    <stop offset="100%" style="stop-color:#0f4f2f"/>
                </linearGradient>
                
                <!-- Success glow -->
                <filter id="successGlow">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                    <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                
                <!-- Bitcoin glow -->
                <filter id="bitcoinGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Success checkmark circle -->
            <circle cx="600" cy="180" r="70" fill="rgba(40,167,69,0.2)" stroke="#28a745" stroke-width="4"/>
            <text x="600" y="205" text-anchor="middle" font-family="Arial" font-size="50" fill="#28a745">✅</text>
            
            <!-- Success message -->
            <text x="600" y="280" text-anchor="middle" font-family="Arial" font-size="36" fill="#28a745" font-weight="bold" filter="url(#successGlow)">
                Prediction Submitted Successfully!
            </text>
            
            <!-- Block info -->
            <text x="600" y="320" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">
                TARGET BLOCK: ${formattedBlock}
            </text>
            
            <!-- Prediction details box -->
            <rect x="250" y="340" width="700" height="120" rx="15" fill="rgba(247,147,26,0.1)" stroke="#f7931a" stroke-width="3"/>
            
            <text x="600" y="370" text-anchor="middle" font-family="Arial" font-size="20" fill="#f7931a" font-weight="bold">
                YOUR PREDICTION
            </text>
            <text x="600" y="410" text-anchor="middle" font-family="Arial" font-size="32" fill="white" font-weight="bold" filter="url(#bitcoinGlow)">
                ${formattedPrediction}
            </text>
            <text x="600" y="440" text-anchor="middle" font-family="Arial" font-size="16" fill="#ccc">
                in Bitcoin Block ${formattedBlock}
            </text>
            
            <!-- Status and next steps -->
            <rect x="300" y="480" width="600" height="80" rx="10" fill="rgba(40,167,69,0.1)" stroke="#28a745" stroke-width="2"/>
            <text x="600" y="505" text-anchor="middle" font-family="Arial" font-size="18" fill="#28a745" font-weight="bold">
                🚀 Good Luck!
            </text>
            <text x="600" y="530" text-anchor="middle" font-family="Arial" font-size="16" fill="#28a745">
                We'll notify you when the block is mined
            </text>
            <text x="600" y="550" text-anchor="middle" font-family="Arial" font-size="16" fill="#28a745">
                🎯 Check the leaderboard or make another prediction!
            </text>
            
            <!-- Prize reminder -->
            <text x="600" y="590" text-anchor="middle" font-family="Arial" font-size="14" fill="#ffd700">
                🏆 Closest prediction wins 500 $SECONDS tokens! 💰
            </text>
            
            <!-- Decorative Bitcoin symbols -->
            <text x="150" y="350" font-family="Arial" font-size="24" fill="#f7931a" opacity="0.3">₿</text>
            <text x="1050" y="350" font-family="Arial" font-size="24" fill="#f7931a" opacity="0.3">₿</text>
            
            <!-- Animated sparkles -->
            <text x="450" y="130" font-family="Arial" font-size="20" fill="#f7931a" opacity="0.7">✨</text>
            <text x="750" y="130" font-family="Arial" font-size="20" fill="#f7931a" opacity="0.7">✨</text>
            <text x="350" y="580" font-family="Arial" font-size="16" fill="#28a745" opacity="0.6">⭐</text>
            <text x="850" y="580" font-family="Arial" font-size="16" fill="#28a745" opacity="0.6">⭐</text>
            
            <!-- Corner decorations -->
            <circle cx="100" cy="100" r="20" fill="#f7931a" opacity="0.1"/>
            <circle cx="1100" cy="100" r="20" fill="#f7931a" opacity="0.1"/>
            <circle cx="100" cy="530" r="20" fill="#28a745" opacity="0.1"/>
            <circle cx="1100" cy="530" r="20" fill="#28a745" opacity="0.1"/>
        </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.send(svg);
}