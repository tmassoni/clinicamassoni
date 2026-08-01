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
        {/* Crown */}
        <path d="M4.6 8.4V6.5C4.6 4 6.6 2 9.1 2h5.8c2.5 0 4.5 2 4.5 4.5v1.9z" />
        {/* Abutment collar */}
        <path d="M7.4 8.4v2.2h9.2V8.4" />
        {/* Tapered screw body */}
        <path d="M8.4 10.6 11 21.3a1 1 0 0 0 2 0l2.6-10.7" />
        {/* Threads */}
        <path d="M8.9 13.2h6.2" />
        <path d="M9.5 16.2h5" />
        <path d="M10.2 19.2h3.6" />
      </svg>
    );
  },
);

DentalImplantIcon.displayName = "DentalImplantIcon";
