import { useEffect } from "react";

export const useRestoreScrollById = (
  refs: React.MutableRefObject<Record<number, HTMLDivElement | null>>,
  keyName: string = "lessonId"
) => {
  useEffect(() => {
    const id = sessionStorage.getItem(keyName);
    if (id) {
      const el = refs.current[parseInt(id)];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      sessionStorage.removeItem(keyName);
      sessionStorage.removeItem("scrollY");
    }
  }, [refs, keyName]);
};
