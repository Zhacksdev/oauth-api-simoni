// pages/api/authenticate.js
export default function handler(req, res) {
  const client_id = process.env.ACCURATE_CLIENT_ID;
  const redirect_uri = process.env.ACCURATE_REDIRECT_URI;

  const scopes = ["sales_receipt_view", "sales_invoice_view"];
  const scopeParam = encodeURIComponent(scopes.join(" ")); // menjadi: sales_receipt_view%20sales_invoice_view

  const authUrl = `https://account.accurate.id/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&scope=${scopeParam}`;

  res.redirect(authUrl);
}
