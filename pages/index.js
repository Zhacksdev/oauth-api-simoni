// pages/index.js
export default function Home() {
  const handleLogin = () => {
    window.location.href = "/api/authenticate";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login dengan Accurate</h1>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "18px" }}
      >
        Login
      </button>
    </div>
  );
}
