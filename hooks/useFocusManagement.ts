import { useEffect, useRef, RefObject } from 'react';

/**
 * Manages focus for accessibility
 */
export const useFocusManagement = <T extends HTMLElement = HTMLElement>(
  shouldFocus: boolean,
  options?: { preventScroll?: boolean }
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus({ preventScroll: options?.preventScroll });
    }
  }, [shouldFocus, options?.preventScroll]);

  return ref;
};

/**
 * Traps focus within a container element
 */
export const useFocusTrap = (enabled: boolean, containerRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [enabled, containerRef]);
};

