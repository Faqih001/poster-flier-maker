import { useState, useEffect } from 'react';

// Define breakpoints (matching Tailwind's default breakpoints)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;
type ResponsiveValue<T> = {
  [key in Breakpoint | 'base']?: T;
};

/**
 * A hook that returns a value based on the current screen width
 * 
 * @param responsiveValues An object with screen breakpoints as keys and values for each breakpoint
 * @returns The value for the current screen width
 * 
 * @example
 * // Usage for font sizes
 * const fontSize = useResponsiveText({ 
 *   base: '16px',
 *   sm: '18px',
 *   md: '20px',
 *   lg: '24px',
 * });
 * 
 * // Or for class names
 * const headingClass = useResponsiveText({
 *   base: 'text-2xl',
 *   md: 'text-3xl',
 *   lg: 'text-4xl',
 * });
 */
export function useResponsiveText<T>(responsiveValues: ResponsiveValue<T>): T | undefined {
  const [currentValue, setCurrentValue] = useState<T | undefined>(() => {
    // Default to base value on initial render
    return responsiveValues.base;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Start with the base value
      let newValue = responsiveValues.base;
      
      // Check each breakpoint in ascending order and override if matched
      if (width >= breakpoints.sm && responsiveValues.sm !== undefined) {
        newValue = responsiveValues.sm;
      }
      
      if (width >= breakpoints.md && responsiveValues.md !== undefined) {
        newValue = responsiveValues.md;
      }
      
      if (width >= breakpoints.lg && responsiveValues.lg !== undefined) {
        newValue = responsiveValues.lg;
      }
      
      if (width >= breakpoints.xl && responsiveValues.xl !== undefined) {
        newValue = responsiveValues.xl;
      }
      
      if (width >= breakpoints['2xl'] && responsiveValues['2xl'] !== undefined) {
        newValue = responsiveValues['2xl'];
      }
      
      setCurrentValue(newValue);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [responsiveValues]);
  
  return currentValue;
}
