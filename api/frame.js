// Bitcoin TX Battle Royale - Farcaster Frame API
// This handles all the frame interactions

export default async function handler(req, res) {
    // Only allow POST requests (Farcaster frames use POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get the button that was clicked from the request
        const { untrustedData, trustedData } = req.body;
        const buttonIndex = untrustedData?.buttonIndex || 1;
        const fid = untrustedData?.fid; // User's Farcaster ID

        console.log('Frame interaction:', { buttonIndex, fid, untrustedData });

        // Handle different button clicks
        switch (buttonIndex) {
            case 1:
                // Button 1: Make Prediction
                return handleMakePrediction(res, fid);
            
            case 2:
                // Button 2: View Leaderboard  
                return handleViewLeaderboard(res);
            
            case 3:
                // Button 3: How to Play
                return handleHowToPlay(res);
            
            case 4:
                // Button 4: Submit specific prediction (used in prediction flow)
                return handleSubmitPrediction(res, fid, untrustedData);
            
            default:
                return handleMakePrediction(res, fid);
        }

    } catch (error) {
        console.error('Frame API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Handle "Make Prediction" button click
function handleMakePrediction(res, fid) {
    const currentBlock = getCurrentBlockNumber();
    const avgTransactions = getAverageTransactions();
    
    // Generate dynamic image URL with current data
    const imageUrl = `https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/image/prediction?block=${currentBlock}&avg=${avgTransactions}`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="📉 Low (1000-2000)" />
            <meta property="fc:frame:button:2" content="📊 Medium (2000-3500)" />
            <meta property="fc:frame:button:3" content="📈 High (3500+)" />
            <meta property="fc:frame:button:4" content="🔙 Back" />
            <meta property="fc:frame:post_url" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/frame" />
            <meta property="og:title" content="Make Your Prediction" />
        </head>
        <body></body>
        </html>
    `);
}

// Handle "View Leaderboard" button click
function handleViewLeaderboard(res) {
    const imageUrl = `https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/image/leaderboard`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="🎯 Make Prediction" />
            <meta property="fc:frame:button:2" content="🔄 Refresh" />
            <meta property="fc:frame:button:3" content="🏠 Back to Home" />
            <meta property="fc:frame:post_url" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/frame" />
            <meta property="og:title" content="Leaderboard" />
        </head>
        <body></body>
        </html>
    `);
}
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="🎯 Make Prediction" />
            <meta property="fc:frame:button:2" content="🔄 Refresh" />
            <meta property="fc:frame:button:3" content="🏠 Back to Home" />
            <meta property="fc:frame:post_url" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/frame" />
            <meta property="og:title" content="Leaderboard" />
            <meta property="og:description" content="Top players and recent winners" />
        </head>
        <body>
            <h1>🏆 Leaderboard</h1>
            <div>
                ${leaderboard.map((player, index) => 
                    `<p>${index + 1}. ${player.username}: ${player.points} points</p>`
                ).join('')}
            </div>
        </body>
        </html>
    `);
}

// Handle "How to Play" button click
function handleHowToPlay(res) {
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/howtoplay-image.jpg" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="🎯 Start Playing" />
            <meta property="fc:frame:button:2" content="📊 View Stats" />
            <meta property="fc:frame:button:3" content="🏠 Back to Home" />
            <meta property="fc:frame:post_url" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/frame" />
            <meta property="og:title" content="How to Play" />
            <meta property="og:description" content="Learn how to play Bitcoin TX Battle Royale" />
        </head>
        <body>
            <h1>📖 How to Play</h1>
            <ol>
                <li>Predict the number of transactions in the next Bitcoin block</li>
                <li>Choose Low (1000-2000), Medium (2000-3500), or High (3500+)</li>
                <li>Wait for the block to be mined</li>
                <li>Closest predictions win $SECONDS tokens!</li>
            </ol>
        </body>
        </html>
    `);
}

// Handle prediction submission
function handleSubmitPrediction(res, fid, untrustedData) {
    const buttonIndex = untrustedData.buttonIndex;
    let predictionRange = '';
    
    // Determine prediction range based on button clicked
    switch(buttonIndex) {
        case 1: predictionRange = 'Low (1000-2000)'; break;
        case 2: predictionRange = 'Medium (2000-3500)'; break;
        case 3: predictionRange = 'High (3500+)'; break;
        default: predictionRange = 'Medium (2000-3500)';
    }
    
    // Here you would normally save to database
    // For now, we'll just simulate it
    console.log(`User ${fid} predicted: ${predictionRange}`);
    
    // Store prediction (in a real app, save to database)
    storePrediction(fid, predictionRange);
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/success-image.jpg" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="📊 View Leaderboard" />
            <meta property="fc:frame:button:2" content="🔄 Make Another" />
            <meta property="fc:frame:button:3" content="📱 Share Frame" />
            <meta property="fc:frame:post_url" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/frame" />
            <meta property="og:title" content="Prediction Submitted!" />
            <meta property="og:description" content="Your prediction: ${predictionRange}" />
        </head>
        <body>
            <h1>✅ Prediction Submitted!</h1>
            <p>Your prediction: <strong>${predictionRange}</strong></p>
            <p>Good luck! 🚀</p>
        </body>
        </html>
    `);
}

// Helper functions (these would normally connect to a real database)

function getCurrentBlockNumber() {
    // In a real app, fetch from Bitcoin API
    return Math.floor(867433 + Math.random() * 10);
}

function getAverageTransactions() {
    // In a real app, calculate from recent blocks
    return Math.floor(2500 + Math.random() * 1000);
}

function getLeaderboard() {
    // TODO: Replace with real database query
    // return database.query('SELECT username, points FROM leaderboard ORDER BY points DESC LIMIT 10');
    return []; // Empty until you connect real database
}

function storePrediction(fid, prediction) {
    // In a real app, store in database
    // For now, just log it
    console.log(`Stored prediction: FID ${fid} predicted ${prediction} at ${new Date()}`);
    
    // You could store in memory for demo purposes:
    // if (!global.predictions) global.predictions = [];
    // global.predictions.push({ fid, prediction, timestamp: Date.now() });
              }
