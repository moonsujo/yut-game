import { useEffect, useRef, useCallback } from "react";

/** Scroll to bottom whenever the element’s height actually changes */
export default function useAutoScroll(containerRef, deps = []) {
  const scroll = useCallback(() => {
    // You can also read containerRef.current.scrollHeight here
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initial scroll in case the list is already taller on first mount
    scroll();

    let rafId = null;

    const ro = new ResizeObserver(() => {
      // Wait one frame so the browser finishes layout **and** paint
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(scroll);
    });

    ro.observe(el);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, scroll, ...deps]);
}
