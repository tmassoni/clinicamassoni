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
        <path d="M5.4 7.8V4.2A2.2 2.2 0 0 1 7.6 2h8.8a2.2 2.2 0 0 1 2.2 2.2v3.6Z" />
        {/* Screw body. Drawn open at the top so the crown's lower edge serves
            as the boundary — a closed shape would double that line. */}
        <path d="M8.4 7.8 9.4 19.9c.1 1 .9 1.9 1.9 1.9h1.4c1 0 1.8-.9 1.9-1.9l1-12.1" />
        {/* Threads */}
        <path d="M9.1 11.5h5.6" />
        <path d="M9.4 15h5" />
        <path d="M9.7 18.5h4.4" />
      </svg>
    );
  },
);

DentalImplantIcon.displayName = "DentalImplantIcon";
