'use client';

import {
  AppBar,
  Avatar,
  Box,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ModelSelect from './ModelSelect';

// 图标
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DataObjectIcon from '@mui/icons-material/DataObject';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';

export default function Navbar({ projects = [], currentProject, models = [] }) {
  const [selectedProject, setSelectedProject] = useState(currentProject || '');
  const { t } = useTranslation();
  const [selectedModel, setSelectedModel] = useState(() => {
    // 从 localStorage 获取上次选择的模型
    const savedModel = localStorage.getItem('selectedModel');
    // 如果保存的模型在当前模型列表中存在，则使用它
    if (savedModel && models.some(m => m.id === savedModel)) {
      return savedModel;
    }
    // 否则使用第一个可用的模型
    return models[0]?.id || '';
  });
  const pathname = usePathname();
  const theme = useMuiTheme();
  const { resolvedTheme, setTheme } = useTheme();
  // 优化断点：md 及以下都紧凑
  const isNarrow = useMediaQuery(theme.breakpoints.down('md'));

  // 判断是否为根目录页
  const isHome = pathname === '/';
  // 判断是否为项目页
  const isProjectPage = pathname.startsWith('/projects/');
  // 只在项目详情页显示模块选项卡
  const isProjectDetail = pathname.includes('/projects/') && pathname.split('/').length > 3;

  const handleProjectChange = (event) => {
    const newProjectId = event.target.value;
    setSelectedProject(newProjectId);
    // 跳转到新选择的项目页面
    window.location.href = `/projects/${newProjectId}/text-split`;
  };

  const handleModelChange = (event) => {
    if (!event || !event.target) return;
    const newModel = event.target.value;
    setSelectedModel(newModel);
    // 将选择保存到 localStorage
    localStorage.setItem('selectedModel', newModel);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      color={theme.palette.mode === 'dark' ? 'transparent' : 'primary'}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.mode === 'dark'
          ? 'background.paper'
          : 'primary.main',
      }}
      style={{ borderRadius: 0, zIndex: 99000 }}
    >
      <Toolbar sx={{ minHeight: '64px' }} style={{ zIndex: 99000, position: 'relative' }}>
        {/* 左侧Logo和项目选择 */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 2,
            '&:hover': { opacity: 0.9 }
          }}
            // 鼠标悬浮放大、动画效果
            style={{ cursor: 'pointer', '&:hover': { opacity: 0.9 } }}
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
                mr: 1.5,
                width: 36,
                height: 36
              }}
              variant="rounded"
            >
              <DataObjectIcon fontSize="small" />
            </Avatar>
            {/* Logo+名字：根目录页和项目页都响应式 */}
            {!((isHome || isProjectPage) && isNarrow) && (
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  letterSpacing: '-0.5px'
                }}
                className={theme.palette.mode === 'dark' ? 'gradient-text' : ''}
                color={theme.palette.mode === 'dark' ? 'inherit' : 'white'}
              >
                知造数据
              </Typography>
            )}
          </Box>

          {isProjectDetail && (<FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={selectedProject}
              onChange={handleProjectChange}
              displayEmpty
              variant="outlined"
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                '& .MuiSelect-icon': {
                  color: theme.palette.mode === 'dark' ? 'inherit' : 'white'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main'
                }
              }}
              MenuProps={{
                PaperProps: {
                  elevation: 2,
                  sx: { mt: 1, borderRadius: 2 }
                }
              }}
            >
              <MenuItem value="" disabled>
                {t('projects.selectProject')}
              </MenuItem>
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>)}

        </Box>

        {/* 中间的功能模块导航 */}
        {/* 中间的功能模块导航 */}

        {/* 右侧操作区 */}
        <Box sx={{ display: 'flex', flexGrow: 0, alignItems: 'center', gap: 2 }} style={{ position: 'absolute', right: '20px' }}>
          {/* 个人中心链接 */}
          <Tooltip title="个人中心">
            <Chip
              icon={<PersonIcon fontSize="small" />}
              {...(!((isHome || isProjectPage) && isNarrow) && { label: '个人中心' })}
              component={Link}
              href="/profile"
              clickable
              color="secondary"
              variant={pathname === '/profile' ? 'filled' : 'outlined'}
              sx={{
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)',
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
                }
              }}
            />
          </Tooltip>
          {/* 数据集广场链接 */}
          <Tooltip title={t('datasetSquare.title')}>
            <Chip
              icon={<StorageIcon fontSize="small" />}
              {...(!((isHome || isProjectPage) && isNarrow) && { label: t('datasetSquare.title') })}
              component={Link}
              href="/dataset-square"
              clickable
              color="secondary"
              variant={pathname === '/dataset-square' ? 'filled' : 'outlined'}
              sx={{
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)',
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'
                }
              }}
            />
          </Tooltip>
          {/* 模型选择 */}
          {location.pathname.includes('/projects/') && (
            <ModelSelect
              models={models}
              selectedModel={selectedModel}
              onChange={handleModelChange}
              minWidth={((isHome || isProjectPage) && isNarrow) ? 100 : 180}
            />
          )}
          {/* 语言切换器 */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <LanguageSwitcher />
          </Box>
          {/* 主题切换按钮 */}
          <Tooltip title={resolvedTheme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}>
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)',
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                p: 1,
                borderRadius: 1.5,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.25)'
                }
              }}
            >
              {resolvedTheme === 'dark' ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          {/* GitHub链接 */}
          <Tooltip title={t('common.visitGitHub')}>
            <IconButton
              onClick={() => window.open('https://git.nju.edu.cn/JianhaoSun/zhizaodata#', '_blank')}
              size="small"
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)',
                color: theme.palette.mode === 'dark' ? 'inherit' : 'white',
                p: 1,
                borderRadius: 1.5,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.25)'
                }
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
