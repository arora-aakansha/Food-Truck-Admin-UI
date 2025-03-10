import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

function createInitialState(dish) {
  return {
    itemId: dish?.itemId || null,
    itemName: dish?.name || "",
    itemPrice: dish?.price || "",
    pictureUrl: dish?.pictureUrl || "",
    description: dish?.description || "",
  };
}

export default function MenuDialogue({ buttonName, dish, setFoodItems }) {
  const [open, setOpen] = useState(false);
  const [localDish, setLocalDish] = useState(createInitialState(dish));

  useEffect(() => {
    setLocalDish(createInitialState(dish));
  }, [dish]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // Constructing the payload object explicitly
    const payload = {
      name: localDish.itemName, // Rename 'itemName' to 'name'
      price: localDish.itemPrice, // Rename 'itemPrice' to 'price'
      pictureUrl: localDish.pictureUrl, // Use 'pictureUrl' as is
      description: localDish.description, // Use 'description' as is
    };

    // Append 'itemId' only if it exists (for update scenarios)
    if (localDish.itemId) {
      payload.itemId = localDish.itemId;
    }
    const url = localDish.itemId
      ? `http://127.0.0.1:5000/item/update/${localDish.itemId}`
      : "http://127.0.0.1:5000/item/create";
    const method = localDish.itemId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const savedDish = await response.json();

      //Edit/ Update UI
      console.log(localDish);
      setFoodItems((prevItems) =>
        prevItems.map((item) =>
          item.itemId === localDish.itemId
            ? {
                ...localDish,
                name: localDish.itemName,
                price: localDish.itemPrice,
              }
            : item
        )
      );
      // Add new item UI
      if (localDish.itemId == null) {
        setFoodItems((prevItems) => [
          ...prevItems,
          {
            ...localDish,
            itemId: Date.now(),
            name: localDish.itemName,
            price: localDish.itemPrice,
          },
        ]);
        window.location.reload();
      }

      handleClose();
    } catch (error) {
      console.error("Save operation failed:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalDish((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonName}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>{buttonName}</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Name"
            name="itemName"
            value={localDish.itemName}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="Price"
            name="itemPrice"
            value={localDish.itemPrice}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            required
            label="Image link"
            name="pictureUrl"
            value={localDish.pictureUrl}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            label="Description"
            name="description"
            multiline
            maxRows={4}
            value={localDish.description}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
