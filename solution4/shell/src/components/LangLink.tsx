// LangLink.tsx
import { Link, useParams } from "react-router-dom";

export function LangLink({ to, ...props }: { to: string; [key: string]: any }) {
  const { lang } = useParams<{ lang: string }>();
  const fullPath = `/${lang}${to.startsWith("/") ? to : "/" + to}`;

  return <Link to={fullPath} {...props} />;
}
