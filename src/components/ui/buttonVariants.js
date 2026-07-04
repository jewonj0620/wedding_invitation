const variantClasses = {
  primary: 'ui-button--primary',
  secondary: 'ui-button--secondary',
  outline: 'ui-button--outline',
  ghost: 'ui-button--ghost',
}

const sizeClasses = {
  default: 'ui-button--default',
  sm: 'ui-button--sm',
  lg: 'ui-button--lg',
  icon: 'ui-button--icon',
}

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function buttonVariants({
  variant = 'primary',
  size = 'default',
  className = '',
} = {}) {
  return joinClasses(
    'ui-button',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )
}
