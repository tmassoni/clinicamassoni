import * as React from "react";

interface ToothGumIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Molar seated in gum tissue, with the gum line rising between the roots.
 * Periodontal work is all about that margin — recobrimento de recessões,
 * raízes expostas, gengivoplastia. Follows lucide's stroke conventions.
 */
export const ToothGumIcon = React.forwardRef<SVGSVGElement, ToothGumIconProps>(
  (
    { className, size = 24, strokeWidth = 2, color = "currentColor", ...props },
    ref,
  ) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...props}
      >
        {/* Molar: crown with two roots */}
        <path d="M5.2 6.6c0-2.4 1.7-4 3.7-4 1.1 0 2.1.4 3.1 1 1-.6 2-1 3.1-1 2 0 3.7 1.6 3.7 4 0 1.4-.4 2.6-.7 3.6-.3.9-.5 1.9-.6 2.9l-.3 2c-.1.7-.7 1.2-1.3 1.2s-1.2-.5-1.3-1.2l-.5-3.2c-.1-.6-.5-.9-1-.9h-.6c-.5 0-.9.3-1 .9l-.5 3.2c-.1.7-.7 1.2-1.3 1.2s-1.2-.5-1.3-1.2l-.3-2c-.1-1-.3-2-.6-2.9-.3-1-.7-2.2-.7-3.6Z" />
        {/* Gum line, peaking between the roots */}
        <path d="M2.8 21c1.6-2.2 3.6-3.3 5.6-3.3 1.5 0 2.7.6 3.6 1.5.9-.9 2.1-1.5 3.6-1.5 2 0 4 1.1 5.6 3.3" />
      </svg>
    );
  },
);

ToothGumIcon.displayName = "ToothGumIcon";
