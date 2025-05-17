import { Link } from "react-router-dom";
import { useQueryState } from 'nuqs'

export function LangLinkQuery({
  to,
  ...props
}: {
  to: string;
  [key: string]: any;
}) {
  const [lang] = useQueryState('lang', {
    defaultValue: "de",
    clearOnDefault: false,
    history: "push",
  });

  const fullPath = `${to.startsWith("/") ? to : "/" + to}?lang=${lang}`;


  return <Link to={fullPath} {...props} />;
}
