import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import Logo from "../../../assets/images/Logo2.png";
import "../../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Row>
        <Col lg={6} md={6} sm={12}>
          <div className="footer_logo text-start d-flex align-items-center">
            <img src={Logo} alt="Logo" className="footer_logo-img" />
          </div>
          <div className="footer_content">
            <p>
              <strong>MRKOOL</strong> cung cấp dịch vụ sửa chữa máy lạnh chuyên nghiệp và tận tâm. Chúng tôi cam kết mang đến sự hài lòng cho khách hàng với dịch vụ chất lượng và uy tín.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam harum vero laudantium similique id nihil, ad veritatis fugit magnam maiores, omnis ut eius ducimus optio recusandae. Ab, magni et. Voluptatum!
            </p>
          </div>
        </Col>

        <Col lg={6} md={6} sm={12} className="content2">
          <h5 className="footer_title">Giờ Hoạt Động</h5>
          <ListGroup className="delivery_time-list">
            <ListGroupItem className="delivery_time-item border-0 ps-0">
              <span>Thứ Hai - Chủ Nhật</span>
              <p>6:00 sáng - 10:00 tối</p>
              <p>
                Dịch vụ sửa chữa máy lạnh của chúng tôi hoạt động mỗi ngày trong tuần, từ Thứ Hai đến Chủ Nhật, đảm bảo rằng bạn có thể nhận được dịch vụ của chúng tôi bất cứ khi nào bạn cần. Dù là bạn cần sửa chữa máy lạnh vào buổi sáng sớm hay vào lúc khuya, chúng tôi luôn sẵn sàng để giúp bạn!
              </p>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12} md={12} className="text-center">
          <p>&copy; 2023 - MRKOOL - Dịch vụ sửa chữa máy lạnh.</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
