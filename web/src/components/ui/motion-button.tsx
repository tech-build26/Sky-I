import type { ComponentPropsWithoutRef } from "react";
import styles from "./motion-button.module.css";
import { ScrambleText } from "./scramble-text";

type MotionButtonProps = { label: string } & (
  | ({ href: string } & ComponentPropsWithoutRef<"a">)
  | ({ href?: never } & ComponentPropsWithoutRef<"button">)
);

export default function MotionButton({ label, className = "", ...props }: MotionButtonProps) {
  const content = <><span className={styles.text}><span><ScrambleText text={label} /></span><span aria-hidden="true"><ScrambleText text={label} /></span></span><span className={styles.arrow} aria-hidden="true">↗</span></>;
  const classes = `${styles.button} ${className}`;
  if ("href" in props && props.href) return <a {...props as ComponentPropsWithoutRef<"a">} className={classes}>{content}</a>;
  return <button type="button" {...props as ComponentPropsWithoutRef<"button">} className={classes}>{content}</button>;
}
