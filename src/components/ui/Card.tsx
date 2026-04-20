import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

/**
 * Temel panel/kart kapsayıcı. `interactive` verilirse hover efektleri eklenir.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, interactive, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-glow-lg",
        interactive && "transition-transform duration-200 hover:-translate-y-1 hover:border-white/20",
        className,
      )}
      {...rest}
    />
  );
});
