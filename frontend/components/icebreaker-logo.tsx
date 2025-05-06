export function IcebreakerLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ee444d" />
            <stop offset="100%" stopColor="#0088cc" />
          </linearGradient>
          <filter id="frosty" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur" />
            <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
            <feComponentTransfer in="offsetBlur" result="brightBlur">
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
            <feFlood floodColor="#0088cc" floodOpacity="0.3" result="glowColor" />
            <feComposite in="glowColor" in2="brightBlur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M20,50 L50,20 H250 L280,50 L250,80 H50 L20,50Z" fill="url(#logoGradient)" filter="url(#frosty)" />
        <text
          x="150"
          y="60"
          fontFamily="Arial, sans-serif"
          fontSize="36"
          fontWeight="bold"
          textAnchor="middle"
          fill="white"
          style={{ textTransform: "uppercase", letterSpacing: "2px" }}
        >
          ICEBREAKER
        </text>
      </svg>
    </div>
  )
}
