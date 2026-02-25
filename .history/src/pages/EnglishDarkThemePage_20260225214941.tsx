import { useEffect } from "react";
import EnglishIndex from "./EnglishIndex";

const EnglishDarkThemePage = () => {
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    if (!hadDark) root.classList.add("dark");
    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

  return <EnglishIndex />;
};

export default EnglishDarkThemePage;
