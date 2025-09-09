// Dynamic image generator for frame previews
export default async function handler(req, res) {
    const { block, avg } = req.query;
    
    // Generate SVG image dynamically
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
            
            <!-- Bitcoin Symbol -->
            <circle cx="200" cy="150" r="80" fill="#f7931a" opacity="0.2"/>
            <text x="200" y="170" text-anchor="middle" font-family="Arial" font-size="60" fill="#f7931a">₿</text>
            
            <!-- Title -->
            <text x="600" y="120" text-anchor="middle" font-family="Arial" font-size="48" fill="#f7931a" font-weight="bold">
                🎮 Bitcoin TX Battle Royale
            </text>
            
            <!-- Block Info -->
            <text x="600" y="200" text-anchor="middle" font-family="Arial" font-size="28" fill="white">
                Next Block: #${block || '867433'}
            </text>
            
            <!-- Avg Transactions -->
            <text x="600" y="250" text-anchor="middle" font-family="Arial" font-size="24" fill="#ccc">
                Recent Average: ${avg || '2847'} transactions
            </text>
            
            <!-- Instructions -->
            <text x="600" y="320" text-anchor="middle" font-family="Arial" font-size="32" fill="white" font-weight="bold">
                Make Your Prediction!
            </text>
            
            <!-- Button hints - Mobile optimized sizes -->
            <rect x="150" y="400" width="250" height="80" rx="10" fill="rgba(247,147,26,0.2)" stroke="#f7931a"/>
            <text x="275" y="430" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a">📉 LOW</text>
            <text x="275" y="455" text-anchor="middle" font-family="Arial" font-size="16" fill="white">1000-2000 TX</text>
            
            <rect x="475" y="400" width="250" height="80" rx="10" fill="rgba(247,147,26,0.2)" stroke="#f7931a"/>
            <text x="600" y="430" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a">📊 MEDIUM</text>
            <text x="600" y="455" text-anchor="middle" font-family="Arial" font-size="16" fill="white">2000-3500 TX</text>
            
            <rect x="800" y="400" width="250" height="80" rx="10" fill="rgba(247,147,26,0.2)" stroke="#f7931a"/>
            <text x="925" y="430" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a">📈 HIGH</text>
            <text x="925" y="455" text-anchor="middle" font-family="Arial" font-size="16" fill="white">3500+ TX</text>
            
            <!-- Footer -->
            <text x="600" y="570" text-anchor="middle" font-family="Arial" font-size="18" fill="#f7931a">
                🏆 Win $SECONDS Tokens • Click buttons below to play!
            </text>
        </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.send(svg);
}