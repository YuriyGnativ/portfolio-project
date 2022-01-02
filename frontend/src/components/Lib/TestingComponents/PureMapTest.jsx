import React, { Component } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyCiBHOLoasDc-wjfhUkjXdDw3o2XxZnpD4",
  version: "weekly",
});
export default class extends Component {
  componentDidMount() {
    const elem = document.querySelector(".map");
    console.log(elem);
    loader.load().then((google) => {
      console.log(google);
      let map = new google.maps.Map(elem, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 1,
      });
      // console.log(map);
    });
  }
  render() {
    return (
      <div
        className="map"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "10px",
          border: "1px solid rgba(37, 37, 37, 0.925)",
        }}
      ></div>
    );
  }
}
