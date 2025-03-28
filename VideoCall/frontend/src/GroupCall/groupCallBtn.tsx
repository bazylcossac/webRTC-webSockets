function GroupCallBtn({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return <button onClick={onClick}>{label}</button>;
}

export default GroupCallBtn;
