import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type Ref,
  type ReactNode,
} from 'react';

import Button97 from './Button97';
import '../../styles/win97.css';

const WindowsLogo: React.FC = () => (
  <svg
    className="start-button-97__svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
  >
    <path fill="#f24323" d="M1 2.5 7.5 1.5v5l-6.5.5z" />
    <path fill="#ffd400" d="M8.5 1.3 15 0.5v6l-6.5.5z" />
    <path fill="#3cb44a" d="M1 8.5 7.5 8v5.5L1 14.5z" />
    <path fill="#0093dd" d="M8.5 7.8 15 7.5v6l-6.5.7z" />
  </svg>
);

const FALLBACK_EMOJI = '\u{1FA9F}';

const EmojiFallback: React.FC = () => (
  <span className="start-button-97__emoji" aria-hidden="true" role="img">
    {FALLBACK_EMOJI}
  </span>
);

export interface StartButton97Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: ReactNode;
  icon?: ReactNode;
  pressed?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StartButton97 = forwardRef(function StartButton97(
  {
    label = 'Start',
    icon,
    pressed = false,
    className,
    'aria-pressed': ariaPressed,
    size = 'md',
    children,
    ...rest
  }: StartButton97Props,
  ref: Ref<HTMLButtonElement>
) {
  const composedClassName = ['start-button-97', className].filter(Boolean).join(' ');
  const computedAriaPressed = ariaPressed ?? (pressed ? true : undefined);

  return (
    <Button97
      ref={ref}
      size={size}
      className={composedClassName}
      aria-pressed={computedAriaPressed}
      {...rest}
    >
      <span className="start-button-97__logo">
        {icon ?? (
          <>
            <WindowsLogo />
            <EmojiFallback />
          </>
        )}
      </span>
      <span className="start-button-97__label">{label}</span>
      {children}
    </Button97>
  );
});

export default StartButton97;
