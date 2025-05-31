// pages/api/refresh-token.js
import axios from 'axios';

export default async function handler(req, res) {
  const { refresh_token } = req.query;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    const tokenResponse = await axios.post(
      'https://account.accurate.id/oauth/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: process.env.ACCURATE_CLIENT_ID,
        client_secret: process.env.ACCURATE_CLIENT_SECRET,
        redirect_uri: process.env.ACCURATE_REDIRECT_URI
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    const { access_token, expires_in, token_type, refresh_token: new_refresh_token } = tokenResponse.data;

    res.status(200).json({
      access_token,
      expires_in,
      token_type,
      refresh_token: new_refresh_token || refresh_token
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}