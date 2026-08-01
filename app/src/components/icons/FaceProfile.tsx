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
    { className, size = 24, strokeWidth = 1.9, color = "currentColor", ...props },
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
        {/* Skull and neck */}
        <path d="M19.6 10.4C19.6 5.8 16 2.4 11.6 2.4S3.6 5.9 3.6 10.5c0 2 .6 3.5 1.6 4.7.4.5.6.9.6 1.5V22" />
        {/* Nose, lips, chin and jaw */}
        <path d="M18.6 13c.6.3.9.8.6 1.3l-.8 1.6c-.2.4-.6.7-1.1.7h-.6c-.6 0-1 .4-1 1v1.3c0 .9-.8 1.7-1.7 1.7h-3" />
        {/* Eye */}
        <circle cx="8.6" cy="10.2" r="1.3" />
      </svg>
    );
  },
);

FaceProfileIcon.displayName = "FaceProfileIcon";
