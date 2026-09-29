import { useEffect, useRef, useState } from 'react';

/** Only a fresh Tab focus reveals this control, not browser-restored focus. */
export function SkipLink() {
  const link = useRef<HTMLAnchorElement>(null);
  const tabNavigation = useRef(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      tabNavigation.current = event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey;
    };
    const onKeyUp = () => { tabNavigation.current = false; };
    const reset = () => {
      tabNavigation.current = false;
      setKeyboardFocus(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      tabNavigation.current = false;
      // Keep a revealed link clickable until its click moves focus into main.
      if (!(event.target instanceof Node) || !link.current?.contains(event.target)) setKeyboardFocus(false);
    };
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('keyup', onKeyUp, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('blur', reset);
    window.addEventListener('pageshow', reset);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('keyup', onKeyUp, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('blur', reset);
      window.removeEventListener('pageshow', reset);
    };
  }, []);

  return <a
    ref={link}
    className="skip-link"
    href="#main-content"
    data-keyboard-focus={keyboardFocus ? 'true' : undefined}
    onFocus={() => setKeyboardFocus(tabNavigation.current)}
    onBlur={() => setKeyboardFocus(false)}
    onClick={event => {
      event.preventDefault();
      document.getElementById('main-content')?.focus({ preventScroll: true });
      setKeyboardFocus(false);
    }}
  >Skip to main content</a>;
}
