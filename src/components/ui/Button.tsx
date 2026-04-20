import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  primary: "bg-signal text-space-950 hover:bg-signal-soft shadow-glow",
  ghost: "bg-white/5 text-slate-100 hover:bg-white/10 border border-white/10",
  danger: "bg-rose-500 text-white hover:bg-rose-400",
};

const sizeClass: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "px-4 py-2.5",
  lg: "text-lg px-6 py-3",
};

/**
 * Genel amaçlı buton. Oyun ekranlarında ve menüde kullanılır.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...rest}
    />
  );
});
