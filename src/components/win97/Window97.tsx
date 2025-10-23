import React, {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';

import '../../styles/win97.css';

type Dimension = number | string;

export interface Window97Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: ReactNode;
  width?: Dimension;
  height?: Dimension;
  resizable?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  children?: ReactNode;
}

const normalizeDimension = (value?: Dimension): Dimension | undefined => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

const Window97 = forwardRef(function Window97(
  {
    title,
    icon,
    width,
    height,
    resizable,
    className,
    style,
    children,
    onMinimize,
    onMaximize,
    onClose,
    ...rest
  }: Window97Props,
  ref: Ref<HTMLDivElement>
) {
  const composedClassName = [
    'window-97',
    'bevel-out',
    resizable ? 'window-97--resizable' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const composedStyle: CSSProperties = {
    width: normalizeDimension(width),
    height: normalizeDimension(height),
    ...style,
  };

  return (
    <div ref={ref} className={composedClassName} style={composedStyle} {...rest}>
      <div className="window-97__caption">
        <div className="window-97__caption-left">
          {icon ? <span className="window-97__icon">{icon}</span> : null}
          <span className="window-97__title">{title}</span>
        </div>
        <div className="window-97__controls" role="group" aria-label="Window controls">
          <button
            type="button"
            className="window-97__sys-btn bevel-out window-97__sys-btn--min"
            aria-label="Minimize"
            onClick={onMinimize}
          >
            <span className="window-97__glyph window-97__glyph--min" aria-hidden="true">
              <div />
            </span>
          </button>
          <button
            type="button"
            className="window-97__sys-btn bevel-out window-97__sys-btn--max"
            aria-label="Maximize"
            onClick={onMaximize}
          >
            <span className="window-97__glyph window-97__glyph--max" aria-hidden="true">
              <div />
              <div />
              <div />
              <div />
            </span>
          </button>
          <button
            type="button"
            className="window-97__sys-btn bevel-out window-97__sys-btn--close"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="window-97__glyph window-97__glyph--close" aria-hidden="true">
              <div />
              <div />
            </span>
          </button>
        </div>
      </div>
      <div className="window-97__content">{children}</div>
      {resizable ? <span className="window-97__resize-grip" aria-hidden="true" /> : null}
    </div>
  );
});

export default Window97;

/*
Plain HTML usage example:
<div class="window-97 bevel-out" style="width: 320px;">
  <div class="window-97__caption">
    <div class="window-97__caption-left">
      <span class="window-97__icon"></span>
      <span class="window-97__title">My Window</span>
    </div>
    <div class="window-97__controls" role="group" aria-label="Window controls">
      <button class="window-97__sys-btn bevel-out window-97__sys-btn--min" aria-label="Minimize">
        <span class="window-97__glyph window-97__glyph--min" aria-hidden="true"><div></div></span>
      </button>
      <button class="window-97__sys-btn bevel-out window-97__sys-btn--max" aria-label="Maximize">
        <span class="window-97__glyph window-97__glyph--max" aria-hidden="true">
          <div></div><div></div><div></div><div></div>
        </span>
      </button>
      <button class="window-97__sys-btn bevel-out window-97__sys-btn--close" aria-label="Close">
        <span class="window-97__glyph window-97__glyph--close" aria-hidden="true"><div></div><div></div></span>
      </button>
    </div>
  </div>
  <div class="window-97__content">
    Content goes here
  </div>
  <span class="window-97__resize-grip" aria-hidden="true"></span>
</div>
*/
