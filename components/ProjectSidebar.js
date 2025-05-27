import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Box, IconButton, Tab, Tabs, Tooltip, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectSidebar({ selectedProject, autoHide, setAutoHide }) {
    const theme = useTheme();
    const pathname = usePathname();
    const { t } = useTranslation();
    const [hovered, setHovered] = useState(false);

    // 侧边栏是否可见
    const visible = !autoHide || hovered;

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                position: 'fixed',
                top: 80,
                left: 0,
                height: 'calc(100vh - 80px)',
                width: visible ? 200 : 16,
                minWidth: visible ? 200 : 16,
                maxWidth: visible ? 200 : 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                zIndex: 1100,
                bgcolor: theme.palette.mode === 'dark' ? '#1A1A1A' : '#6A1B9A',
                p: visible ? 1 : 0,
                boxShadow: 3,
                borderRadius: 0,
                transition: 'width 0.2s',
                cursor: visible ? 'default' : 'pointer',
                overflow: 'hidden',
            }}
        >
            {visible && (
                <Tabs
                    orientation="vertical"
                    value={pathname}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                        width: '100%',
                        '& .MuiTab-root': {
                            minWidth: 160,
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                            opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
                            '&:hover': {
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : 'white',
                                opacity: 1
                            },
                            whiteSpace: 'normal',
                            lineHeight: 1.2,
                            textAlign: 'left',
                            py: 1.2
                        },
                        '& .Mui-selected': {
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : 'white',
                            opacity: 1,
                            fontWeight: 600
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : 'white',
                            left: 0,
                            right: 'unset',
                            width: 4
                        }
                    }}
                >
                    <Tab
                        label={t('textSplit.title')}
                        value={`/projects/${selectedProject}/text-split`}
                        component={Link}
                        href={`/projects/${selectedProject}/text-split`}
                    />
                    <Tab
                        label={t('questions.title')}
                        value={`/projects/${selectedProject}/questions`}
                        component={Link}
                        href={`/projects/${selectedProject}/questions`}
                    />
                    <Tab
                        label={t('datasets.management')}
                        value={`/projects/${selectedProject}/datasets`}
                        component={Link}
                        href={`/projects/${selectedProject}/datasets`}
                    />
                    <Tab
                        label={t('settings.title')}
                        value={`/projects/${selectedProject}/settings`}
                        component={Link}
                        href={`/projects/${selectedProject}/settings`}
                    />
                    <Tab
                        label={t('playground.title')}
                        value={`/projects/${selectedProject}/playground`}
                        component={Link}
                        href={`/projects/${selectedProject}/playground`}
                    />
                </Tabs>
            )}
            {/* 左下角 pin 按钮 */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', pb: visible ? 1 : 0.5, pr: visible ? 1 : 0.5 }}>
                <Tooltip title={autoHide ? t('固定侧边栏') : t('自动隐藏侧边栏')} placement="right">
                    <IconButton
                        size="small"
                        onClick={e => {
                            e.stopPropagation();
                            setAutoHide(v => !v);
                        }}
                        sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'white', transition: 'color 0.2s' }}
                    >
                        {autoHide ? <PushPinOutlinedIcon fontSize="small" /> : <PushPinIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
} 