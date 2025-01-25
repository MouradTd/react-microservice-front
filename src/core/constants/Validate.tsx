import React from "react";
import Modal from "./Modal";

interface ValidationModalProps {
  id: string;
  isLoading: boolean;
  method: (e: React.FormEvent<HTMLFormElement>) => void;
  itemid: number | undefined;
  title: string;
  message: string;
  severity: "success" | "danger";
}

export const Validate: React.FC<ValidationModalProps> = ({
  id,
  isLoading,
  method,
  itemid,
  title,
  message,
  severity,
}) => {
  return (
    <Modal id={id} title={title}>
      <form onSubmit={method}>
        <div className="modal-body">
          <input type="hidden" id="validateInput" value={itemid} />
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-label-outline-dark" data-bs-dismiss="modal">
            Fermer
          </button>
          <button
            type="submit"
            className={`${
              severity === "success" ? "btn btn-success me-0" : "btn btn-danger me-0"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="d-flex align-items-center">
                <div className="spinner-border spinner-border-sm text-white" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </span>
            ) : (
              <span>Oui, Valider</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
