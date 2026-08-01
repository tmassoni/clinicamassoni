import * as React from "react";

interface FaceProfileIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Head in profile with nose, chin and jawline — the visual shorthand the
 * buco-maxilo-facial specialty uses for its own branding. Follows lucide's
 * stroke conventions (24x24 viewBox, currentColor, round caps).
 */
export const FaceProfileIcon = React.forwardRef<
  SVGSVGElement,
  FaceProfileIconProps
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
        {/* Neck, skull, nose, lips, chin and jaw as one continuous outline */}
        <path d="M5 22v-4.1c0-.6-.2-1-.6-1.4-1.3-1.5-2-3.4-2-5.4C2.4 6.4 6.4 2.5 11.3 2.5c4.7 0 8.5 3.6 8.5 8 0 1.4-.5 2.3-1.2 3l1.3 1.7c.4.5.1 1.3-.5 1.5l-1.7.5v1.4c0 1.4-1.2 2.6-2.6 2.6h-3.3V22" />
        {/* Eye */}
        <circle cx="8.4" cy="10.8" r="1.15" />
      </svg>
    );
  },
);

FaceProfileIcon.displayName = "FaceProfileIcon";
