export default function Logo() {
  return (
    <svg
      width="200"
      height="280"
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Homeground Coffee Logo"
    >
      <rect x="10" y="10" width="180" height="260" rx="90" fill="#F5F1E8" />

      <rect
        x="10"
        y="10"
        width="180"
        height="260"
        rx="90"
        stroke="#3D3026"
        strokeWidth="3"
        fill="none"
      />

      <rect
        x="15"
        y="15"
        width="170"
        height="250"
        rx="85"
        stroke="#C9A961"
        strokeWidth="2"
        fill="none"
      />

      <g transform="translate(100, 70)">
        <path
          d="M 0,-5 Q 2,-3 2,0 L 2,15 Q 2,18 0,20 Q -2,18 -2,15 L -2,0 Q -2,-3 0,-5 Z"
          fill="#C9A961"
          stroke="#3D3026"
          strokeWidth="1.5"
        />

        <ellipse cx="0" cy="-3" rx="3" ry="4" fill="#C9A961" stroke="#3D3026" strokeWidth="1.5" />
        <ellipse cx="0" cy="2" rx="2.5" ry="3.5" fill="#C9A961" stroke="#3D3026" strokeWidth="1.5" />

        <path
          d="M -8,8 Q -10,6 -12,8 L -15,12 Q -16,14 -14,15 Q -12,14 -11,12 Z"
          fill="none"
          stroke="#3D3026"
          strokeWidth="1.5"
        />
        <path
          d="M -18,0 Q -20,-2 -22,0 L -25,4 Q -26,6 -24,7 Q -22,6 -21,4 Z"
          fill="none"
          stroke="#3D3026"
          strokeWidth="1.5"
        />

        <path
          d="M 8,8 Q 10,6 12,8 L 15,12 Q 16,14 14,15 Q 12,14 11,12 Z"
          fill="none"
          stroke="#3D3026"
          strokeWidth="1.5"
        />
        <path
          d="M 18,0 Q 20,-2 22,0 L 25,4 Q 26,6 24,7 Q 22,6 21,4 Z"
          fill="none"
          stroke="#3D3026"
          strokeWidth="1.5"
        />

        <path
          d="M 0,-18 Q 2,-20 4,-18 L 7,-14 Q 8,-12 6,-11 Q 4,-12 3,-14 Z"
          fill="none"
          stroke="#3D3026"
          strokeWidth="1.5"
        />

        <path
          d="M 18,-12 L 16,-10 M 20,-14 L 18,-12"
          stroke="#3D3026"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 16,-8 L 18,-10"
          stroke="#3D3026"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="#3D3026"
        fontSize="12"
        fontFamily="Georgia, serif"
        letterSpacing="3"
      >
        ESTD 2024
      </text>

      <text
        x="100"
        y="165"
        textAnchor="middle"
        fill="#3D3026"
        fontSize="42"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        letterSpacing="2"
      >
        HOME
      </text>

      <text
        x="100"
        y="195"
        textAnchor="middle"
        fill="#3D3026"
        fontSize="42"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        letterSpacing="2"
      >
        GROUND
      </text>

      <line x1="60" y1="210" x2="85" y2="210" stroke="#3D3026" strokeWidth="2" />
      <line x1="115" y1="210" x2="140" y2="210" stroke="#3D3026" strokeWidth="2" />

      <text
        x="100"
        y="218"
        textAnchor="middle"
        fill="#3D3026"
        fontSize="16"
        fontFamily="Georgia, serif"
        letterSpacing="2"
      >
        COFFEE
      </text>

      <g transform="translate(100, 245)">
        <path
          d="M -20,0 L -15,-8 L -10,0 Z"
          fill="#C9A961"
          stroke="#3D3026"
          strokeWidth="1.5"
        />
        <path
          d="M -5,0 L 0,-5 L 5,0 Z"
          fill="#C9A961"
          stroke="#3D3026"
          strokeWidth="1.5"
        />

        <path
          d="M -25,2 Q -20,4 -15,4 Q -10,4 -5,2 Q 0,4 5,4 Q 10,4 15,2 Q 20,0 25,2"
          fill="none"
          stroke="#3D3026"
          strokeWidth="1.5"
        />
        <path
          d="M -25,6 Q -20,8 -15,8 Q -10,8 -5,6 Q 0,8 5,8 Q 10,8 15,6 Q 20,4 25,6"
          fill="none"
          stroke="#3D3026"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}
