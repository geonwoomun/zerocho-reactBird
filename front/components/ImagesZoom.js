import React, { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import Slick from "react-slick"; // 이미지 슬라이더 역할
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

const SlickWrapper = styled.div`
  height: cacl(100% -44px);
  background: #090909;
`;
const CloseBtn = styled(Icon)`
  /*antd 덮어쓰기*/
  position: absolute;
  right: 0;
  top: 0;
  padding: 15;
  line-height: 14px;
  cursor: pointer;
`;

const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

const ImgWrapper = styled.div`
    padding : 32px;
    text-align : center;

    & img{
        margin : 0 auto;
        max-height : 750px;
    }
`;
const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn type="close" onClick={onClose} />
      </Header>
      <SlickWrapper>
        <Slick
          initialSlide={0}
          afterChange={slide => setCurrentSlide(slide)}
          infinite={false}
          arrowsslidesToShow={1}
          slidesToScroll={1}
        >
          {images.map(v => {
            return (
              <ImgWrapper>
                <img
                  src={`http://localhost:3065/${v.src}`}/>
              </ImgWrapper>
            );
          })}
        </Slick>
        <Indicator>
          <div>
            {currentSlide + 1}/{images.length}
          </div>
        </Indicator>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImagesZoom;
