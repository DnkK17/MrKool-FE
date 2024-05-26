import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Logo from "../../../assets/images/Logo2.png";
import "../../../styles/footer.css";
import {
  RiPhoneFill,
  RiMailFill,
  RiMapPinFill,
  RiFacebookCircleFill,
  RiInstagramFill,
} from "@remixicon/react";

const Footer = () => {
  const handleCall = () => {
    const phoneNumber = "0903312258";
    const confirmCall = window.confirm(`Do you want to call ${phoneNumber}?`);
    if (confirmCall) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps?q=S1.02+Vinhome+Grandpark+Q9,+Ho+Chi+Minh+City,+Vietnam",
      "_blank"
    );
  };

  const sendEmail = () => {
    const email = "nhiphm302@gmail.com";
    window.location.href = `mailto:${email}`;
  };

  const openFacebookProfile = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=100068924952791",
      "_blank"
    );
  };

  const openInstagramProfile = () => {
    window.open("https://www.instagram.com/morethanhappy_cakedecor/", "_blank");
  };

  return (
    <footer className="footer">
        <Row>
          <Col lg={4} md={4} sm={6}>
            <div className="footer_logo text-start d-flex align-items-center">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="footer_logo">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam harum vero laudantium similique id nihil, ad
                veritatis fugit magnam maiores, omnis ut eius ducimus optio
                recusandae. Ab, magni et. Voluptatum!
              </p>
            </div>
          </Col>

          <Col lg={4} md={4} sm={6}>
            <h5 className="footer_title">Working Time</h5>
            <ListGroup className="delivery_time-list">
              <ListGroupItem className="delivery_time-item border-0 ps-0">
                <span>Monday - Sunday</span>
                <p>6:00am - 10:00pm</p>
                <p>
                  Our delivery service operates every day of the week, from
                  Monday to Sunday, ensuring that you can enjoy our delightful
                  treats whenever you desire. Whether it&apos;s an early morning
                  indulgence or a late-night craving, we&apos;re here to make
                  your day sweeter!
                </p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg={4} md={4} sm={6}>
            <h5 className="footer_title">Contact</h5>
            <ListGroup className="delivery_time-list">
              <ListGroupItem className="delivery_time-item border-0 ps-0">
                <span style={{ cursor: "pointer" }} onClick={openGoogleMaps}>
                  <RiMapPinFill /> S1.02 Vinhome Grandpark Q9, Ho Chi Minh City,
                    Vietnam
                </span>
              </ListGroupItem>
              <ListGroupItem className="delivery_time-item border-0 ps-0">
                <span style={{ cursor: "pointer" }} onClick={handleCall}>
                  <RiPhoneFill /> 0903312258
                </span>
              </ListGroupItem>
              <ListGroupItem className="delivery_time-item border-0 ps-0">
                <span style={{ cursor: "pointer" }} onClick={sendEmail}>
                  <RiMailFill /> nhiphm302@gmail.com
                </span>
              </ListGroupItem>
              <ListGroupItem className="delivery_time-item border-0 ps-0">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={openFacebookProfile}
                >
                  <RiFacebookCircleFill /> More Than Happy
                </span>
              </ListGroupItem>
              <ListGroupItem className="delivery_time-item border-0 ps-0">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={openInstagramProfile}
                >
                  <RiInstagramFill /> morethanhappy_cakedecor
                </span>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col lg="6" md="6">
            <p>&copy; 2023 - More Than Happy - Zane. All Rights Reserved.</p>
          </Col>
        </Row>
    </footer>
  );
};

export default Footer;
