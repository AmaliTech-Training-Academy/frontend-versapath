interface BadgeIconProps {
  size?: number;
  className?: string;
  showSubject?: boolean;
  subjectLine1?: string;
  subjectLine2?: string;
}

export function BadgeIcon({
  size = 100,
  className = "",
  showSubject = false,
  subjectLine1 = "JavaScript",
  subjectLine2 = "Essentials",
}: BadgeIconProps) {
  // Generate unique gradient ID to avoid conflicts when multiple badges are rendered
  const uniqueGradientId = `badgeGradient-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Scale factors based on size
  const isLarge = size > 150;
  const textSize = isLarge ? 16 : 10;
  const subjectTextSize = isLarge ? 20 : 12;

  return (
    <svg width={size} height={size} viewBox="0 0 280 280" className={className}>
      <defs>
        <linearGradient
          id={uniqueGradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#00708A" />
          <stop offset="100%" stopColor="#00252E" />
        </linearGradient>
      </defs>
      <polygon
        points="140,20 240,75 240,185 140,240 40,185 40,75"
        fill={`url(#${uniqueGradientId})`}
        stroke="#0e7490"
        strokeWidth="2"
      />
      <text
        x="140"
        y={showSubject ? "100" : "125"}
        textAnchor="middle"
        fill="white"
        fontSize={textSize}
        fontWeight="600"
      >
        VersaPath
      </text>
      <text
        x="140"
        y={showSubject ? "125" : "150"}
        textAnchor="middle"
        fill="white"
        fontSize={textSize}
        fontWeight="600"
      >
        Certified
      </text>
      {showSubject && (
        <>
          <text
            x="140"
            y="155"
            textAnchor="middle"
            fill="white"
            fontSize={subjectTextSize}
            fontWeight="700"
          >
            {subjectLine1}
          </text>
          <text
            x="140"
            y="180"
            textAnchor="middle"
            fill="white"
            fontSize={subjectTextSize}
            fontWeight="700"
          >
            {subjectLine2}
          </text>
        </>
      )}
    </svg>
  );
}
