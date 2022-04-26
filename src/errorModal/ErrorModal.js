import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function ErrorModal(props) {
    return (
        <div>
            <Modal show={props.handleShow} onHide={props.handleClose}>
                <Modal.Body>{props.bodyMassage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        <span className="buttonError">{props.closeButton}</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ErrorModal