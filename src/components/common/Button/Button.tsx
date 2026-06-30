import { forwardRef, type ButtonHTMLAttributes, type ForwardedRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  ghost: 'bg-transparent text-gray-800 hover:bg-gray-100',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = forwardRef(function Button(
  { children, className = '', variant = 'primary', size = 'md', disabled, ...rest }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const classes = [
    'inline-flex items-center justify-center rounded-md transition-colors focus:outline-none',
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
});

export default Button;
