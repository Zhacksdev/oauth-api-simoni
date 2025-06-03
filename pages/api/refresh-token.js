// pages/api/refresh-token.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Gunakan metode POST' });
  }

  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // Encode client_id:client_secret to Base64
    const basicAuth = Buffer.from(
      `${process.env.ACCURATE_CLIENT_ID}:${process.env.ACCURATE_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await axios.post(
      'https://account.accurate.id/oauth/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        }
      }
    );

    const {
      access_token,
      refresh_token: new_refresh_token,
      expires_in,
      token_type,
      scope,
      user
    } = tokenResponse.data;

    return res.status(200).json({
      access_token,
      refresh_token: new_refresh_token || refresh_token,
      token_type,
      expires_in,
      scope,
      user
    });
  } catch (error) {
    console.error('Refresh token error:', error.response?.data || error.message);
    return res.status(500).json({
      error: 'Failed to refresh token',
      detail: error.response?.data || error.message
    });
  }
}
