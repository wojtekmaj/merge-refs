import type * as React from 'react';

/**
 * A function that merges React refs into one.
 * Supports both functions and ref objects created using createRef() and useRef().
 *
 * Usage:
 * ```tsx
 * <div ref={mergeRefs(ref1, ref2, ref3)} />
 * ```
 *
 * @param {(React.Ref<T> | undefined)[]} inputRefs Array of refs
 * @returns {React.Ref<T> | React.RefCallback<T>} Merged refs
 */
export default function mergeRefs<T>(
  ...inputRefs: (React.Ref<T> | undefined)[]
): React.Ref<T> | React.RefCallback<T> {
  const filteredInputRefs = inputRefs.filter(Boolean);

  if (filteredInputRefs.length <= 1) {
    const firstRef = filteredInputRefs[0];

    return firstRef || null;
  }

  return function mergedRefs(ref) {
    let hasCleanup = false;

    const cleanups = filteredInputRefs.map((inputRef) => {
      if (typeof inputRef === 'function') {
        const cleanup = inputRef(ref);

        if (typeof cleanup === 'function') {
          hasCleanup = true;

          return cleanup;
        }

        return () => {
          inputRef(null);
        };
      }

      (inputRef as React.MutableRefObject<T | null>).current = ref;

      return () => {
        (inputRef as React.MutableRefObject<T | null>).current = null;
      };
    });

    if (hasCleanup) {
      return function cleanupRefs() {
        for (const cleanup of cleanups) {
          cleanup();
        }
      };
    }
  };
}
