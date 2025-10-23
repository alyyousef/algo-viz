import React, {
  forwardRef,
  type Ref,
  type SelectHTMLAttributes,
} from 'react';

import '../../styles/win97.css';

export interface Select97Props
  extends SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string;
}

const Select97 = forwardRef(function Select97(
  { className, wrapperClassName, children, ...rest }: Select97Props,
  ref: Ref<HTMLSelectElement>
) {
  const wrapperClasses = ['select-97', 'bevel-in', wrapperClassName]
    .filter(Boolean)
    .join(' ');
  const controlClasses = ['select-97__control', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={wrapperClasses}>
      <select ref={ref} className={controlClasses} {...rest}>
        {children}
      </select>
    </span>
  );
});

export default Select97;
