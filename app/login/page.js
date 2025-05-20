"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Paper, CircularProgress } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && (data.success || data.token)) {
        router.replace("/");
      } else {
        setError(data.error || "登录失败，请重试");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F3E8FF" }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 4, minWidth: 340, maxWidth: 400 }}>
        <Typography variant="h4" align="center" fontWeight={700} mb={3} color="primary.main">
          登录知造数据
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="用户名"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            required
          />
          <TextField
            label="密码"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" mt={1} mb={1}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 3, fontWeight: 700, fontSize: "1.1rem" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "登录"}
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="text.secondary" display="inline">
            没有账号？
          </Typography>
          <Button
            variant="text"
            color="primary"
            sx={{ ml: 1, fontWeight: 700 }}
            onClick={() => {
              router.replace('/register');
            }}
          >
            注册
          </Button>
          {/* <Box mt={1}>
            <Button
              variant="text"
              color="primary"
              sx={{ fontWeight: 700 }}
              onClick={() => {
                router.replace('/profile');
              }}
            >
              个人中心
            </Button>
          </Box> */}
        </Box>
      </Paper>
    </Box>
  );
} 