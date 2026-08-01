import * as React from "react";

interface ToothShineIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Molar with a sparkle — the "plástica" in Cirurgia Plástica Periodontal,
 * which is aesthetic work on the gum and tooth. Follows lucide's stroke
 * conventions (24x24 viewBox, currentColor, round caps).
 *
 * The tooth geometry is baked at 0.9 scale rather than wrapped in a
 * transform, so the stroke stays at weight 2 and matches the sibling icons.
 */
export const ToothShineIcon = React.forwardRef<
  SVGSVGElement,
  ToothShineIconProps
>(
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
        <path d="M9.7 5.28C8.98 4.38 7.99 3.84 6.82 3.84 4.93 3.84 3.58 5.46 3.58 7.89c0 1.26.36 2.34.63 3.33.36.99.54 1.89.63 2.88l.18 1.98c.09.72.63 1.17 1.26 1.17s1.17-.45 1.26-1.17l.45-2.97c.09-.54.54-.9.99-.9h1.44c.45 0 .9.36.99.9l.45 2.97c.09.72.63 1.17 1.26 1.17s1.17-.45 1.26-1.17l.18-1.98c.09-.99.27-1.89.63-2.88.27-.99.63-2.07.63-3.33 0-2.43-1.35-4.05-3.24-4.05-1.17 0-2.16.54-2.88 1.44Z" />
        {/* Sparkle */}
        <path d="M19.9 2.1l.75 1.8 1.8.75-1.8.75-.75 1.8-.75-1.8-1.8-.75 1.8-.75z" />
      </svg>
    );
  },
);

ToothShineIcon.displayName = "ToothShineIcon";
