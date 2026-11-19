import { ChineseRouteLanguage } from '@/components/providers/chinese-route-language';

/** The global application shell remains shared; Chinese page copy declares its own language. */
export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="zh-CN" dir="ltr">
      <ChineseRouteLanguage />
      {children}
    </div>
  );
}
