import { useState, useRef, useEffect, useCallback } from 'react';

function useExpandableText() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const textRef = useRef(null);

  const toggleText = (event) => {
    if (event) event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const checkOverflow = useCallback(() => {
    if (textRef.current) {
      setIsOverflow(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkOverflow();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [checkOverflow]);

  return {
    isExpanded,
    isOverflow,
    toggleText,
    textRef,
  };
}

export default useExpandableText;
