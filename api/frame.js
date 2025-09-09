// Bitcoin TX Battle Royale - Farcaster Frame API
// Updated to handle input text predictions

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { untrustedData, trustedData } = req.body;
        const buttonIndex = untrustedData?.buttonIndex || 1;
        const fid = untrustedData?.fid;
        const inputText = untrustedData?.inputText; // User's typed prediction

        console.log('Frame interaction:', { buttonIndex, fid, inputText });

        switch (buttonIndex) {
            case 1:
                // Submit Prediction (with input text)
                return handleSubmitPrediction(res, fid, inputText);
            
            case 2:
                // View Leaderboard  
                return handleViewLeaderboard(res);
            
            case 3:
                // Refresh Stats
                return handleRefreshStats(res);
            
            case 4:
                // Get Hint
                return handleGetHint(res);
            
            default:
                return handleSubmitPrediction(res, fid, inputText);
        }

    } catch (error) {
        console.error('Frame API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Handle prediction submission with exact number
function handleSubmitPrediction(res, fid, inputText) {
    const prediction = parseInt(inputText);
    
    // Validate prediction
    if (!prediction || prediction < 1000 || prediction > 10000) {
        return showErrorFrame(res, "Please enter a valid prediction between 1,000 and 10,000 transactions");
    }

    // Get current block info
    const currentBlock = getCurrentBlockNumber();
    const targetBlock = currentBlock + 1;
    
    // Store prediction (connect to your database)
    storePrediction(fid, prediction, targetBlock);
    
    const imageUrl = `https://btc-transaction-battle-royale-1o57.vercel.app/api/image/success?prediction=${prediction}&block=${targetBlock}`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="📊 View Leaderboard" />
            <meta property="fc:frame:button:2" content="🔄 New Prediction" />
            <meta property="fc:frame:button:3" content="📱 Share Game" />
            <meta property="fc:frame:post_url" content="https://btc-transaction-battle-royale-1o57.vercel.app/api/frame" />
            <meta property="og:title" content="Prediction Submitted!" />
        </head>
        <body></body>
        </html>
    `);
}

// Handle leaderboard view
function handleViewLeaderboard(res) {
    const imageUrl = `https://btc-transaction-battle-royale.vercel.app/api/image/leaderboard`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:input:text" content="Enter your TX prediction (e.g. 2850)" />
            <meta property="fc:frame:button:1" content="🎯 Make Prediction" />
            <meta property="fc:frame:button:2" content="🔄 Refresh" />
            <meta property="fc:frame:post_url" content="https://btc-transaction-battle-royale.vercel.app/api/frame" />
            <meta property="og:title" content="Leaderboard" />
        </head>
        <body></body>
        </html>
    `);
}

// Handle refresh stats
function handleRefreshStats(res) {
    const currentBlock = getCurrentBlockNumber();
    const mempoolTx = getMempoolCount();
    const imageUrl = `https://btc-transaction-battle-royale.vercel.app/api/image/stats?block=${currentBlock}&mempool=${mempoolTx}`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:input:text" content="Enter your TX prediction (e.g. 2850)" />
            <meta property="fc:frame:button:1" content="🎯 Submit Prediction" />
            <meta property="fc:frame:button:2" content="📊 View Leaderboard" />
            <meta property="fc:frame:button:3" content="💡 Get Hint" />
            <meta property="fc:frame:post_url" content="https://btc-transaction-battle-royale.vercel.app/api/frame" />
            <meta property="og:title" content="Live Bitcoin Stats" />
        </head>
        <body></body>
        </html>
    `);
}

// Handle get hint
function handleGetHint(res) {
    const avgTx = getAverageTransactions();
    const mempoolTx = getMempoolCount();
    const hint = generateHint(avgTx, mempoolTx);
    
    const imageUrl = `https://btc-transaction-battle-royale.vercel.app/api/image/hint?avg=${avgTx}&mempool=${mempoolTx}`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:input:text" content="Enter your TX prediction (e.g. 2850)" />
            <meta property="fc:frame:button:1" content="🎯 Submit Prediction" />
            <meta property="fc:frame:button:2" content="📊 View Leaderboard" />
            <meta property="fc:frame:button:3" content="🔄 Refresh Stats" />
            <meta property="fc:frame:post_url" content="https://btc-transaction-battle-royale.vercel.app/api/frame" />
            <meta property="og:title" content="Prediction Hint" />
        </head>
        <body></body>
        </html>
    `);
}

// Show error frame
function showErrorFrame(res, errorMessage) {
    const imageUrl = `https://btc-transaction-battle-royale.vercel.app/api/image/error?message=${encodeURIComponent(errorMessage)}`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:input:text" content="Enter your TX prediction (e.g. 2850)" />
            <meta property="fc:frame:button:1" content="🎯 Try Again" />
            <meta property="fc:frame:button:2" content="💡 Get Hint" />
            <meta property="fc:frame:post_url" content="https://btc-transaction-battle-royale.vercel.app/api/frame" />
            <meta property="og:title" content="Invalid Prediction" />
        </head>
        <body></body>
        </html>
    `);
}

// Helper functions
function getCurrentBlockNumber() {
    // TODO: Replace with real mempool.space API call
    return 913889;
}

function getMempoolCount() {
    // TODO: Replace with real mempool.space API call
    return Math.floor(15000 + Math.random() * 5000);
}

function getAverageTransactions() {
    // TODO: Calculate from recent blocks
    return Math.floor(2500 + Math.random() * 500);
}

function generateHint(avgTx, mempoolTx) {
    if (mempoolTx > 20000) return "High activity - expect 3000+ transactions";
    if (mempoolTx < 10000) return "Low activity - expect 1500-2500 transactions";
    return "Normal activity - expect 2000-3000 transactions";
}

function storePrediction(fid, prediction, blockHeight) {
    console.log(`Stored prediction: FID ${fid} predicted ${prediction} for block #${blockHeight}`);
    // TODO: Store in your database
    // const prediction_data = {
    //     fid: fid,
    //     prediction: prediction, 
    //     block_height: blockHeight,
    //     timestamp: new Date(),
    //     status: 'pending'
    // };
    // await db.predictions.insert(prediction_data);
}