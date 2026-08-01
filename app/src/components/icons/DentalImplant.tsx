import * as React from "react";

interface DentalImplantIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Dental implant: prosthetic crown seated on a threaded titanium screw.
 * lucide-react has no dental icons, so this follows their stroke conventions
 * (24x24 viewBox, currentColor, round caps) to sit alongside them.
 */
export const DentalImplantIcon = React.forwardRef<
  SVGSVGElement,
  DentalImplantIconProps
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
        {/* Crown */}
        <path d="M5.5 9.2V6.4C5.5 3.9 8.4 2 12 2s6.5 1.9 6.5 4.4v2.8Z" />
        {/* Tapered screw body */}
        <path d="M7.6 10.8 10.9 21.6a1.15 1.15 0 0 0 2.2 0l3.3-10.8Z" />
        {/* Threads */}
        <path d="M8.9 14.6h6.2" />
        <path d="M10.1 18.6h3.8" />
      </svg>
    );
  },
);

DentalImplantIcon.displayName = "DentalImplantIcon";
