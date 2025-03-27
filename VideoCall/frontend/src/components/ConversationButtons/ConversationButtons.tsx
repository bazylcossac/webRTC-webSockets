import styles from "./conversationbuttons.module.css";

function ConversationButtons() {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}>Mute</button>
      <button className={styles.button}>End call</button>
      <button className={styles.button}>Share screen</button>
    </div>
  );
}

export default ConversationButtons;
