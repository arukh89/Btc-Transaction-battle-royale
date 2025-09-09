// Success message image generator
export default async function handler(req, res) {
    const { prediction = 'Medium (2000-3500)' } = req.query;
    
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
            </defs>
            
            <!-- Success checkmark circle -->
            <circle cx="600" cy="200" r="80" fill="rgba(40,167,69,0.2)" stroke="#28a745" stroke-width="4"/>
            <text x="600" y="230" text-anchor="middle" font-family="Arial" font-size="60" fill="#28a745">✅</text>
            
            <!-- Success message -->
            <text x="600" y="320" text-anchor="middle" font-family="Arial" font-size="42" fill="#28a745" font-weight="bold" filter="url(#successGlow)">
                Prediction Submitted!
            </text>
            
            <!-- Prediction details -->
            <rect x="300" y="350" width="600" height="100" rx="15" fill="rgba(247,147,26,0.1)" stroke="#f7931a" stroke-width="2"/>
            
            <text x="600" y="380" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a" font-weight="bold">
                YOUR PREDICTION
            </text>
            <text x="600" y="415" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">
                ${prediction}
            </text>
            
            <!-- Good luck message -->
            <text x="600" y="490" text-anchor="middle" font-family="Arial" font-size="28" fill="#f7931a" font-weight="bold">
                Good Luck! 🚀
            </text>
            
            <!-- Next steps -->
            <text x="600" y="530" text-anchor="middle" font-family="Arial" font-size="16" fill="#ccc">
                We'll notify you when the block is mined
            </text>
            
            <text x="600" y="560" text-anchor="middle" font-family="Arial" font-size="16" fill="#28a745">
                🎯 Check the leaderboard or make another prediction!
            </text>
            
            <!-- Decorative elements -->
            <circle cx="200" cy="400" r="30" fill="#f7931a" opacity="0.1"/>
            <text x="200" y="410" text-anchor="middle" font-family="Arial" font-size="20" fill="#f7931a" opacity="0.5">💎</text>
            
            <circle cx="1000" cy="400" r="30" fill="#f7931a" opacity="0.1"/>
            <text x="1000" y="410" text-anchor="middle" font-family="Arial" font-size="20" fill="#f7931a" opacity="0.5">🎯</text>
            
            <!-- Animated sparkles -->
            <text x="450" y="150" font-family="Arial" font-size="20" fill="#f7931a" opacity="0.7">✨</text>
            <text x="750" y="150" font-family="Arial" font-size="20" fill="#f7931a" opacity="0.7">✨</text>
            <text x="350" y="500" font-family="Arial" font-size="16" fill="#28a745" opacity="0.6">⭐</text>
            <text x="850" y="500" font-family="Arial" font-size="16" fill="#28a745" opacity="0.6">⭐</text>
        </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.send(svg);
}