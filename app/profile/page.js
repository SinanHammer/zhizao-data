"use client";
import { Edit as EditIcon, Person as PersonIcon } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setUserInfo(data);
      } else {
        if (res.status === 401) {
          router.replace('/login');
        } else {
          setError("获取用户信息失败");
        }
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      if (res.ok) {
        setIsEditing(false);
        setSuccess("个人信息更新成功");
        await fetchUserInfo();
      } else {
        if (res.status === 401) {
          router.replace('/login');
        } else {
          const data = await res.json();
          setError(data.error || "更新失败");
        }
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.replace("/login");
    } catch (err) {
      setError("退出登录失败");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", p: 3, background: "#F3E8FF" }}>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: "auto", borderRadius: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => window.history.length > 1 ? window.history.back() : router.push('/')} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600} color="primary.main">
            返回
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            sx={{ width: 80, height: 80, bgcolor: "primary.main", mr: 2 }}
            src={userInfo.avatar}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              个人中心
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              管理您的个人信息
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleUpdateProfile}>
          <TextField
            label="用户名"
            fullWidth
            margin="normal"
            value={userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            disabled={!isEditing}
            InputProps={{
              endAdornment: !isEditing && (
                <EditIcon
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    "&:hover": { color: "primary.dark" }
                  }}
                  onClick={() => setIsEditing(true)}
                />
              )
            }}
          />
          <TextField
            label="邮箱"
            fullWidth
            margin="normal"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            disabled={!isEditing}
            type="email"
          />

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  sx={{ flex: 1 }}
                >
                  {loading ? <CircularProgress size={24} /> : "保存"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsEditing(false);
                    fetchUserInfo(); // 重置为原始数据
                  }}
                  sx={{ flex: 1 }}
                >
                  取消
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{ flex: 1 }}
                startIcon={<EditIcon />}
              >
                编辑信息
              </Button>
            )}
          </Box>
        </form>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 