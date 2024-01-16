// src/components/DisplayCourses.js
import React, { useState, useEffect } from 'react';

const DisplayCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data from the server
    fetch('http://localhost:5000/api/getCourses') // Use the appropriate endpoint you've set up on your server
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) =>console.log(error))
  }, [])
  console.log('courses',courses)
  return (
    <div className="w-100 vh-100 d-flex justify-content-center" style={{fontFamily: "Poppins"}}>
      <div className='w-50'>
        <div style={{marginBottom: '20px', textAlign: 'center'}}>
          <h2>YOUR COURSES</h2>
        </div>
      <table style={{ border: '2px solid black' }}>
        <thead>
          <tr>
          <th style={{ border: '1px solid black' ,padding: '4px'}}>
              Faculty Id
            </th>
            <th style={{ border: '1px solid black' ,padding: '4px'}}>
              course Name
            </th>
            <th style={{ border: '1px solid black' ,padding: '4px'}}>
              How Many Times
            </th>
            <th style={{ border: '1px solid black' ,padding: '4px'}}>
              Course Code
            </th>
          </tr>
        </thead>
        <tbody>
          {
            courses && courses.map((course) => {
              return <tr>
                <td style={{ border: '1px solid black' ,padding: '4px'}}>{course.fId}</td>
                <td style={{ border: '1px solid black' ,padding: '4px'}}>{course.courseName}</td>
                <td style={{ border: '1px solid black' ,padding: '4px'}}>{course.howManyTimes}</td>
                <td style={{ border: '1px solid black' ,padding: '4px'}}>{course.courseCode}</td>
              </tr>

            })
          }
        </tbody>
      </table>
      </div>
    </div>
    
  );
};

export default DisplayCourses;
