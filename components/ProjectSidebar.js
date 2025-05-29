import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import { Box, IconButton, Tab, Tabs, Tooltip, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function ProjectSidebar({
    selectedProject,
    isExpanded,
    toggleExpand,
    expandedWidth = 200, // Default expanded width
    collapsedWidth = 80   // Default collapsed width
}) {
    const theme = useTheme();
    const pathname = usePathname();
    const { t } = useTranslation();

    const currentWidth = isExpanded ? expandedWidth : collapsedWidth;

    const navItems = [
        {
            key: 'textSplit',
            label: t('textSplit.title'),
            value: `/projects/${selectedProject}/text-split`,
            href: `/projects/${selectedProject}/text-split`,
            icon: <ArticleOutlinedIcon />,
        },
        {
            key: 'questions',
            label: t('questions.title'),
            value: `/projects/${selectedProject}/questions`,
            href: `/projects/${selectedProject}/questions`,
            icon: <QuizOutlinedIcon />,
        },
        {
            key: 'datasets',
            label: t('datasets.management'),
            value: `/projects/${selectedProject}/datasets`,
            href: `/projects/${selectedProject}/datasets`,
            icon: <FolderOutlinedIcon />,
        },
        {
            key: 'settings',
            label: t('settings.title'),
            value: `/projects/${selectedProject}/settings`,
            href: `/projects/${selectedProject}/settings`,
            icon: <SettingsOutlinedIcon />,
        },
        {
            key: 'playground',
            label: t('playground.title'),
            value: `/projects/${selectedProject}/playground`,
            href: `/projects/${selectedProject}/playground`,
            icon: <TerminalOutlinedIcon />,
        },
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '80px', // Match Navbar height
                left: 0,
                height: 'calc(100vh - 80px)',
                width: currentWidth,
                minWidth: currentWidth,
                maxWidth: currentWidth,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start', // Align items to the start for consistent layout
                zIndex: 1100,
                bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
                // p: isExpanded ? 1 : 0, // Adjust padding based on expansion
                boxShadow: 3,
                borderRadius: 0,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                overflowX: 'hidden', // Hide horizontal overflow
                overflowY: 'auto', // Allow vertical scroll if content exceeds height
                '&::-webkit-scrollbar': { // For Webkit browsers
                    width: '8px',
                },
                '&::-webkit-scrollbar-thumb': { // For Webkit browsers
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': { // For Webkit browsers
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
                },
                scrollbarWidth: 'thin', // For Firefox
                scrollbarColor: `${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400]} ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]}`, // For Firefox
            }}
        >
            <Tabs
                orientation="vertical"
                value={pathname} // Ensure pathname is correctly used for active tab
                textColor="inherit"
                indicatorColor="primary" // Use primary color for indicator
                sx={{
                    width: '100%',
                    borderRight: `1px solid ${theme.palette.divider}`,
                    '& .MuiTab-root': {
                        minHeight: 56, // Consistent tab height
                        minWidth: currentWidth, // Tab takes full width
                        width: currentWidth,
                        padding: isExpanded ? '0 16px' : '0', // Adjust padding
                        display: 'flex',
                        flexDirection: isExpanded ? 'row' : 'column',
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        alignItems: 'center',
                        fontSize: '0.875rem', // Slightly smaller font
                        transition: 'all 0.2s',
                        color: theme.palette.text.secondary,
                        opacity: 0.8,
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            opacity: 1,
                        },
                        whiteSpace: 'nowrap', // Prevent text wrapping
                        lineHeight: 1.2,
                        textAlign: 'left',
                        '& .MuiTab-iconWrapper': {
                            marginRight: isExpanded ? theme.spacing(1.5) : 0,
                            marginBottom: isExpanded ? 0 : theme.spacing(0.5),
                            display: 'flex',
                            alignItems: 'center',
                        },
                    },
                    '& .Mui-selected': {
                        color: theme.palette.primary.main,
                        opacity: 1,
                        fontWeight: 600,
                        backgroundColor: theme.palette.action.selected,
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.primary.main,
                        left: 0,
                        right: 'auto',
                        width: 4,
                    },
                }}
            >
                {navItems.map((item) => (
                    <Tooltip title={isExpanded ? '' : item.label} placement="right" key={item.key}>
                        <Tab
                            value={item.value}
                            component={Link}
                            href={item.href}
                            icon={item.icon}
                            iconPosition="start"
                            label={isExpanded ? item.label : ''}
                            sx={{
                                justifyContent: isExpanded ? 'flex-start' : 'center',
                                '& .MuiTab-iconWrapper': {
                                    ...(!isExpanded && {
                                        width: '100%',
                                        justifyContent: 'center',
                                    }),
                                },
                            }}
                        />
                    </Tooltip>
                ))}
            </Tabs>
            <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push pin to bottom */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: isExpanded ? 'flex-end' : 'center', // Align button
                    alignItems: 'center',
                    p: 1,
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Tooltip title={isExpanded ? t('自动隐藏侧边栏') : t('固定侧边栏')} placement="right">
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand();
                        }}
                        sx={{
                            color: theme.palette.text.secondary,
                            transition: 'transform 0.3s, color 0.2s',
                            transform: isExpanded ? 'rotate(0deg)' : 'rotate(0deg)', // Keep icon upright or rotate if preferred
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            }
                        }}
                    >
                        {isExpanded ? <PushPinOutlinedIcon fontSize="small" /> : <PushPinIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
} 