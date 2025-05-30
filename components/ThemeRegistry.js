'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// 导入字体
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

// 推荐字体引入（如需在 public/index.html 或 _document.js 引入 Google Fonts，可加上）
// import '@fontsource/baloo-2/400.css';
// import '@fontsource/baloo-2/700.css';
// import '@fontsource/nunito/400.css';
// import '@fontsource/nunito/700.css';

// 创建主题配置
const getTheme = (mode) => {
  const mainColor = '#6A1B9A';
  const accentColor = '#FFD600';
  const backgroundColor = '#F3E8FF';

  // 辅助色 - 基于紫色的配色方案
  const dataVizColors = [
    '#9C27B0', // 深紫色
    '#7B1FA2', // 中紫色
    '#4A148C', // 暗紫色
    '#E1BEE7', // 浅紫色
    '#CE93D8', // 淡紫色
    '#BA68C8'  // 亮紫色
  ];

  // 状态色 - 协调的状态色
  const successColor = '#2E7D32'; // 深绿色
  const warningColor = '#F57F17'; // 琥珀色
  const errorColor = '#C62828';   // 深红色

  // 渐变色 - 紫色渐变方案
  const gradientPrimary = 'linear-gradient(90deg, #6A1B9A 0%, #BA68C8 100%)';

  // 根据模式调整颜色
  return createTheme({
    palette: {
      mode,
      primary: { main: mainColor, light: '#BA68C8', dark: '#4A148C', contrastText: '#fff' },
      secondary: { main: accentColor, contrastText: '#6A1B9A' },
      background: {
        default: mode === 'dark' ? '#121212' : backgroundColor,
        paper: mode === 'dark' ? '#1E1E1E' : '#fff',
        subtle: mode === 'dark' ? '#2C2C2C' : '#F8F9FA'
      },
      error: { main: '#E57373', dark: '#C62828', light: '#FFCDD2' },
      warning: { main: '#FFD600', dark: '#FFA000', light: '#FFF9C4' },
      success: { main: '#43A047', dark: '#2E7D32', light: '#A5D6A7' },
      text: {
        primary: mode === 'dark' ? '#E0E0E0' : '#2D2D2D',
        secondary: mode === 'dark' ? '#B0B0B0' : '#6A1B9A',
        disabled: '#BDBDBD',
      },
      divider: 'rgba(106,27,154,0.12)',
      dataViz: dataVizColors,
      gradient: {
        primary: gradientPrimary,
        accent: 'linear-gradient(90deg, #FFD600 0%, #BA68C8 100%)',
      }
    },
    typography: {
      fontFamily: '"Baloo 2", "Nunito", "Poppins", "Inter", "HarmonyOS Sans", "PingFang SC", "Microsoft YaHei", sans-serif',
      fontSize: 14,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.25,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: 1.35,
      },
      h5: {
        fontSize: '1.1rem',
        fontWeight: 700,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 700,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1.05rem',
        lineHeight: 1.7,
        fontWeight: 500,
      },
      body2: {
        fontSize: '0.95rem',
        lineHeight: 1.7,
        fontWeight: 400,
      },
      caption: {
        fontSize: '0.75rem', // 12px
        lineHeight: 1.5,
      },
      code: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.875rem',
      },
      button: {
        fontWeight: 700,
        letterSpacing: '0.04em',
        fontSize: '1.1rem',
      },
    },
    shape: { borderRadius: 24 },
    spacing: 8, // 基础间距单位为8px
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: theme.palette.mode === 'dark' ? '#4B5563 transparent' : '#9CA3AF transparent',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.mode === 'dark' ? '#4B5563' : '#9CA3AF',
              borderRadius: '4px',
            },
            background: theme.palette.background.default,
          },
          'code, pre': {
            fontFamily: '"JetBrains Mono", monospace',
          },
          '.gradient-text': {
            background: gradientPrimary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          },
        }),
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 24,
            fontWeight: 700,
            fontSize: '1.1rem',
            boxShadow: theme.palette.mode === 'dark' ? `0 4px 20px ${alpha(theme.palette.common.black, 0.35)}` : `0 4px 16px ${alpha(theme.palette.primary.main, 0.18)}`,
            background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            color: theme.palette.secondary.main,
            padding: '10px 28px',
            transition: theme.transitions.create(['background-color', 'box-shadow', 'background', 'color'], {
              duration: theme.transitions.duration.short,
            }),
            '&:hover': {
              background: 'linear-gradient(90deg, #9C27B0 0%, #FFD600 100%)',
              color: theme.palette.common.black,
              boxShadow: theme.shadows[6],
            }
          }),
          // disabled: ({ theme }) => ({
          //   boxShadow: 'none',
          //   ...(theme.palette.mode === 'dark' && {
          //     background: alpha(theme.palette.primary.dark, 0.4),
          //     color: alpha(theme.palette.secondary.main, 0.5),
          //   }),
          //   ...(theme.palette.mode === 'light' && {
          //     background: theme.palette.action.disabledBackground,
          //     color: theme.palette.action.disabled,
          //   }),
          // }),
          outlined: ({ theme }) => ({
            // borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.light, 0.7) : theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&:hover': {
              background: 'linear-gradient(90deg, #9C27B0 0%, #FFD600 100%)',
              color: theme.palette.common.black,
              boxShadow: theme.shadows[6],
            },
            '&.Mui-disabled': {
              borderColor: theme.palette.action.disabledBackground,
              color: alpha(theme.palette.secondary.main, 0.5),
            }
          }),
          contained: ({ theme }) => ({
            // borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.light, 0.7) : theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&:hover': {
              background: 'linear-gradient(90deg, #9C27B0 0%, #FFD600 100%)',
              color: theme.palette.common.black,
              boxShadow: theme.shadows[6],
            },
            '&.Mui-disabled': {
              borderColor: theme.palette.action.disabledBackground,
              color: alpha(theme.palette.secondary.main, 0.5),
            }
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            background: mode === 'dark' ? '#1A1A1A' : mainColor,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 24,
            boxShadow: '0 2px 12px rgba(106,27,154,0.08)',
            background: theme.palette.background.paper,
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 24,
            background: theme.palette.background.paper,
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontWeight: 700,
            fontSize: '1rem',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 600,
              backgroundColor: mode === 'dark' ? '#2A2A2A' : '#F3F4F6',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: '3px',
            borderRadius: '3px 3px 0 0',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            '&.Mui-selected': {
              fontWeight: 600,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: '1.25rem',
            fontWeight: 600,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            background: theme.palette.mode === 'dark' ? '#252525' : '#F3E8FF',
          })
        }
      },
    },
  });
};

export default function ThemeRegistry({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <InnerThemeRegistry>
        {children}
      </InnerThemeRegistry>
    </NextThemeProvider>
  );
}

function InnerThemeRegistry({ children }) {
  const { resolvedTheme } = useTheme();
  const theme = getTheme(resolvedTheme === 'dark' ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
