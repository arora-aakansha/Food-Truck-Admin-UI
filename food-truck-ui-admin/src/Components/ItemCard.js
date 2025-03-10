import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuDialogue from "./MenuDialogue";
import ConfirmationDialog from "../Sub_Components/ConfirmationDialogue";

export default function ItemCard({ itemId, dish, setFoodItems }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    fetch(`http://127.0.0.1:5000/item/delete/${itemId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the item');
      }
      return response.json();
    })
    .then(data => {
      // console.log(data.message); // Optionally handle the message in the UI
      // Update the UI to reflect the deletion
      setFoodItems(prevItems => 
        prevItems.filter(item => item.itemId !== itemId)
      );
      setIsDialogOpen(false)
    })
    .catch(error => {
      console.error('Error deleting the item:', error);
    });
  };

  // Ensure dish is defined before accessing its properties
  if (!dish) {
    return null; // Render nothing if dish is undefined or null
  }

  const { pictureUrl, name: itemName, price, description } = dish; // Destructure dish object

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          src={pictureUrl || ""}
          className="card-img-top rounded"
          alt="Burgers"
          style={{ height: "225px", objectFit: "cover" }}
        />
        <div className="card-body">
          <div className="row justify-content-between text-start">
            <div className="col-4">
              <h4 className="text-bold fw-bold">{itemName}</h4>
            </div>
            <div className="col-4">
              <h5 className="text-muted">
                {"$ "}
                {price}
              </h5>
            </div>
          </div>
          <p className="text-start">{description}</p>

          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <MenuDialogue
                buttonName={"Edit item"}
                dish={dish}
                setFoodItems={setFoodItems}
              />
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => setIsDialogOpen(true)}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
        <ConfirmationDialog
          isOpen={isDialogOpen}
          handleClose={setIsDialogOpen}
          handleConfirm={handleDeleteConfirm}
          title="Confirm Deletion"
        >
          Are you sure you want to delete - {itemName}?
        </ConfirmationDialog>
      </div>
    </div>
  );
}
