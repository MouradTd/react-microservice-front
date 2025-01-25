import React from "react";

interface ModalProps {
  title: string;
  id?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  id,
  className,
  size = "md",
  children,
}) => {
  return (
    <div
      id={id}
      className={`modal fade ${className || ""}`}
      data-bs-backdrop="static"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div
        className={`modal-dialog modal-dialog-centered ${
          size ? `modal-${size}` : ""
        }`}
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fw-bold">{title}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
