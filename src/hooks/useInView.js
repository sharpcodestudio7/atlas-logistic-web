'use client';
import { useState, useEffect, useRef } from 'react';

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);

  return [ref, v];
}
