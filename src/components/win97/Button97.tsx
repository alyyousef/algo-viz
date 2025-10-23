import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';

import '../../styles/win97.css';

type Button97Variant = 'default' | 'primary' | 'danger' | 'ghost';
type Button97Size = 'sm' | 'md' | 'lg';

export interface Button97Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Button97Variant;
  size?: Button97Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const cx = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(' ');

const Button97 = forwardRef(function Button97(
  {
    children,
    className,
    variant = 'default',
    size = 'md',
    iconLeft,
    iconRight,
    ...rest
  }: Button97Props,
  ref: Ref<HTMLButtonElement>
) {
  const composedClassName = cx(
    'btn-97',
    'bevel-out',
    `btn-97--${variant}`,
    `btn-97--${size}`,
    className
  );

  return (
    <button ref={ref} className={composedClassName} {...rest}>
      {iconLeft ? <span className="btn-97__icon btn-97__icon--left">{iconLeft}</span> : null}
      <span className="btn-97__label">{children}</span>
      {iconRight ? (
        <span className="btn-97__icon btn-97__icon--right">{iconRight}</span>
      ) : null}
    </button>
  );
});

export default Button97;

/*
Plain HTML usage example:
<button class="btn-97 bevel-out btn-97--primary btn-97--md">Start</button>
*/
