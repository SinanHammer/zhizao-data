'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import ScienceIcon from '@mui/icons-material/Science';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MinerUSettings({ projectId }) {
    const { t } = useTranslation();
    const [config, setConfig] = useState({ apiBaseUrl: '', apiKey: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [testResult, setTestResult] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editForm, setEditForm] = useState({ apiBaseUrl: '', apiKey: '' });
    const [testing, setTesting] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        async function fetchConfig() {
            try {
                setLoading(true);
                const res = await fetch(`/api/projects/${projectId}/tools/mineru`);
                if (res.ok) {
                    const data = await res.json();
                    setConfig(data);
                }
            } catch (e) {
                // ignore
            } finally {
                setLoading(false);
            }
        }
        fetchConfig();
    }, [projectId]);

    const handleOpenEditDialog = () => {
        setEditForm(config);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // 自动测试 MinerU API
    const testMinerU = async (apiBaseUrl) => {
        setTesting(true);
        setTestResult(null);
        try {
            // 新测试方式：尝试 GET /docs 或 /openapi.json
            let url = apiBaseUrl.replace(/\/$/, '') + '/docs';
            let res = await fetch(url, { method: 'GET' });
            if (!res.ok) {
                // 尝试 openapi.json
                url = apiBaseUrl.replace(/\/$/, '') + '/openapi.json';
                res = await fetch(url, { method: 'GET' });
            }
            if (res.ok) {
                setTestResult({ success: true, message: t('settings.testSuccess') || 'Connection successful' });
            } else {
                setTestResult({ success: false, message: t('settings.testFailed') || 'Connection failed' });
            }
        } catch (e) {
            setTestResult({ success: false, message: e.name === 'AbortError' ? 'Request timed out' : (e.message || 'Failed to fetch') });
        } finally {
            setTesting(false);
        }
    };

    // 保存时自动测试
    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            const res = await fetch(`/api/projects/${projectId}/tools/mineru`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            if (!res.ok) throw new Error(t('settings.saveFailed'));
            setConfig(editForm);
            setSuccess(true);
            setEditDialogOpen(false);
            // 保存后自动测试
            await testMinerU(editForm.apiBaseUrl);
        } catch (e) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    // 初始化时自动测试（仅首次加载有配置时）
    useEffect(() => {
        if (config.apiBaseUrl) {
            testMinerU(config.apiBaseUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config.apiBaseUrl]);

    const handleDelete = async () => {
        try {
            await fetch(`/api/projects/${projectId}/tools/mineru`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiBaseUrl: '', apiKey: '' })
            });
            setConfig({ apiBaseUrl: '', apiKey: '' });
            setDeleted(true);
        } catch (e) {
            setError(e.message);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
        setError(null);
        setTestResult(null);
        setDeleted(false);
    };

    if (loading) {
        return <CircularProgress />;
    }

    // 状态 Chip
    let statusChip = null;
    if (!config.apiBaseUrl) {
        statusChip = (
            <Chip
                icon={<ErrorIcon fontSize="small" />}
                label={t('settings.saveFailed') || '未配置'}
                size="small"
                color="warning"
                variant="outlined"
            />
        );
    } else if (testing) {
        statusChip = (
            <Chip
                icon={<CircularProgress size={16} />}
                label={t('common.testing') || '测试中...'}
                size="small"
                color="info"
                variant="outlined"
            />
        );
    } else if (testResult && testResult.success) {
        statusChip = (
            <Chip
                icon={<CheckCircleIcon fontSize="small" />}
                label={t('settings.testSuccess') || '可用'}
                size="small"
                color="success"
                variant="outlined"
            />
        );
    } else if (testResult && !testResult.success) {
        statusChip = (
            <Chip
                icon={<ErrorIcon fontSize="small" />}
                label={t('settings.testFailed') || '连接失败'}
                size="small"
                color="error"
                variant="outlined"
            />
        );
    } else {
        statusChip = (
            <Chip
                icon={<CheckCircleIcon fontSize="small" />}
                label={t('settings.saveSuccess') || '已配置'}
                size="small"
                color="success"
                variant="outlined"
            />
        );
    }

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s',
                            '&:hover': {
                                boxShadow: 3,
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                sx={{
                                    bgcolor: 'primary.main',
                                    width: 40,
                                    height: 40,
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    boxShadow: 2
                                }}
                            >
                                <ScienceIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    MinerU API
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    sx={{
                                        fontWeight: 'medium',
                                        bgcolor: 'primary.50',
                                        px: 1,
                                        py: 0.2,
                                        borderRadius: 1,
                                        display: 'inline-block'
                                    }}
                                >
                                    {config.apiBaseUrl ? config.apiBaseUrl : t('settings.saveFailed') || '未配置'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title={statusChip.props.label}>
                                {statusChip}
                            </Tooltip>
                            <IconButton size="small" onClick={handleOpenEditDialog} color="primary">
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={handleDelete} color="error" disabled={!config.apiBaseUrl}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Paper>
                    {testResult && (
                        <Alert
                            severity={testResult.success ? 'success' : 'error'}
                            icon={testResult.success ? <CheckCircleIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
                            sx={{ mt: 2 }}
                        >
                            {testResult.message}
                        </Alert>
                    )}
                </Stack>
            </CardContent>
            {/* 编辑弹窗 */}
            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{t('edit') || '编辑'} MinerU API</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="API Base URL"
                            name="apiBaseUrl"
                            value={editForm.apiBaseUrl}
                            onChange={handleEditFormChange}
                            fullWidth
                            required
                            placeholder="http://localhost:8000"
                        />
                        <TextField
                            label="API Key (可选)"
                            name="apiKey"
                            value={editForm.apiKey}
                            onChange={handleEditFormChange}
                            fullWidth
                            placeholder="如有请填写"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>{t('common.cancel')}</Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={saving || !editForm.apiBaseUrl}
                    >
                        {saving ? t('common.saving') : t('common.save')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={success} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {t('settings.saveSuccess')}
                </Alert>
            </Snackbar>
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={deleted} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {t('common.deleteSuccess')}
                </Alert>
            </Snackbar>
        </Card>
    );
} 