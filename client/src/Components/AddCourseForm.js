// src/components/AddCourseForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourseForm = ({ onAddCourse }) => {
  const [courses, setCourses] = useState([
    { courseName: "", howManyTimes: "", courseCode: "" },
    { courseName: "", howManyTimes: "", courseCode: "" },
    { courseName: "", howManyTimes: "", courseCode: "" },
  ]);
  const navigate = useNavigate();

  const handleInputChange = (index, fieldName, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][fieldName] = value;
    setCourses(updatedCourses);
  };

  const handleAddRow = () => {
    setCourses([
      ...courses,
      { courseName: "", howManyTimes: "", courseCode: "" },
    ]);
  };

  const handleAddCourse = async () => {
    if (
      courses.every(
        (course) =>
          course.courseName && course.howManyTimes && course.courseCode
      )
    ) {
      try {
        const response = await fetch("http://localhost:5000/api/addCourse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courses),
        });

        const data = await response.json();
        if (data.success) {
          // Optionally do something upon successful addition
          alert("Courses added successfully!");
          setCourses([
            { courseName: "", howManyTimes: "", courseCode: "" },
            { courseName: "", howManyTimes: "", courseCode: "" },
            { courseName: "", howManyTimes: "", courseCode: "" },
          ]);
        } else {
          alert("Failed to add courses. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDisplayCourses = () => {
    // Navigate to the DisplayCourses route
    navigate("/display");
  };

  const buttonStyles = {
    base: {
      backgroundColor: "white",
      color: "rgb(229, 49, 85)",
      fontWeight: "bold",
      fontFamily: "Poppins",
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
  };

  return (
    <div
      style={{
        background: "white",
        border: "2px solid rgb(241, 84, 116)",
        color: "rgb(229, 49, 85)",
        fontSize: "20px",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "12px",
        marginBottom: "20px", // Add some space at the bottom
        fontFamily: "Poppins",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "2px 2px 2px rgba(229, 49, 85)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Add Course</h2>
      <table style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>How Many Times?</th>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={course.courseName}
                  onChange={(e) =>
                    handleInputChange(index, "courseName", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                    borderColor: "black",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={course.howManyTimes}
                  onChange={(e) =>
                    handleInputChange(index, "howManyTimes", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                    borderColor: "black",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={course.courseCode}
                  onChange={(e) =>
                    handleInputChange(index, "courseCode", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    boxSizing: "border-box",
                    borderColor: "black",
                    borderRadius: "5px",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleAddRow}
          style={buttonStyles.base}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = buttonStyles.hover.backgroundColor;
            e.target.style.color = buttonStyles.hover.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = buttonStyles.base.backgroundColor;
            e.target.style.color = buttonStyles.base.color;
          }}
        >
          Add Row
        </button>
        <button
          onClick={handleAddCourse}
          style={buttonStyles.base}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = buttonStyles.hover.backgroundColor;
            e.target.style.color = buttonStyles.hover.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = buttonStyles.base.backgroundColor;
            e.target.style.color = buttonStyles.base.color;
          }}
        >
          Save
        </button>
        <button
          onClick={handleDisplayCourses}
          style={buttonStyles.base}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = buttonStyles.hover.backgroundColor;
            e.target.style.color = buttonStyles.hover.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = buttonStyles.base.backgroundColor;
            e.target.style.color = buttonStyles.base.color;
          }}
        >
          Display Courses
        </button>
      </div>
    </div>
  );
};

export default AddCourseForm;
