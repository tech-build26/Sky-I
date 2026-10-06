import styles from "./scramble-text.module.css";

// Static accessible text and measured words never change; only the visual ink shuffles.
export function ScrambleText({ text }: { text: string }) {
  return <span className={styles.text} data-scramble>
    <span className={styles.accessible}>{text}</span>
    <span aria-hidden="true">{text.split(/(\s+)/).map((word, index) => /\s/.test(word) ? word : <span key={index} className={styles.word} data-scramble-word={word}>
      <span className={styles.measure}>{word}</span><span className={styles.ink} data-scramble-ink>{word}</span>
    </span>)}</span>
  </span>;
}
