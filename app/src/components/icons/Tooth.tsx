import * as React from "react";

interface ToothIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const ToothIcon = React.forwardRef<SVGSVGElement, ToothIconProps>(
  ({ className, size = 24, strokeWidth = 2, color = "currentColor", ...props }, ref) => {
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
        <path d="M12 2C9.5 2 8 3.5 8 5.5c0 .9.25 1.8.45 2.7C7.9 11.2 7.4 14.5 7.9 18c.2 1.4.9 2.3 1.8 2.3.9 0 1.2-1.3 1.4-2.7.1-.9.3-.9.5-.9s.4 0 .5.9c.2 1.4.5 2.7 1.4 2.7.9 0 1.6-.9 1.8-2.3.5-3.5 0-6.8-.55-9.8.2-.9.45-1.8.45-2.7C16 3.5 14.5 2 12 2z" />
      </svg>
    );
  }
);

ToothIcon.displayName = "ToothIcon";
