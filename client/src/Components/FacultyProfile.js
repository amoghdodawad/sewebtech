import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FacultyProfile.css';


const FacultyProfile = (props) => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/fetch/faculty/email/${props.email_id}`);
        try {
          const formatValue = (value, isNested = false) => {
            if (Array.isArray(value)) {
              return (
                <div>
                  {isNested ? (
                    <>
                      <strong style={{ fontSize: 'larger' }}>Academic Performance:</strong>
                      <hr /> {/* Optional: Add a horizontal line between each set of data */}
                    </>
                  ) : null}
                  {value.map((item, index) => (
                    <div key={index} style={{ marginLeft: '20px' }}>
                      {formatValue(item, true)}
                    </div>
                  ))}
                </div>
              );
            } else if (typeof value === 'object' && value !== null) {
              return (
                <div>
                  {Object.keys(value).map((key) => (
                    !['id', '_v'].includes(key) && (
                      <div key={key} style={{ display: 'flex', marginBottom: '10px' }}>
                        <strong style={{ marginRight: '10px' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                        <div>{formatValue(value[key])}</div>
                      </div>
                    )
                  ))}
                </div>
              );
            } else {
              return <div>{value}</div>;
            }
          };
          const formattedData = response.data.map((facultyMember) => (
            <div key={facultyMember._id} className="personal-details">
              <table border="1">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
            <th>Qualification</th>
            <th>Area of Specialization</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Mobile Number</th>
            <th>Date of Birth</th>
                    <th>Academic Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{facultyMember.name}</td>
                    <td>{facultyMember.email}</td>
                    <td>{facultyMember.designation}</td>
              <td>{facultyMember.qualification}</td>
              <td>{facultyMember.area_of_specialization}</td>
              <td>{facultyMember.address}</td>
              <td>{facultyMember.resi_contact_no}</td>
              <td>{facultyMember.mobile_no}</td>
              <td>{facultyMember.dob}</td>
                    <td>
                    <table border="1">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Board/University</th>
                      <th>Year of Passing</th>
                      <th>Class Obtained</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyMember.AcademicPerformance.map((performance, index2) => (
                      <tr key={index2}>
                        <td>{performance.course}</td>
                        <td>{performance.board_university}</td>
                        <td>{performance.year_of_passing}</td>
                        <td>{performance.class_obtained}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ));
          setFacultyData(formattedData);
        } catch (e) {
          console.log(`/fetch/faculty/email/${props.email_id}`);
          setFacultyData('Faculty data not found in faculty database ' + e);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
   }, [props.email_id]);

  //   fetchData();
  // }, [props.email_id]);
  //         const bdy=response.data.map((row, index) => (
  //           <div key={index} className="personal-details"> 
  //             {Object.keys(row).map((key) => (
  //               !['id', '_v'].includes(key) && (
  //                 <div key={key}>
  //                   <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {formatValue(row[key])}
  //                 </div>
  //               )
  //             ))}
  //             <hr /> {/* Optional: Add a horizontal line between each set of data */}
  //           </div>
  //         ))
  //         setFacultyData(bdy);
  //       } catch(e) {
  //         console.log(`http://localhost:3000/fetch/faculty/email/${props.email_id}`)
  //         setFacultyData('Faculty data not found in faculty database '+ e);
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [props.email_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="container">
      <h1>Personal Details</h1>
      {facultyData}
    </div>
  );
};

export default FacultyProfile;