import React, {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type Ref,
  type ReactNode,
} from 'react';

import '../../styles/win97.css';

export interface Menu97Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Menu97 = forwardRef(function Menu97(
  { className, children, role = 'menubar', ...rest }: Menu97Props,
  ref: Ref<HTMLDivElement>
) {
  const menuClassName = ['menu-97', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={menuClassName} role={role} {...rest}>
      {children}
    </div>
  );
});

export interface Menu97ItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Menu97Item = forwardRef(function Menu97Item(
  { className, type = 'button', children, ...rest }: Menu97ItemProps,
  ref: Ref<HTMLButtonElement>
) {
  const itemClassName = ['menu-97__item', className].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={itemClassName}
      role="menuitem"
      {...rest}
    >
      {children}
    </button>
  );
});

export interface Menu97DropdownProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Menu97Dropdown = forwardRef(function Menu97Dropdown(
  { className, children, role = 'menu', ...rest }: Menu97DropdownProps,
  ref: Ref<HTMLDivElement>
) {
  const dropdownClassName = ['menu-97__dropdown', 'bevel-out', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={dropdownClassName} role={role} {...rest}>
      {children}
    </div>
  );
});

export interface Menu97DropdownItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  shortcut?: ReactNode;
  children: ReactNode;
}

export const Menu97DropdownItem = forwardRef(function Menu97DropdownItem(
  {
    className,
    children,
    shortcut,
    type = 'button',
    ...rest
  }: Menu97DropdownItemProps,
  ref: Ref<HTMLButtonElement>
) {
  const dropdownItemClass = ['menu-97__dropdown-item', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={dropdownItemClass}
      role="menuitem"
      {...rest}
    >
      <span className="menu-97__label">{children}</span>
      {shortcut ? (
        <span className="menu-97__shortcut" aria-hidden="true">
          {shortcut}
        </span>
      ) : null}
    </button>
  );
});

export interface Menu97SeparatorProps {
  className?: string;
}

export const Menu97Separator: React.FC<Menu97SeparatorProps> = ({
  className,
}) => (
  <div
    role="separator"
    className={['menu-97__separator', className].filter(Boolean).join(' ')}
  />
);

export default Menu97;

/*
Plain HTML usage example:
<nav class="menu-97" role="menubar">
  <button class="menu-97__item" role="menuitem">File</button>
  <button class="menu-97__item" role="menuitem">Edit</button>
</nav>

<div class="menu-97__dropdown bevel-out" role="menu">
  <button class="menu-97__dropdown-item" role="menuitem">
    New<span class="menu-97__shortcut">Ctrl+N</span>
  </button>
  <div class="menu-97__separator" role="separator"></div>
  <button class="menu-97__dropdown-item" role="menuitem">Exit</button>
</div>
*/
