// Check prediction results against real Bitcoin blocks
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { untrustedData } = req.body;
        const fid = untrustedData?.fid;

        // Get latest block data from mempool.space
        const latestBlockData = await getLatestBlockData();
        
        if (!latestBlockData) {
            return showError(res, 'Unable to fetch block data');
        }

        // TODO: Check user's predictions against this block
        // For now, show the actual results
        const imageUrl = `https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/image/results?block=${latestBlockData.height}&txcount=${latestBlockData.tx_count}`;

        return res.status(200).setHeader('Content-Type', 'text/html').send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="${imageUrl}" />
                <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
                <meta property="fc:frame:button:1" content="🎯 New Prediction" />
                <meta property="fc:frame:button:2" content="📊 Leaderboard" />
                <meta property="fc:frame:button:3" content="🔄 Refresh" />
                <meta property="fc:frame:post_url" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/frame" />
                <meta property="og:title" content="Block Results" />
            </head>
            <body></body>
            </html>
        `);

    } catch (error) {
        console.error('Check results error:', error);
        return showError(res, 'Error checking results');
    }
}

async function getLatestBlockData() {
    try {
        const response = await fetch('https://mempool.space/api/v1/blocks');
        const blocks = await response.json();
        const latestBlock = blocks[0];
        
        return {
            height: latestBlock.height,
            tx_count: latestBlock.tx_count,
            timestamp: latestBlock.timestamp,
            hash: latestBlock.id
        };
    } catch (error) {
        console.error('Error fetching latest block:', error);
        return null;
    }
}

function showError(res, message) {
    return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/image/error?message=${encodeURIComponent(message)}" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="🔄 Try Again" />
            <meta property="fc:frame:post_url" content="https://bitcoin-tx-battle-royal-farcaster-n.vercel.app/api/frame" />
        </head>
        <body></body>
        </html>
    `);
}