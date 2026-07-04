import { buttonVariants } from './buttonVariants'

export function Button({
  className = '',
  variant = 'primary',
  size = 'default',
  type = 'button',
  ...props
}) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      type={type}
      {...props}
    />
  )
}
