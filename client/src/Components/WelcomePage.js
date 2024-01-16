// src/components/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
<link href='fonts/poppins.css' rel='stylesheet'></link>


const WelcomePage = () => {
  const buttonStyles = {
    base: {
      backgroundColor: "white",
      color: "rgb(229, 49, 85)",
      fontFamily: "Poppins",
      fontWeight: "bold",
      border: "2px solid rgb(241, 84, 116)",
      display: "flex",
      padding: "10px 15px",
      margin: "20px 0",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s, color 0.3s", // Added color transition
      boxShadow: "2px 2px 5px rgba(229, 49, 85)",
    },
    hover: {
      fontWeight: "bold",
      backgroundColor: "rgb(241, 84, 116)",
      color: "white",
      boxShadow: "2px 2px 2px rgba(229, 49, 85)",
    },
    addButton: {
      // Extra styles for the "ADD" button
      backgroundColor: "white",
      fontFamily: "Poppins",
      color: "rgb(229, 49, 85)",
      fontWeight: "bold",
      border: "2px solid rgb(241, 84, 116)",
      display: "flex",
      padding: "10px 29px",
      margin: "20px 0",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s, color 0.3s", // Added color transition
      boxShadow: "2px 2px 5px rgba(229, 49, 85)",
    },
  };

  return (
    <div
    style={{
      background: "white",
      border: "2px solid rgb(241, 84, 116)",
      color: "rgb(229, 49, 85)",
      fontSize: "20px",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "20px", // Add some space at the bottom
      fontFamily: "Poppins",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "2px 2px 5px rgba(229, 49, 85)"

    }} 
    >
      <h1>Welcome to Faculty-Course details Module</h1>
      <h2>Services offered :</h2>
      <br />
      <Link to="/add" style={{textDecoration: 'none'}}>
        <button title="Add your courses" 
          style={buttonStyles.addButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = buttonStyles.hover.backgroundColor;
            e.target.style.color = buttonStyles.hover.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = buttonStyles.base.backgroundColor;
            e.target.style.color = buttonStyles.base.color;
          }}>
          ADD
        </button>
      </Link>
      <br />
      <Link to="/display" style={{textDecoration: 'none'}}>
        <button title="Display the courses" 
        style={buttonStyles.base}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = buttonStyles.hover.backgroundColor;
          e.target.style.color = buttonStyles.hover.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = buttonStyles.base.backgroundColor;
          e.target.style.color = buttonStyles.base.color;
        }}>
          DISPLAY
        </button>
      </Link>
      <Link to="/search" style={{textDecoration: 'none'}}>
        <button title="search the courses" 
        style={buttonStyles.base}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = buttonStyles.hover.backgroundColor;
          e.target.style.color = buttonStyles.hover.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = buttonStyles.base.backgroundColor;
          e.target.style.color = buttonStyles.base.color;
        }}>
          SEARCH
        </button>
      </Link>
      <br/>
    </div>
  );
};

export default WelcomePage;
