import {
    RotatingText,
    RotatingTextContainer,
  } from '@/app/landing-page/components/animate-ui/primitives/texts/rotating';
  
  interface RotatingTextDemoProps {
    delay: number;
    y: number;
    duration: number;
    texts: string[];
    className?: string;
  }
  
  export const RotatingTextDemo = ({
    delay,
    y,
    duration,
    texts = [],  
    className,
  }: RotatingTextDemoProps) => {
    const defaultTexts = [
        'Join the community, set up your profile, and get started in seconds.',
        'Take part in fun challenges and exciting contests.',
        'Win rewards, badges, and real prizes.',
        'Celebrate your wins and inspire others.',
      ];
    return (
    <>
      <RotatingTextContainer
        key={delay}
        delay={delay}
        y={y}
        duration={duration}
        className={className || "text-4xl font-semibold"}
        text={texts.length > 0 ? texts : defaultTexts}
      >
        <RotatingText />
      </RotatingTextContainer>
    </>
    );
  };