import React from 'react';
import { ProfessionId } from '../../types/game';
import { FaceGroup } from './Face';
import { ItemIconGroup } from './ItemIcons';

export const ProfessionAvatar: React.FC<{
  professionId: ProfessionId;
  className?: string;
}> = ({ professionId, className = 'w-20 h-20' }) => {
  switch (professionId) {
    case 'teacher':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#DDD6FE" />
          {/* Hair back */}
          <circle cx="60" cy="30" r="14" fill="#6D4C41" />
          <path
            d="M34 55C34 38 45 28 60 28C75 28 86 38 86 55C86 68 80 76 60 76C40 76 34 68 34 55Z"
            fill="#6D4C41"
          />
          {/* Shoulders / Blazer */}
          <path
            d="M26 106C28 86 42 78 60 78C78 78 92 86 94 106H26Z"
            fill="#8B5CF6"
          />
          <path d="M50 78L60 95L70 78H50Z" fill="#FEF3C7" />
          {/* Neck & Face */}
          <rect x="54" y="68" width="12" height="14" rx="6" fill="#FBCFE8" />
          <rect x="38" y="36" width="44" height="38" rx="19" fill="#FDE2D2" />
          {/* Glasses */}
          <circle
            cx="50"
            cy="54"
            r="8"
            stroke="#4A2E2B"
            strokeWidth="2.5"
            fill="#FFFFFF"
            fillOpacity="0.35"
          />
          <circle
            cx="70"
            cy="54"
            r="8"
            stroke="#4A2E2B"
            strokeWidth="2.5"
            fill="#FFFFFF"
            fillOpacity="0.35"
          />
          <line
            x1="58"
            y1="54"
            x2="62"
            y2="54"
            stroke="#4A2E2B"
            strokeWidth="2.5"
          />
          {/* Eyes & Smile */}
          <circle cx="50" cy="54" r="2.5" fill="#311B18" />
          <circle cx="70" cy="54" r="2.5" fill="#311B18" />
          <path
            d="M54 64C56 67 64 67 66 64"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Hair Bangs */}
          <path
            d="M36 50C38 36 52 33 60 40C68 33 82 36 84 50C78 42 68 41 60 45C52 41 42 42 36 50Z"
            fill="#5D4037"
          />
          {/* Book icon */}
          <rect
            x="72"
            y="82"
            width="20"
            height="24"
            rx="3"
            fill="#0D9488"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>
      );

    case 'actor':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#FEF3C7" />
          {/* Neck */}
          <rect x="53" y="66" width="14" height="16" rx="5" fill="#F6CDB8" />
          {/* Shoulders / Cape */}
          <path
            d="M24 106C28 84 42 78 60 78C78 78 92 84 96 106H24Z"
            fill="#E11D48"
          />
          <path d="M46 78L60 96L74 78H46Z" fill="#FDE68A" />
          {/* Face */}
          <rect x="38" y="36" width="44" height="38" rx="19" fill="#FDE2D2" />
          {/* Curly Hair */}
          <path
            d="M34 52C32 34 46 24 62 26C78 26 88 36 86 52C80 42 70 38 60 40C48 38 40 42 34 52Z"
            fill="#4E342E"
          />
          <circle cx="49" cy="54" r="3" fill="#311B18" />
          <circle cx="71" cy="54" r="3" fill="#311B18" />
          <path
            d="M53 64C56 68 64 68 67 64"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Golden Theatre Mask badge */}
          <rect
            x="74"
            y="24"
            width="26"
            height="26"
            rx="8"
            fill="#F59E0B"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle cx="83" cy="34" r="2" fill="#FFFBEB" />
          <circle cx="91" cy="34" r="2" fill="#FFFBEB" />
          <path
            d="M82 41C85 44 89 44 92 41"
            stroke="#FFFBEB"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'programmer':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#DBEAFE" />
          {/* Neck */}
          <rect x="53" y="66" width="14" height="16" rx="5" fill="#F6CDB8" />
          {/* Hoodie */}
          <path
            d="M25 106C28 84 42 78 60 78C78 78 92 84 95 106H25Z"
            fill="#3B82F6"
          />
          {/* Face */}
          <rect x="38" y="35" width="44" height="38" rx="19" fill="#FDE2D2" />
          {/* Hair */}
          <path
            d="M35 49C36 32 48 25 62 25C76 25 85 34 85 49C77 40 66 38 58 40C48 38 41 42 35 49Z"
            fill="#3E2723"
          />
          {/* Eyes & Smile */}
          <circle cx="49" cy="53" r="3" fill="#1E293B" />
          <circle cx="71" cy="53" r="3" fill="#1E293B" />
          <path
            d="M54 63C57 66 63 66 66 63"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Laptop in front */}
          <rect
            x="38"
            y="82"
            width="44"
            height="24"
            rx="4"
            fill="#1E293B"
            stroke="#93C5FD"
            strokeWidth="2"
          />
          <circle cx="60" cy="94" r="3" fill="#60A5FA" />
          {/* Code tag bubble */}
          <rect
            x="72"
            y="20"
            width="32"
            height="20"
            rx="6"
            fill="#1D4ED8"
          />
          <text
            x="88"
            y="34"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {'</>'}
          </text>
        </svg>
      );

    case 'rescuer':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#FFEDD5" />
          {/* Neck */}
          <rect x="53" y="66" width="14" height="16" rx="5" fill="#F6CDB8" />
          {/* Orange MCHS Uniform */}
          <path
            d="M24 106C27 84 42 78 60 78C78 78 93 84 96 106H24Z"
            fill="#EA580C"
          />
          <rect x="42" y="88" width="36" height="6" rx="3" fill="#FDE047" />
          {/* Face */}
          <rect x="38" y="38" width="44" height="36" rx="18" fill="#FDE2D2" />
          {/* Rescue Helmet */}
          <path
            d="M32 44C34 26 46 20 60 20C74 20 86 26 88 44H32Z"
            fill="#F97316"
          />
          <rect x="30" y="41" width="60" height="6" rx="3" fill="#FB923C" />
          <rect x="52" y="25" width="16" height="10" rx="3" fill="#FEF08A" />
          {/* Eyes & Smile */}
          <circle cx="49" cy="55" r="3" fill="#1E293B" />
          <circle cx="71" cy="55" r="3" fill="#1E293B" />
          <path
            d="M54 65C57 68 63 68 66 65"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'firefighter':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#FEE2E2" />
          {/* Neck */}
          <rect x="53" y="66" width="14" height="16" rx="5" fill="#F6CDB8" />
          {/* Red Firefighter Uniform */}
          <path
            d="M24 106C27 84 42 78 60 78C78 78 93 84 96 106H24Z"
            fill="#DC2626"
          />
          <rect x="42" y="88" width="36" height="6" rx="3" fill="#FDE047" />
          {/* Face */}
          <rect x="38" y="38" width="44" height="36" rx="18" fill="#FDE2D2" />
          {/* Firefighter Helmet */}
          <path
            d="M30 44C32 24 46 18 60 18C74 18 88 24 90 44H30Z"
            fill="#991B1B"
          />
          <rect x="28" y="41" width="64" height="8" rx="3" fill="#FBBF24" />
          <rect x="52" y="22" width="16" height="12" rx="3" fill="#FDE047" />
          {/* Eyes & Smile */}
          <circle cx="49" cy="55" r="3" fill="#1E293B" />
          <circle cx="71" cy="55" r="3" fill="#1E293B" />
          <path
            d="M54 65C57 68 63 68 66 65"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'paramedic':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#FFE4E6" />
          {/* Neck */}
          <rect x="53" y="66" width="14" height="16" rx="5" fill="#F6CDB8" />
          {/* White & Red Medical Coat */}
          <path
            d="M24 106C27 84 42 78 60 78C78 78 93 84 96 106H24Z"
            fill="#FFFFFF"
            stroke="#FECDD3"
            strokeWidth="2"
          />
          <path d="M50 78L60 98L70 78H50Z" fill="#E11D48" />
          {/* Face */}
          <rect x="38" y="36" width="44" height="38" rx="19" fill="#FDE2D2" />
          {/* Hair */}
          <path
            d="M35 50C35 32 47 24 60 24C73 24 85 32 85 50C77 41 68 38 60 40C52 38 43 41 35 50Z"
            fill="#7C2D12"
          />
          {/* Eyes & Smile */}
          <circle cx="49" cy="54" r="3" fill="#1E293B" />
          <circle cx="71" cy="54" r="3" fill="#1E293B" />
          <path
            d="M54 64C57 67 63 67 66 64"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Red Cross Badge */}
          <circle
            cx="84"
            cy="30"
            r="13"
            fill="#E11D48"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <rect x="82" y="23" width="4" height="14" rx="1" fill="#FFFFFF" />
          <rect x="77" y="28" width="14" height="4" rx="1" fill="#FFFFFF" />
        </svg>
      );

    case 'police':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#E0E7FF" />
          {/* Neck */}
          <rect x="53" y="66" width="14" height="16" rx="5" fill="#F6CDB8" />
          {/* Dark Blue Police Uniform */}
          <path
            d="M24 106C27 84 42 78 60 78C78 78 93 84 96 106H24Z"
            fill="#1E3A8A"
          />
          <circle cx="72" cy="92" r="5" fill="#FBBF24" />
          {/* Face */}
          <rect x="38" y="38" width="44" height="36" rx="18" fill="#FDE2D2" />
          {/* Police Cap */}
          <path
            d="M32 42C34 25 46 20 60 20C74 20 86 25 88 42H32Z"
            fill="#1E40AF"
          />
          <rect x="28" y="40" width="64" height="6" rx="3" fill="#0F172A" />
          <circle cx="60" cy="31" r="5" fill="#FBBF24" />
          {/* Eyes & Smile */}
          <circle cx="49" cy="55" r="3" fill="#1E293B" />
          <circle cx="71" cy="55" r="3" fill="#1E293B" />
          <path
            d="M54 65C57 68 63 68 66 65"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'lawyer':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none">
          <circle cx="60" cy="60" r="54" fill="#F3E8FF" />
          {/* Neck */}
          <rect x="53" y="66" width="14" height="16" rx="5" fill="#F6CDB8" />
          {/* Classic Suit */}
          <path
            d="M24 106C27 84 42 78 60 78C78 78 93 84 96 106H24Z"
            fill="#4C1D95"
          />
          <path d="M52 78L60 98L68 78H52Z" fill="#FFFFFF" />
          <path d="M58 82L60 96L62 82H58Z" fill="#D97706" />
          {/* Face */}
          <rect x="38" y="36" width="44" height="38" rx="19" fill="#FDE2D2" />
          {/* Hair */}
          <path
            d="M35 49C36 32 48 25 60 25C74 25 84 33 85 49C77 40 68 38 60 40C50 38 42 41 35 49Z"
            fill="#4E342E"
          />
          {/* Eyes & Smile */}
          <circle cx="49" cy="54" r="3" fill="#1E293B" />
          <circle cx="71" cy="54" r="3" fill="#1E293B" />
          <path
            d="M54 64C57 67 63 67 66 64"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Scales of Justice Icon */}
          <circle
            cx="86"
            cy="32"
            r="14"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          <path
            d="M86 23V39M79 27H93M79 27L76 34H82L79 27ZM93 27L90 34H96L93 27Z"
            stroke="#B45309"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

