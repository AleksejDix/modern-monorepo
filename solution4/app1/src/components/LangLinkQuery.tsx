import { Link, useSearchParams } from "react-router-dom";

export function LangLinkQuery({
  to,
  ...props
}: {
  to: string;
  [key: string]: any;
}) {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || 'en';

  // Create new URLSearchParams with all existing parameters
  const newSearchParams = new URLSearchParams(searchParams.toString());
  // Add or update lang parameter
  newSearchParams.set("lang", lang);

  // Build path without including language in the URL path, only in query string
  const fullPath = `${to.startsWith("/") ? to : "/" + to}?${newSearchParams.toString()}`;

  return <Link to={fullPath} {...props} />;
}
