import { useSetAtom } from "jotai";
import mediaValues from "./mediaValues";
import { useEffect } from "react";
import { deviceAtom } from "./GlobalState";

export default function useResponsiveSetting() {
    // Responsive UI
    const setDevice = useSetAtom(deviceAtom)
    const handleResize = () => {
        if (window.innerWidth < mediaValues.landscapeCutoff) {
            setDevice("portrait")
        } else {
            setDevice("landscapeDesktop")
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, [window.innerWidth]);
}