export const ExplorerMascotIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg viewBox="0 0 260 280" className={className} fill="none">
    {/* Decorative soft clouds/sparkles */}
    <circle cx="135" cy="145" r="105" fill="#E0E7FF" fillOpacity="0.65" />
    <circle cx="52" cy="65" r="8" fill="#FBBF24" />
    <circle cx="218" cy="82" r="6" fill="#A78BFA" />
    {/* Backpack */}
    <rect x="115" y="150" width="85" height="95" rx="26" fill="#4338CA" />
    <rect x="135" y="165" width="52" height="55" rx="16" fill="#6366F1" />
    {/* Hoodie Body */}
    {/* Neck */}
    <rect x="121" y="144" width="28" height="36" rx="10" fill="#F6CDB8" />
    <path
      d="M65 268C70 198 96 172 135 172C174 172 198 198 205 268H65Z"
      fill="#6D28D9"
    />
    <path d="M114 172L135 215L156 172H114Z" fill="#EDE9FE" />
    {/* Backpack Straps */}
    <path
      d="M98 176C94 205 94 235 98 265"
      stroke="#312E81"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M172 176C176 205 176 235 172 265"
      stroke="#312E81"
      strokeWidth="12"
      strokeLinecap="round"
    />
    {/* Pointing Arm */}
    <path
      d="M78 208L42 178"
      stroke="#7C3AED"
      strokeWidth="22"
      strokeLinecap="round"
    />
    <circle cx="36" cy="172" r="12" fill="#FDE2D2" />
    {/* Head */}
    <rect x="93" y="78" width="84" height="78" rx="36" fill="#FDE2D2" />
    {/* Curly Brown Hair */}
    <path
      d="M84 108C82 68 106 52 136 52C168 52 190 70 186 108C174 88 156 80 135 84C114 80 96 88 84 108Z"
      fill="#4E342E"
    />
    {/* Eyes & Big Smile */}
    <circle cx="116" cy="116" r="5" fill="#1E1B4B" />
    <circle cx="154" cy="116" r="5" fill="#1E1B4B" />
    <circle cx="118" cy="114" r="1.8" fill="#FFFFFF" />
    <circle cx="156" cy="114" r="1.8" fill="#FFFFFF" />
    <path
      d="M122 135C128 143 142 143 148 135"
      stroke="#9A3412"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Blush */}
    <circle cx="105" cy="126" r="6" fill="#FCA5A5" fillOpacity="0.5" />
    <circle cx="165" cy="126" r="6" fill="#FCA5A5" fillOpacity="0.5" />
  </svg>
);

