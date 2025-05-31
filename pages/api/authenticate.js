// pages/api/authenticate.js
export default function handler(req, res) {
  const client_id = process.env.ACCURATE_CLIENT_ID;
  const redirect_uri = process.env.ACCURATE_REDIRECT_URI;

  const authUrl = `https://account.accurate.id/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=sales_receipt_view`;

  res.redirect(authUrl);
}