function RejectedDialog({ reason }: { reason: string }) {
  return (
    <div>
      <p>{reason}</p>
    </div>
  );
}

export default RejectedDialog;
