import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import I18nProvider from '@/components/I18nProvider';

export const metadata = {
  title: '知造数据',
  description: '智能数据集处理工具',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
