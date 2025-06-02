// pages/api/exchange-token.js
import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const basicAuth = Buffer.from(`${process.env.ACCURATE_CLIENT_ID}:${process.env.ACCURATE_CLIENT_SECRET}`).toString('base64');

    const tokenResponse = await axios.post(
      'https://account.accurate.id/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.ACCURATE_REDIRECT_URI
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`,
        },
      }
    );

    const { access_token, refresh_token, expires_in, token_type } = tokenResponse.data;

    // ✅ Kirim semua informasi yang relevan
    return res.status(200).json({
      access_token,
      refresh_token,
      token_type,
      expires_in
    });
    
  } catch (error) {
    console.error('Error exchanging code:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to exchange authorization code' });
  }
}
