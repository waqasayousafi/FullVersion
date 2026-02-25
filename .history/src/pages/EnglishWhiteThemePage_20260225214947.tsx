import { useEffect } from "react";
import EnglishIndex from "./EnglishIndex";

const EnglishWhiteThemePage = () => {
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    if (hadDark) root.classList.remove("dark");
    return () => {
      if (hadDark) root.classList.add("dark");
    };
  }, []);

  return <EnglishIndex />;
};

export default EnglishWhiteThemePage;
