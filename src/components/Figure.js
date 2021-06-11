import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";

const Figure = ({ src, alt, children, ...props }) => {
  return (
    <figure {...props}>
      <StaticImage src="/images/joshua-hall-photo.png" alt={alt} />
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
};

Figure.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Figure;
