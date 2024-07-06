import React from 'react'
import PropTypes from 'prop-types'

const Iframe = ({ src, width = '100%', height = '600', title = 'Iframe' }) => {
  return (
    <iframe
      src={src}
      frameBorder="0"
      width="100%"
      height="500px"
      title={src}
      allowFullScreen
    ></iframe>
  )
}

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
}

export default Iframe
