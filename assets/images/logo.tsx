import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface LogoProps {
  size?: number;
  color?: string;
}

export default function Logo({ size = 100, color = '#FFFFFF' }: LogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Circle cx="50" cy="50" r="40" stroke={color} strokeWidth="4" />
      <Path
        d="M50 20C37.85 20 28 29.85 28 42C28 54.15 37.85 64 50 64C62.15 64 72 54.15 72 42C72 29.85 62.15 20 50 20ZM50 60C40.07 60 32 51.93 32 42C32 32.07 40.07 24 50 24C59.93 24 68 32.07 68 42C68 51.93 59.93 60 50 60Z"
        fill={color}
      />
      <Path
        d="M50 30C45.58 30 42 33.58 42 38C42 42.42 45.58 46 50 46C54.42 46 58 42.42 58 38C58 33.58 54.42 30 50 30ZM50 42C47.79 42 46 40.21 46 38C46 35.79 47.79 34 50 34C52.21 34 54 35.79 54 38C54 40.21 52.21 42 50 42Z"
        fill={color}
      />
      <Path
        d="M50 64C41.16 64 34 71.16 34 80H38C38 73.37 43.37 68 50 68C56.63 68 62 73.37 62 80H66C66 71.16 58.84 64 50 64Z"
        fill={color}
      />
      <Path
        d="M72 70L75.66 76.34L82 80L75.66 83.66L72 90L68.34 83.66L62 80L68.34 76.34L72 70Z"
        fill={color}
      />
    </Svg>
  );
}