export const ProfessionSceneIllustration: React.FC<{
  professionId: ProfessionId;
  variant?: 'banner' | 'compact';
  className?: string;
}> = ({ professionId, className = 'w-full h-full' }) => {
  switch (professionId) {
    case 'teacher':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Warm Classroom Background */}
          <rect width="600" height="340" rx="24" fill="#FEF3C7" />
          <rect y="260" width="600" height="80" fill="#FDE68A" />
          {/* Classroom Window */}
          <rect
            x="40"
            y="36"
            width="110"
            height="150"
            rx="12"
            fill="#BAE6FD"
            stroke="#F59E0B"
            strokeWidth="8"
          />
          <line
            x1="95"
            y1="36"
            x2="95"
            y2="186"
            stroke="#F59E0B"
            strokeWidth="6"
          />
          <line
            x1="40"
            y1="111"
            x2="150"
            y2="111"
            stroke="#F59E0B"
            strokeWidth="6"
          />
          {/* Green Chalkboard */}
          <rect
            x="210"
            y="34"
            width="350"
            height="195"
            rx="14"
            fill="#065F46"
            stroke="#D97706"
            strokeWidth="10"
          />
          {/* Chalkboard writing */}
          <text
            x="395"
            y="102"
            fill="#A7F3D0"
            fontSize="26"
            fontWeight="800"
            fontFamily="Nunito, sans-serif"
          >
            Знания
          </text>
          <text
            x="385"
            y="136"
            fill="#A7F3D0"
            fontSize="26"
            fontWeight="800"
            fontFamily="Nunito, sans-serif"
          >
            меняют
          </text>
          <text
            x="405"
            y="170"
            fill="#A7F3D0"
            fontSize="26"
            fontWeight="800"
            fontFamily="Nunito, sans-serif"
          >
            мир!
          </text>
          <text
            x="245"
            y="88"
            fill="#FEF08A"
            fontSize="22"
            fontWeight="800"
            fontFamily="Nunito, sans-serif"
          >
            2 + 2 = 4
          </text>
          {/* Books on shelf */}
          <rect x="65" y="218" width="22" height="42" rx="4" fill="#EF4444" />
          <rect x="90" y="224" width="22" height="36" rx="4" fill="#3B82F6" />
          <rect x="115" y="214" width="22" height="46" rx="4" fill="#10B981" />
          {/* Teacher Character */}
          <circle cx="290" cy="96" r="24" fill="#5D4037" />
          {/* Neck */}
          <rect x="278" y="186" width="28" height="50" rx="10" fill="#F6CDB8" />
          <path
            d="M210 340C216 250 248 228 292 228C336 228 364 250 372 340H210Z"
            fill="#8B5CF6"
          />
          <path d="M268 228L292 276L316 228H268Z" fill="#FEF3C7" />
          {/* Teacher Head */}
          <rect x="250" y="118" width="84" height="78" rx="38" fill="#FDE2D2" />
          {/* Glasses */}
          <circle
            cx="274"
            cy="156"
            r="14"
            stroke="#4E342E"
            strokeWidth="3.5"
            fill="#FFFFFF"
            fillOpacity="0.3"
          />
          <circle
            cx="310"
            cy="156"
            r="14"
            stroke="#4E342E"
            strokeWidth="3.5"
            fill="#FFFFFF"
            fillOpacity="0.3"
          />
          <line
            x1="288"
            y1="156"
            x2="296"
            y2="156"
            stroke="#4E342E"
            strokeWidth="3.5"
          />
          <circle cx="274" cy="156" r="4" fill="#1E1B4B" />
          <circle cx="310" cy="156" r="4" fill="#1E1B4B" />
          <path
            d="M282 176C287 182 297 182 302 176"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Hair Front */}
          <path
            d="M244 148C246 112 270 104 292 114C314 104 338 112 340 148C326 130 308 126 292 132C276 126 258 130 244 148Z"
            fill="#5D4037"
          />
          {/* Pointer stick */}
          <line
            x1="358"
            y1="235"
            x2="395"
            y2="155"
            stroke="#FDE68A"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Teal Book in hand */}
          <rect
            x="236"
            y="252"
            width="54"
            height="68"
            rx="8"
            fill="#0F766E"
            stroke="#CCFBF1"
            strokeWidth="3"
          />
        </svg>
      );

    case 'actor':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="600" height="340" rx="24" fill="#2E1065" />
          {/* Stage Floor */}
          <rect y="255" width="600" height="85" fill="#78350F" />
          {/* Spotlights */}
          <polygon
            points="160,0 70,255 250,255"
            fill="#FDE047"
            fillOpacity="0.18"
          />
          <polygon
            points="440,0 350,255 530,255"
            fill="#FDE047"
            fillOpacity="0.18"
          />
          {/* Red Velvet Curtains */}
          <path d="M0 0H95C85 110 65 190 45 265H0V0Z" fill="#BE123C" />
          <path d="M600 0H505C515 110 535 190 555 265H600V0Z" fill="#BE123C" />
          <path
            d="M0 0H600V38C500 62 400 22 300 48C200 22 100 62 0 38V0Z"
            fill="#E11D48"
          />
          {/* Actor in center */}
          {/* Neck */}
          <rect x="286" y="182" width="28" height="46" rx="10" fill="#F6CDB8" />
          <path
            d="M225 340C235 245 262 220 300 220C338 220 365 245 375 340H225Z"
            fill="#D97706"
          />
          <rect x="260" y="118" width="80" height="74" rx="36" fill="#FDE2D2" />
          <path
            d="M254 145C254 112 276 102 300 104C324 102 346 112 346 145C332 128 316 124 300 128C284 124 268 128 254 145Z"
            fill="#4E342E"
          />
          <circle cx="284" cy="154" r="4" fill="#1E1B4B" />
          <circle cx="316" cy="154" r="4" fill="#1E1B4B" />
          <path
            d="M288 172C294 179 306 179 312 172"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Theatre Masks Floating */}
          <circle cx="155" cy="135" r="34" fill="#FEF3C7" />
          <g transform="translate(125 100) scale(0.5)">
            <FaceGroup emotion="joy" hair="none" />
          </g>
          <circle cx="445" cy="135" r="34" fill="#FEF3C7" />
          <g transform="translate(415 100) scale(0.5)">
            <FaceGroup emotion="sadness" hair="none" />
          </g>
        </svg>
      );

    case 'programmer':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="600" height="340" rx="24" fill="#1E293B" />
          {/* Code Window on Wall */}
          <rect
            x="50"
            y="38"
            width="240"
            height="160"
            rx="16"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="3"
          />
          <circle cx="72" cy="58" r="6" fill="#EF4444" />
          <circle cx="92" cy="58" r="6" fill="#F59E0B" />
          <circle cx="112" cy="58" r="6" fill="#10B981" />
          <text
            x="72"
            y="95"
            fill="#38BDF8"
            fontSize="16"
            fontFamily="monospace"
          >
            def check(a):
          </text>
          <text
            x="88"
            y="122"
            fill="#A7F3D0"
            fontSize="16"
            fontFamily="monospace"
          >
            if a &gt; 0:
          </text>
          <text
            x="104"
            y="149"
            fill="#FDE047"
            fontSize="16"
            fontFamily="monospace"
          >
            return "OK!"
          </text>
          {/* Programmer Character */}
          {/* Neck */}
          <rect x="388" y="180" width="28" height="52" rx="10" fill="#F6CDB8" />
          <path
            d="M320 340C328 248 358 224 402 224C446 224 474 248 482 340H320Z"
            fill="#2563EB"
          />
          <rect x="362" y="116" width="80" height="74" rx="36" fill="#FDE2D2" />
          <path
            d="M356 144C358 110 380 100 402 100C426 100 446 112 448 144C434 126 418 122 402 126C386 122 370 126 356 144Z"
            fill="#3E2723"
          />
          <circle cx="386" cy="152" r="4" fill="#1E1B4B" />
          <circle cx="418" cy="152" r="4" fill="#1E1B4B" />
          <path
            d="M392 170C397 176 407 176 412 170"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Laptop */}
          <rect
            x="335"
            y="245"
            width="134"
            height="78"
            rx="12"
            fill="#E2E8F0"
            stroke="#60A5FA"
            strokeWidth="4"
          />
          <circle cx="402" cy="284" r="10" fill="#3B82F6" />
        </svg>
      );

    case 'rescuer':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Winter Rescue Lake Scene from Reference */}
          <rect width="600" height="340" rx="24" fill="#DBEAFE" />
          <path d="M0 190Q150 170 300 190T600 185V340H0V190Z" fill="#EFF6FF" />
          {/* Ice Hole */}
          <ellipse cx="185" cy="245" rx="95" ry="42" fill="#1D4ED8" />
          <ellipse cx="185" cy="248" rx="78" ry="32" fill="#3B82F6" />
          {/* Child in ice hole waving for help */}
          <circle cx="185" cy="222" r="24" fill="#FDE2D2" />
          <path
            d="M162 214C164 196 174 190 185 190C196 190 206 196 208 214C198 206 190 204 185 206C178 204 170 206 162 214Z"
            fill="#4E342E"
          />
          <circle cx="177" cy="222" r="3" fill="#1E1B4B" />
          <circle cx="193" cy="222" r="3" fill="#1E1B4B" />
          {/* MCHS Rescuer in orange suit */}
          {/* Neck */}
          <rect x="431" y="180" width="28" height="45" rx="10" fill="#F6CDB8" />
          <path
            d="M355 340C365 245 395 215 445 215C495 215 525 245 535 340H355Z"
            fill="#EA580C"
          />
          <rect x="392" y="255" width="106" height="16" rx="6" fill="#FDE047" />
          <text
            x="445"
            y="268"
            textAnchor="middle"
            fill="#1E293B"
            fontSize="13"
            fontWeight="900"
          >
            МЧС РОССИИ
          </text>
          <rect x="405" y="118" width="80" height="72" rx="35" fill="#FDE2D2" />
          <path
            d="M396 135C400 100 420 90 445 90C470 90 490 100 494 135H396Z"
            fill="#F97316"
          />
          <circle cx="430" cy="154" r="4" fill="#1E1B4B" />
          <circle cx="460" cy="154" r="4" fill="#1E1B4B" />
          <path
            d="M435 170C440 175 450 175 455 170"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'firefighter':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Burning building background */}
          <rect width="600" height="340" rx="24" fill="#FEE2E2" />
          <rect x="80" y="80" width="200" height="220" rx="8" fill="#FCA5A5" />
          <rect x="110" y="120" width="40" height="50" rx="4" fill="#FDE68A" />
          <rect x="180" y="120" width="40" height="50" rx="4" fill="#FDE68A" />
          <rect x="110" y="200" width="40" height="60" rx="4" fill="#991B1B" />
          {/* Flames */}
          <path d="M100 80Q120 40 140 80Q160 40 180 80Q200 40 220 80" fill="#EF4444" />
          <path d="M110 80Q130 50 150 80Q170 50 190 80" fill="#F59E0B" />
          {/* Firefighter Character */}
          {/* Neck */}
          <rect x="431" y="180" width="28" height="45" rx="10" fill="#F6CDB8" />
          <path
            d="M355 340C365 245 395 215 445 215C495 215 525 245 535 340H355Z"
            fill="#DC2626"
          />
          <rect x="392" y="255" width="106" height="16" rx="6" fill="#FDE047" />
          <rect x="405" y="118" width="80" height="72" rx="35" fill="#FDE2D2" />
          <path
            d="M396 135C400 100 420 90 445 90C470 90 490 100 494 135H396Z"
            fill="#991B1B"
          />
          <circle cx="430" cy="154" r="4" fill="#1E293B" />
          <circle cx="460" cy="154" r="4" fill="#1E293B" />
          <path
            d="M435 170C440 175 450 175 455 170"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Fire hose */}
          <path
            d="M420 240Q380 260 340 280"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case 'paramedic':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="600" height="340" rx="24" fill="#FFE4E6" />
          {/* Ambulance silhouette in background */}
          <rect
            x="52"
            y="78"
            width="210"
            height="135"
            rx="20"
            fill="#FFFFFF"
            stroke="#FDA4AF"
            strokeWidth="4"
          />
          <rect x="52" y="138" width="210" height="22" fill="#E11D48" />
          <rect x="135" y="58" width="36" height="20" rx="8" fill="#3B82F6" />
          {/* Paramedic Character */}
          {/* Neck */}
          <rect x="391" y="180" width="28" height="48" rx="10" fill="#F6CDB8" />
          <path
            d="M320 340C330 245 360 220 405 220C450 220 480 245 490 340H320Z"
            fill="#E11D48"
          />
          <path d="M375 220L405 285L435 220H375Z" fill="#FFFFFF" />
          <rect x="365" y="116" width="80" height="74" rx="36" fill="#FDE2D2" />
          <path
            d="M358 144C360 110 382 98 405 98C428 98 450 110 452 144C438 126 420 122 405 126C390 122 372 126 358 144Z"
            fill="#7C2D12"
          />
          <circle cx="389" cy="152" r="4" fill="#1E1B4B" />
          <circle cx="421" cy="152" r="4" fill="#1E1B4B" />
          <path
            d="M395 170C400 176 410 176 415 170"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* First Aid Kit */}
          <rect
            x="170"
            y="185"
            width="145"
            height="110"
            rx="20"
            fill="#EF4444"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          <circle cx="242" cy="240" r="24" fill="#FFFFFF" />
          <rect x="237" y="224" width="10" height="32" rx="3" fill="#EF4444" />
          <rect x="226" y="235" width="32" height="10" rx="3" fill="#EF4444" />
        </svg>
      );

    case 'police':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="600" height="340" rx="24" fill="#E0E7FF" />
          {/* City buildings background */}
          <rect x="45" y="70" width="95" height="200" rx="8" fill="#C7D2FE" />
          <rect x="155" y="105" width="85" height="165" rx="8" fill="#A5B4FC" />
          <rect y="270" width="600" height="70" fill="#CBD5E1" />
          {/* Police Officer */}
          {/* Neck */}
          <rect x="384" y="182" width="28" height="46" rx="10" fill="#F6CDB8" />
          <path
            d="M310 340C320 245 352 220 398 220C444 220 476 245 486 340H310Z"
            fill="#1E3A8A"
          />
          <circle cx="428" cy="265" r="10" fill="#FBBF24" />
          <rect x="358" y="120" width="80" height="72" rx="35" fill="#FDE2D2" />
          {/* Police Hat */}
          <path
            d="M346 132C350 98 372 88 398 88C424 88 446 98 450 132H346Z"
            fill="#1D4ED8"
          />
          <rect x="340" y="128" width="116" height="10" rx="5" fill="#0F172A" />
          <circle cx="398" cy="110" r="8" fill="#FBBF24" />
          <circle cx="382" cy="154" r="4" fill="#1E1B4B" />
          <circle cx="414" cy="154" r="4" fill="#1E1B4B" />
          <path
            d="M388 172C393 177 403 177 408 172"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'lawyer':
      return (
        <svg
          viewBox="0 0 600 340"
          className={className}
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="600" height="340" rx="24" fill="#F3E8FF" />
          {/* Columns & Scales */}
          <rect x="55" y="45" width="38" height="230" rx="8" fill="#DDD6FE" />
          <rect x="115" y="45" width="38" height="230" rx="8" fill="#DDD6FE" />
          <circle cx="230" cy="165" r="52" fill="#FEF3C7" />
          <g transform="translate(188 123) scale(1.3)">
            <ItemIconGroup id="scales" />
          </g>
          {/* Lawyer Character */}
          {/* Neck */}
          <rect x="391" y="180" width="28" height="48" rx="10" fill="#F6CDB8" />
          <path
            d="M320 340C330 245 360 220 405 220C450 220 480 245 490 340H320Z"
            fill="#4C1D95"
          />
          <path d="M385 220L405 280L425 220H385Z" fill="#FFFFFF" />
          <rect x="365" y="116" width="80" height="74" rx="36" fill="#FDE2D2" />
          <path
            d="M358 144C360 110 382 98 405 98C428 98 450 110 452 144C438 126 420 122 405 126C390 122 372 126 358 144Z"
            fill="#4E342E"
          />
          <circle cx="389" cy="152" r="4" fill="#1E1B4B" />
          <circle cx="421" cy="152" r="4" fill="#1E1B4B" />
          <path
            d="M395 170C400 176 410 176 415 170"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};
