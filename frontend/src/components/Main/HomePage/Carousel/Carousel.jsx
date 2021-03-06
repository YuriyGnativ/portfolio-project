import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { Divider } from "semantic-ui-react";

import CustomDotGroup from "./CustomDotGroup";

const ImageCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={3}
    // naturalSlideWidth={1.5}
    naturalSlideHeight={1}
    totalSlides={3}
  >
    <Slider>
      <Slide tag="a" index={0}>
        {/* <Image src="./imgforslider/slider-4.jpg" /> */}
        <Image src="./imgforslider/slide-big.jpg" />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src="./imgforslider/slide-big.jpg" />
        {/* <Image src="./imgforslider/slider-4.jpg" /> */}
      </Slide>
      <Slide tag="a" index={2}>
        <Image src="./imgforslider/slide-big.jpg" />
        {/* <Image src="./imgforslider/slider-4.jpg" /> */}
      </Slide>
    </Slider>

    <Divider />
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);

export default ImageCarousel;
