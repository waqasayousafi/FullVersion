import { useEffect } from "react";
import Index from "./Index";

const WhiteThemePage = () => {
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    if (hadDark) root.classList.remove("dark");
    return () => {
      if (hadDark) root.classList.add("dark");
    };
  }, []);

  return <Index />;
};

export default WhiteThemePage;
