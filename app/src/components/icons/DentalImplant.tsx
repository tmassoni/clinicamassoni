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
        {/* Crown — flat occlusal surface, not a dome */}
        <path d="M5.5 8.4V4.4A2.4 2.4 0 0 1 7.9 2h8.2a2.4 2.4 0 0 1 2.4 2.4v4Z" />
        {/* Abutment collar, breaking crown and screw into distinct parts */}
        <path d="M9 8.4v2.2h6V8.4" />
        {/* Screw body — gently tapered to a blunt tip */}
        <path d="M7.8 10.6 9.1 20.2c.1.9.8 1.6 1.7 1.6h2.4c.9 0 1.6-.7 1.7-1.6l1.3-9.6Z" />
        {/* Threads */}
        <path d="M9 14.4h6" />
        <path d="M9.5 18.2h5" />
      </svg>
    );
  },
);

DentalImplantIcon.displayName = "DentalImplantIcon";
