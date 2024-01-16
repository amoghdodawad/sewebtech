import React, { useState, useEffect } from "react";

const SearchComponent = () => {
  const [fId, setFId] = useState("");
  const [result, setResult] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Fetch courses data from the server when fId changes
    if (formSubmitted && fId) {
      const numericFId = parseInt(fId);
      fetch(`http://localhost:5000/api/details/${numericFId}`)
        .then((response) => response.json())
        .then((data) => setResult(data))
        .catch((error) => console.log(error));
    }
  }, [fId, formSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can remove the useEffect block from here
    if (fId) {
      setFormSubmitted(true);
    } else {
      alert("Please enter a valid Faculty Id before submitting.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{fontWeight:'bold'}}>
          Enter fId:
          <input
            type="number"
            value={isNaN(fId) ? "" : fId} // Check if fId is a valid number
            onChange={(e) => setFId(e.target.value)}
            style={{ fontWeight:'bold',marginLeft:'10px',marginRight:'10px'}}
          />
        </label>
        <button type="submit" style={{fontWeight:'bold'}}>Submit</button>
      </form>
      
      {formSubmitted && result.length > 0 && (
      <div className="w-100 vh-100 d-flex justify-content-center" style={{marginTop:'20px'}}>
        <div className="w-50">
          <table style={{ border: "2px solid black" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "4px" }}>
                  Faculty Id
                </th>
                <th style={{ border: "1px solid black", padding: "4px" }}>
                  course Name
                </th>
                <th style={{ border: "1px solid black", padding: "4px" }}>
                  How Many Times
                </th>
                <th style={{ border: "1px solid black", padding: "4px" }}>
                  Course Code
                </th>
              </tr>
            </thead>
            <tbody>
              {result &&
                result.map((course) => {
                  return (
                    <tr>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {course.fId}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {course.courseName}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {course.howManyTimes}
                      </td>
                      <td style={{ border: "1px solid black", padding: "4px" }}>
                        {course.courseCode}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  );
};

export default SearchComponent;
