import Carousel from "react-bootstrap/Carousel";
import s2 from "../../assets/int1.webp"; // Ensure the correct path
import s3 from "../../assets/int2.jpeg"; // Ensure this image path is also correct
import './Slider1.css'; // Import the CSS file

const Slider1 = () => {
  return (
    <Carousel  className='slid'>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img src={s2} alt="First slide" />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img src={s2} alt="Second slide" />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img src={s3} alt="Third slide" />
        </div>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>


  
  );
};

export default Slider1;
