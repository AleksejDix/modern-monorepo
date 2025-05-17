// LangLink.tsx
import { Link, useSearchParams } from "react-router-dom";

// Default language to use if none is specified in query parameters
const DEFAULT_LANGUAGE = "de";

export function LangLink({ to, ...props }: { to: string; [key: string]: any }) {
  // Step 1: Get current query parameters from the URL
  const [searchParams] = useSearchParams();

  // Step 2: Extract language from query parameters or use default if not present
  // Example: If URL is /some-page?filter=active&lang=fr, lang will be "fr"
  // If URL is /some-page?filter=active (no lang), lang will be "de" (default)
  const lang = searchParams.get("lang") || DEFAULT_LANGUAGE;

  // Step 3: Create a new URLSearchParams object with all existing parameters
  // This preserves all current query parameters like ?filter=active&sort=desc
  const newSearchParams = new URLSearchParams(searchParams.toString());

  // Step 4: Add or update the lang parameter to ensure it's always present
  // If lang=fr already exists, it will update it
  // If no lang exists, it will add it
  newSearchParams.set("lang", lang);

  // Step 5: Convert the search params to a string
  const queryString = newSearchParams.toString();

  // Step 6: Create the full path by combining:
  // - The target path (e.g., /dashboard)
  // - The query string (e.g., ?filter=active&lang=en)
  // Only adds ? if there are actually parameters
  const fullPath = `${to}${queryString ? `?${queryString}` : ""}`;

  // Step 7: Return a Link component with the constructed path
  // Example: If to="/dashboard" and current URL has ?filter=active
  // The Link will point to: /dashboard?filter=active&lang=en
  return <Link to={fullPath} {...props} />;
}

export function LangLinkQuery({
  to,
  ...props
}: {
  to: string;
  [key: string]: any;
}) {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || DEFAULT_LANGUAGE;
  const fullPath = `/${lang}${to.startsWith("/") ? to : "/" + to}`;

  return <Link to={fullPath} {...props} />;
}
