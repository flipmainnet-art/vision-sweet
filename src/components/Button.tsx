import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "default" | "small" | "large" | "icon";
  children: ReactNode;
};

export function Button({ variant = "secondary", size = "default", className = "", children, ...props }: Props) {
  return <button className={`ui-button ui-button--${variant} ui-button--${size} ${className}`} {...props}>{children}</button>;
}