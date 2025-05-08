import React from "react";

interface ButtonContainerProps {
  nextText: string;
  cancelText?: string;
  onClick?: any;
  onCancel: any;
}

function ButtonContainer({
  nextText,
  cancelText,
  onClick,
  onCancel,
}: ButtonContainerProps) {
  return (
    <section className="button-container">
      {cancelText && (
        <button className="btn cancel-btn" onClick={onCancel} type="button">
          {cancelText}
        </button>
      )}

      <button
        className="btn next-btn"
        onClick={onClick && onClick}
        type="submit"
      >
        {" "}
        {nextText}{" "}
      </button>
    </section>
  );
}

export default ButtonContainer;
