export function BullseyeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="currentColor"
        strokeWidth="6"
        fill="none"
        opacity="0.3"
      />
      
      <circle
        cx="50"
        cy="50"
        r="26"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        opacity="0.5"
      />
      
      <circle
        cx="50"
        cy="50"
        r="14"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        opacity="0.7"
      />
      
      <circle
        cx="50"
        cy="50"
        r="6"
        fill="currentColor"
      />
      
      <line
        x1="72"
        y1="28"
        x2="50"
        y2="50"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      <path
        d="M 50 50 L 64 42 L 58 48 L 64 54 Z"
        fill="currentColor"
      />
    </svg>
  );
}
