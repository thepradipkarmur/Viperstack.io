import { useEffect, useRef, useState } from 'react';

/** True while the element is on screen — lets every live artifact pause when off-screen. */
export function useOnScreen<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, visible] as const;
}

/** setInterval that only ticks while `active` is true. */
export function useTicker(cb: () => void, ms: number, active: boolean) {
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => saved.current(), ms);
    return () => window.clearInterval(id);
  }, [ms, active]);
}

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export const clock = () => {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
};

/** Fictional demo accounts used across the simulations. */
export const ACCOUNTS = [
  { company: 'Northwind Labs', domain: 'northwindlabs.io', name: 'Maya Chen', title: 'VP Sales' },
  { company: 'Helix Freight', domain: 'helixfreight.com', name: 'Jordan Reyes', title: 'Head of RevOps' },
  { company: 'Lumen Health', domain: 'lumenhealth.co', name: 'Priya Nair', title: 'CRO' },
  { company: 'Cobalt Systems', domain: 'cobaltsys.ai', name: 'Lucas Meyer', title: 'Dir. Growth' },
  { company: 'Atlas Robotics', domain: 'atlasrobotics.dev', name: 'Sara Okafor', title: 'VP Marketing' },
  { company: 'Quartz Finance', domain: 'quartzfin.com', name: 'Ethan Brooks', title: 'Head of Sales' },
  { company: 'Verde Energy', domain: 'verde-energy.io', name: 'Ana Lima', title: 'COO' },
  { company: 'Pioneer Cloud', domain: 'pioneercloud.io', name: 'Noah Fischer', title: 'VP Partnerships' },
  { company: 'Orbit Analytics', domain: 'orbitanalytics.co', name: 'Lena Park', title: 'Sales Ops Lead' },
  { company: 'Summit Logistics', domain: 'summitlog.com', name: 'Omar Haddad', title: 'CEO' },
];
