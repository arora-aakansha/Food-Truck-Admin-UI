import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button} from "react-bootstrap";
import { styled } from "@mui/material/styles";
import { Container } from "react-bootstrap";
import Footer from "../Sub_Components/Footer";
import Navbar_Menu from "../Sub_Components/NavbarMenu";
import ItemCard from "../Components/ItemCard";
import pizza from "../Images/pizza.jpg";
import burger from "../Images/hamburger.jpg";
import pasta from "../Images/pasta.jpg";
import fries from "../Images/fries.jpg"
import pancake from "../Images/pancake.jpg"
import omlette from "../Images/omlette.jpg"
import sandwich from "../Images/sandwich.jpg"
import tacos from "../Images/tortilla.jpg"
import sushi from "../Images/sushi.jpg"

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

export default function Homepage() {
  const staticFoodItems = [
    {
      itemId: 1,
      itemName: "Pizza",
      itemPrice: 12.99,
      description: "Delicious pizza topped with cheese, pepperoni, and veggies.",
      img: pizza,
    },
    {
      itemId: 2,
      itemName: "Burger",
      itemPrice: 9.99,
      description: "Classic beef burger served with lettuce, tomato, and fries.",
      img: burger,
    },
    {
      itemId: 3,
      itemName: "Pasta",
      itemPrice: 8.49,
      description: "Fresh garden pasta with mixed greens, tomatoes, cucumbers, and dressing.",
      img: pasta,
    },
    {
      itemId: 4,
      itemName: "Fries",
      itemPrice: 6.49,
      description: "Fresh garden pasta with mixed greens, tomatoes, cucumbers, and dressing.",
      img: fries,
    },
    {
      itemId: 5,
      itemName: "Omlette",
      itemPrice: 5.59,
      description: "Fresh garden pasta with mixed greens, tomatoes, cucumbers, and dressing.",
      img: omlette,
    },
    {
      itemId: 6,
      itemName: "Pancake",
      itemPrice: 7.89,
      description: "Fresh garden pasta with mixed greens, tomatoes, cucumbers, and dressing.",
      img: pancake,
    },
    {
      itemId: 7,
      itemName: "Sandwich",
      itemPrice: 8.99,
      description: "Fresh garden pasta with mixed greens, tomatoes, cucumbers, and dressing.",
      img: sandwich,
    },
    {
      itemId: 8,
      itemName: "Sushi",
      itemPrice: 15.59,
      description: "Fresh garden pasta with mixed greens, tomatoes, cucumbers, and dressing.",
      img: sushi,
    },
    {
      itemId: 9,
      itemName: "Tacos",
      itemPrice: 10.19,
      description: "Fresh garden pasta with mixed greens, tomatoes, cucumbers, and dressing.",
      img: tacos,
    },
  ];

  return (
    <div className="App">
      <header>
        <Navbar_Menu />
      </header>
      <main className="bg-light">
        <Container className="pt-5 pb-2">
          <div className="d-flex align-items-center justify-content-center">
          </div>
        </Container>
        <div className="album pt-2">
          <Container>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {staticFoodItems.map((item) => (
                <div className="mt-3" key={item.itemId}>
                  <ItemCard
                    itemId={item.itemId}
                    dish={item}
                    setFoodItems={() => {}} 
                  />
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-center">
            <Button variant="primary" href="/order_details" className="me-3">
              View Orders
            </Button>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  );
}
