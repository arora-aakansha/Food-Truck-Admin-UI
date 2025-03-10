import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button as ButtonMI } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import "../Css/Homepage.css";
import Footer from "../Sub_Components/Footer";
import Navbar_Menu from "../Sub_Components/NavbarMenu";
import ItemCard from "../Components/ItemCard";
import MenuDialogue from "../Components/MenuDialogue";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  // Fetch all items from the backend on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/item/all');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const items = await response.json();
        setFoodItems(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array to run only on the first render


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text.split("\n").filter((row) => row.length).map((row) =>
        row.split(",").map((cell) => cell.trim())
      );
      const headers = rows[0];
      const itemsFromCSV = rows.slice(1).map((row) => {
        const item = {};
        row.forEach((cell, index) => {
          let propName = headers[index];
          if (propName.toLowerCase() === "price") propName = "itemPrice";
          item[propName] = cell;
        });
        return item;
      });

      setFoodItems(itemsFromCSV);

      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("http://127.0.0.1:5000/item/csv", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Failed to upload CSV");
        }
        // Add any response handling here
      } catch (error) {
        console.error("Error uploading CSV:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <header>
        <Navbar_Menu />
      </header>
      <main className="bg-light">
        <div className="row text-start pt-5 pb-2">
          <div className="col-5 d-flex align-items-center justify-content-center">
            <MenuDialogue buttonName={"Add item"} dish={{}} setFoodItems={setFoodItems} />
          </div>
          <div className="col-7 d-flex align-items-center justify-content-center">
            <ButtonMI component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload CSV file
              <VisuallyHiddenInput onChange={handleFileChange} accept=".csv" type="file" />
            </ButtonMI>
          </div>
        </div>
        <div className="album pt-2">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {foodItems.map((item, index) => (
                <div className="mt-3" key={index}>
                  <ItemCard
                    itemId={item.itemId || index} 
                    dish={item}
                    setFoodItems={setFoodItems}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
