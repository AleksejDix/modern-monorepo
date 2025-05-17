import { Link } from "react-router-dom";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

export function LangLinkQuery({
  to,
  preserveParams = true,
  ...props
}: {
  to: string;
  preserveParams?: boolean;
  [key: string]: any;
}) {
  // Use nuqs directly since we're already using it
  const [lang] = useQueryState("lang", { defaultValue: "en" });
  
  // Memoize path construction to avoid recalculation on every render
  const fullPath = useMemo(() => {
    // Parse the destination URL to handle both path and existing query params
    const [path, existingQuery] = to.split('?');
    const searchParams = preserveParams && existingQuery 
      ? new URLSearchParams(existingQuery) 
      : new URLSearchParams();
    
    // Always set the language
    searchParams.set("lang", lang || 'en');
    
    // Handle hash fragments
    const [pathWithoutHash, hash] = path.split('#');
    const cleanPath = pathWithoutHash.startsWith("/") ? pathWithoutHash : "/" + pathWithoutHash;
    
    return `${cleanPath}${searchParams.toString() ? '?' + searchParams.toString() : ''}${hash ? '#' + hash : ''}`;
  }, [to, lang, preserveParams]);

  return <Link to={fullPath} {...props} />;
}
