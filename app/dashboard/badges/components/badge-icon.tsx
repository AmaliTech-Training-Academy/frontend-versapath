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
  const uniqueGradientId = `badgeGradient-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const isLarge = size > 150;
  const textSize = isLarge ? 13 : 12;
  const subjectTextSize = isLarge ? 20 : 16;
  const logoSize = isLarge ? 46 : 32;

  const logoY = showSubject ? 70 : 90;
  const text1Y = showSubject ? 95 : 130;
  const text2Y = showSubject ? 107 : 175;
  const subj1Y = 140;
  const subj2Y = 160;

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
      <image
        href="/Logo-white.svg"
        x={140 - logoSize / 2}
        y={logoY - logoSize / 2}
        width={logoSize}
        height={logoSize}
        aria-label="VersaPath Logo"
      />
      <text
        x="140"
        y={text1Y}
        textAnchor="middle"
        fill="white"
        fontSize={textSize}
        fontWeight="600"
      >
        VersaPath
      </text>
      <text
        x="140"
        y={text2Y}
        textAnchor="middle"
        fill="#FFC857"
        fontSize={textSize}
        fontWeight="600"
      >
        Certified
      </text>
      {showSubject && (
        <>
          <text
            x="140"
            y={subj1Y}
            textAnchor="middle"
            fill="white"
            fontSize={subjectTextSize}
            fontWeight="700"
          >
            {subjectLine1}
          </text>
          <text
            x="140"
            y={subj2Y}
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
