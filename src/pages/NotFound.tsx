import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px",
        color: "#555",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#ff5555" }}>404</h1>
      <h2 style={{ margin: "10px 0 20px", fontWeight: "normal" }}>
        صفحه مورد نظر پیدا نشد
      </h2>
      <p style={{ maxWidth: 400, marginBottom: 30 }}>
        متاسفانه صفحه‌ای که دنبال آن بودید وجود ندارد یا منتقل شده است.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#4a33b1",
          color: "white",
          borderRadius: 5,
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 4px 8px rgba(74, 51, 177, 0.4)",
          transition: "background-color 0.3s ease",
        }}
      >
        بازگشت به خانه
      </Link>
    </div>
  );
};

export default NotFound;
