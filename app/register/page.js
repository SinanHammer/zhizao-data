"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Paper, CircularProgress, Avatar } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!name || !password) {
      setError("姓名和密码不能为空");
      return;
    }
    if (password !== confirm) {
      setError("两次输入的密码不一致");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => router.replace("/login"), 1200);
      } else {
        setError(data.error || "注册失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #BA68C8 0%, #F3E8FF 100%)" }}>
      <Paper elevation={8} sx={{ p: 5, borderRadius: 8, minWidth: 360, maxWidth: 420, boxShadow: '0 8px 32px rgba(106,27,154,0.12)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, mb: 1 }}>
            <PersonAddAlt1Icon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="primary.main" mb={1}>
            注册新账号
          </Typography>
          <Typography variant="subtitle1" color="secondary.main" fontWeight={500} mb={1}>
            欢迎加入知造数据！
          </Typography>
        </Box>
        <form onSubmit={handleRegister}>
          <TextField
            label="姓名"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            required
            sx={{ background: '#F8F9FA', borderRadius: 2 }}
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
            sx={{ background: '#F8F9FA', borderRadius: 2 }}
          />
          <TextField
            label="确认密码"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            sx={{ background: '#F8F9FA', borderRadius: 2 }}
          />
          {error && <Typography color="error" mt={1} mb={1}>{error}</Typography>}
          {success && <Typography color="success.main" mt={1} mb={1}>注册成功，正在跳转到登录页...</Typography>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, borderRadius: 6, fontWeight: 700, fontSize: "1.1rem", background: 'linear-gradient(90deg, #FFD600 0%, #BA68C8 100%)', color: '#6A1B9A', boxShadow: '0 2px 8px rgba(186,104,200,0.12)' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "注册"}
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Button variant="text" color="primary" onClick={() => router.push('/login')}>返回登录</Button>
        </Box>
      </Paper>
    </Box>
  );
} 