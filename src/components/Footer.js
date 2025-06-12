import React from 'react';

function Footer() {
  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
    borderTop: '1px solid #eee',
    backgroundColor: '#f0f0f0', // Added
    color: '#333' // Added
  };
  return (
    <footer style={footerStyle} className="app-footer">
      <p>projecet</p>
    </footer>
  );
}

export default Footer;
