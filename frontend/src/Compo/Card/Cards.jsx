import React from "react";
import { Navigate, useNavigate } from "react-router";
// import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import s1 from "../../assets/s1.jpeg";
import s2 from "../../assets/s2.jpeg";
import s3 from "../../assets/s3.webp";
import s4 from "../../assets/s4.png";
import s5 from "../../assets/s5.jpeg";
import s6 from "../../assets/s6.jpeg";

import { useSpring, animated } from "@react-spring/web";

import "./Card.css";
const Cards = () => {
  const Navigate = useNavigate();
  function viweMenu() {
    Navigate("/menu");
  }

  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });
  return (
    <>
      <div className="cards-container">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <img src={s1} alt="Service 1" />
            <div className="card-content">
              <h3>Food Delivery Services</h3>
              <p>
                In today’s fast-paced world, food delivery services have
                revolutionized the way we dine. Whether you’re at home, at work,
                or on the go, satisfying your cravings is just a click away!
              </p>
            </div>
          </div>
          <div className="card">
            <img src={s2} alt="Service 2" />
            <div className="card-content">
              <h3>Hotel Booking Service</h3>
              <p>
                Planning a trip can be overwhelming, but finding the perfect
                hotel shouldn’t be. Our hotel booking service makes it easy to
                find, compare, and book the best accommodations for your needs.
              </p>
            </div>
          </div>
          <div className="card">
            <img src={s3} alt="Service 3" />
            <div className="card-content">
              <h3>Online ordering systems</h3>
              <p>
                Online ordering systems have transformed how businesses operate,
                providing convenience and efficiency for both customers and
                vendors. Here are a few lines about online ordering systems that
                you can use on your website:
              </p>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <img src={s4} alt="Service 4" />
            <div className="card-content">
              <h3>Marketing and Promotion</h3>
              <p>
                Maximize your reach and attract more customers with our
                comprehensive marketing and promotion solutions.
              </p>
            </div>
          </div>
          <div className="card">
            <img src={s5} alt="Service 5" />
            <div className="card-content">
              <h3>Party Hall Rental</h3>
              <p>
                Make your special occasions unforgettable with our beautifully
                designed party halls, perfect for any event.
              </p>
            </div>
          </div>
          <div className="card">
            <img src={s6} alt="Service 6" />
            <div className="card-content">
              <h3>Inventory Management</h3>
              <p>
                Efficiently manage your stock and reduce operational costs with
                our advanced inventory management system.
              </p>
            </div>
          </div>
        </div>
      </div>
      <marquee>
        <h1 className="h1"> Welcome to the IndoFood</h1>
      </marquee>

      <animated.div style={styles} className="welcome-paragraph">
        where culinary delights and exceptional service meet in a cozy, inviting
        atmosphere. Indulge in a dining experience like no other, with dishes
        crafted from the freshest ingredients and a menu that caters to all
        palates. Whether you're here for a quick bite or a leisurely meal, our
        friendly staff and exquisite flavors are sure to make your visit
        unforgettable. Bon appétit!
      </animated.div>

      <div className="Card">
        <div className="Card-text">
          <h1>Diwali Delights</h1>
          <p>
            {" "}
            Savor festive flavors with our kesar-pista beverages &amp; mithai
            inspired desserts{" "}
          </p>
          <button onClick={viweMenu}> view Menu</button>
        </div>
      </div>
    </>
  );
};

export default Cards;
