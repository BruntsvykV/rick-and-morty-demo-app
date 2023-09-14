import * as React from "react";
import { SVGProps } from "react";
const FooterLogoShineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={250}
    height={250}
    viewBox="0 0 250 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_2_6)">
      <path
        d="M125 166C147.644 166 166 147.644 166 125C166 102.356 147.644 84 125 84C102.356 84 84 102.356 84 125C84 147.644 102.356 166 125 166Z"
        fill="url(#paint0_linear_2_6)"
        fillOpacity={0.8}
      />
    </g>
    <defs>
      <filter
        id="filter0_f_2_6"
        x={0}
        y={0}
        width={250}
        height={250}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation={42} result="effect1_foregroundBlur_2_6" />
      </filter>
      <linearGradient
        id="paint0_linear_2_6"
        x1={169}
        y1={84}
        x2={84}
        y2={163.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
export default FooterLogoShineIcon;
