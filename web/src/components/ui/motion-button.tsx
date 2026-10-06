import type { ComponentPropsWithoutRef, ReactNode, SVGProps } from "react";
import styles from "./motion-button.module.css";
import { ScrambleText } from "./scramble-text";

export function ArrowRightCircleIcon({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path strokeDasharray="60" d="M21 12c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9Z">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="60;0" />
        </path>
        <path strokeDasharray="12" strokeDashoffset="12" d="M7 12h9.5">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" to="0" />
        </path>
        <path strokeDasharray="8" strokeDashoffset="8" d="M17 12l-4 4M17 12l-4 -4">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" to="0" />
        </path>
      </g>
    </svg>
  );
}

type MotionButtonProps = { label: string; icon?: ReactNode } & (
  | ({ href: string } & ComponentPropsWithoutRef<"a">)
  | ({ href?: never } & ComponentPropsWithoutRef<"button">)
);

export default function MotionButton({ label, icon, className = "", ...props }: MotionButtonProps) {
  const content = (
    <>
      <span className={styles.text}>
        <span><ScrambleText text={label} /></span>
        <span aria-hidden="true"><ScrambleText text={label} /></span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        {icon ?? <ArrowRightCircleIcon />}
      </span>
    </>
  );
  const classes = `${styles.button} ${className}`;
  if ("href" in props && props.href) return <a {...props as ComponentPropsWithoutRef<"a">} className={classes}>{content}</a>;
  return <button type="button" {...props as ComponentPropsWithoutRef<"button">} className={classes}>{content}</button>;
}
