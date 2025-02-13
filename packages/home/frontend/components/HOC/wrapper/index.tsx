import React, { FC, ReactNode } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';

export type WrapperBackground = 'white' | 'neutral-200';

export type WrapperProps = {
  children: ReactNode;
  background?: WrapperBackground;
  className?: string;
  clearDefaultStyles?: boolean;
};

const Wrapper: FC<WrapperProps> = ({ children, background = 'white', className, clearDefaultStyles }) => {
  const wrapperClassName = useClassNames(
    clearDefaultStyles ? [className] : [className, 'pl-8 md:pl-12 lg:px-20 xl:px-48'],
  );

  return (
    <div className={`bg-${background}`}>
      <div className={wrapperClassName}>{children}</div>
    </div>
  );
};

export default Wrapper;
