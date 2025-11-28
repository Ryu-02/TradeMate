interface FloatingAddButtonProps {
  onClick: () => void;
  label?: string;
}

export function FloatingAddButton({ onClick, label = "+ 새 매매 기록" }: FloatingAddButtonProps) {
  return (
    <button type="button" className="floating-add-button" onClick={onClick}>
      {label}
    </button>
  );
}
