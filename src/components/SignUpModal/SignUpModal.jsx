import React from "react";
import Modal from "react-bootstrap/Modal";

const modal = (props) => (
  <Modal show size="lg" onHide={props.onCloseClick}>
    <Modal.Header>
      <Modal.Title>{props.header}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    <Modal.Footer>{props.buttons}</Modal.Footer>
  </Modal>
);

export default modal;
