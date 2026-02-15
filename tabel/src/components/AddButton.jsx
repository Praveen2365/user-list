import { useState } from 'react';

// Add custom styles directly in the component
const ButtonStyles = () => (
  <style jsx global>{`
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.1; }
      50% { opacity: 0.3; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-3px); }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%) rotate(45deg); }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animate-float {
      animation: float 2s ease-in-out infinite;
    }
    .animate-shimmer {
      animation: shimmer 2s infinite linear;
    }
  `}</style>
);

const Button = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  animateOnMount = false,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    if (disabled || isLoading) return;
    
    // Calculate ripple position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePosition({ x, y });
    
    if (onClick) onClick(e);
  };

  // Variant styles
  const variants = {
    primary: {
      base: 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600',
      hover: 'hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700',
      active: 'active:from-blue-800 active:via-blue-700 active:to-indigo-800',
      shadow: 'shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-600/30'
    },
    secondary: {
      base: 'bg-gradient-to-r from-gray-700 to-gray-800',
      hover: 'hover:from-gray-800 hover:to-gray-900',
      active: 'active:from-gray-900 active:to-black',
      shadow: 'shadow-md hover:shadow-lg shadow-gray-500/20 hover:shadow-gray-600/25'
    },
    success: {
      base: 'bg-gradient-to-r from-emerald-500 to-green-600',
      hover: 'hover:from-emerald-600 hover:to-green-700',
      active: 'active:from-emerald-700 active:to-green-800',
      shadow: 'shadow-lg hover:shadow-xl shadow-green-500/25 hover:shadow-green-600/30'
    },
    danger: {
      base: 'bg-gradient-to-r from-rose-500 to-red-600',
      hover: 'hover:from-rose-600 hover:to-red-700',
      active: 'active:from-rose-700 active:to-red-800',
      shadow: 'shadow-lg hover:shadow-xl shadow-rose-500/25 hover:shadow-rose-600/30'
    },
    outline: {
      base: 'bg-transparent border-2 border-blue-500 text-blue-600',
      hover: 'hover:bg-blue-50/50 hover:border-blue-600 hover:text-blue-700',
      active: 'active:bg-blue-100/50 active:border-blue-700',
      shadow: ''
    },
    ghost: {
      base: 'bg-transparent text-gray-700 hover:bg-gray-100/50',
      hover: 'hover:text-gray-900 hover:bg-gray-100/75',
      active: 'active:bg-gray-200/50',
      shadow: ''
    }
  };

  // Size styles
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  // Button base classes
  const baseClasses = `
    relative overflow-hidden
    rounded-xl font-semibold
    transition-all duration-300 ease-out
    transform ${isHovered ? 'scale-[1.02]' : 'scale-100'} ${isActive ? 'scale-95' : ''}
    ${animateOnMount ? 'animate-float' : ''}
    ${fullWidth ? 'w-full' : 'w-fit'}
    ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-blue-500/50
    active:scale-95
    select-none
  `;

  // Current variant
  const currentVariant = variants[variant];

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl">
      <div className="relative">
        <div className="w-5 h-5 border-2 border-current border-opacity-20 rounded-full" />
        <div className="absolute top-0 left-0 w-5 h-5 border-2 border-t-current border-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  // Icon component
  const IconComponent = () => (
    <span className={`
      inline-flex items-center justify-center 
      transition-all duration-300 
      ${isHovered && !isLoading ? 'scale-110' : 'scale-100'}
      ${iconPosition === 'right' && isHovered ? 'translate-x-1' : ''}
      ${iconPosition === 'left' && isHovered ? '-translate-x-1' : ''}
    `}>
      {icon}
    </span>
  );

  // Ripple effect component
  const RippleEffect = () => (
    <span 
      className={`
        absolute rounded-full bg-white/30
        transition-all duration-700 ease-out
        pointer-events-none
        ${isActive ? 'scale-150 opacity-0' : 'scale-0 opacity-100'}
      `}
      style={{
        width: '100px',
        height: '100px',
        left: ripplePosition.x - 50,
        top: ripplePosition.y - 50,
      }}
    />
  );

  return (
    <>
      <ButtonStyles />
      <div className={`flex ${fullWidth ? 'w-full' : ''} justify-end`}>
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsActive(false);
          }}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          disabled={disabled || isLoading}
          className={`
            ${baseClasses}
            ${currentVariant.base}
            ${currentVariant.hover}
            ${currentVariant.active}
            ${currentVariant.shadow}
            ${sizes[size]}
            ${className}
            group
          `}
        >
          {/* Shimmer effect layer */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
              -translate-x-full group-hover:translate-x-full
              transition-transform duration-1000 ease-in-out
              ${isHovered ? 'translate-x-full' : ''}
            `} />
          </div>

          {/* Diagonal shine effect */}
          <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
          </div>

          {/* Ripple effect */}
          <RippleEffect />

          {/* Pulsing border effect for outline variant */}
          {variant === 'outline' && (
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-500" />
          )}

          {/* Content */}
          <div className="relative flex items-center justify-center gap-3">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                {icon && iconPosition === 'left' && <IconComponent />}
                <span className="relative z-10 whitespace-nowrap drop-shadow-sm">
                  {text}
                </span>
                {icon && iconPosition === 'right' && <IconComponent />}
                
                {/* Arrow indicator for primary/success/danger variants */}
                {['primary', 'success', 'danger'].includes(variant) && !icon && (
                  <span className={`
                    inline-block transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                    text-sm
                  `}>
                    →
                  </span>
                )}
              </>
            )}
          </div>

          {/* Subtle glow effect */}
          {!disabled && !isLoading && ['primary', 'success', 'danger'].includes(variant) && (
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`
                absolute -inset-1 rounded-xl blur-md
                ${variant === 'primary' ? 'bg-blue-500/20' : ''}
                ${variant === 'success' ? 'bg-green-500/20' : ''}
                ${variant === 'danger' ? 'bg-rose-500/20' : ''}
              `} />
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default Button;