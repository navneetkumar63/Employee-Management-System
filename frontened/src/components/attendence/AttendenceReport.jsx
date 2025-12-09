{/*
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const AttendanceReport = () => {
  const[report,setReport]=useState({})
  const [limit,setLimit]=useState(5)
  const [skip,setSkip]=useState(0)
  const [dateFilter,setDateFilter]=useState()
  const [loading,setLoading]=useState(false)
  const fetchReport=async()=>{
try {
  setLoading(true)
  const query=new URLSearchParams({limit,skip})
  if(dateFilter){
    query.append('date',dateFilter)
  }
  const response = await axios.get(  `http://localhost:5000/api/attendance/report?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(response)

  if (response.data.success) {
    
    if(skip ==0){
      setReport(response.data.groupData)
    }else{
      setReport((prevData)=>({...prevData,...response.data.groupData}))
    }
    
  }
  setLoading(false)
} catch (error) {
  if (error.response && !error.response.data.success) {
    console.error(
      " report error:",
      error.response?.data || error.message
    );
  }
} 
  }
  useEffect(()=>{
fetchReport()
  },[skip,dateFilter])

  const handleLoad=()=>{
    setSkip((prevSkip) => prevSkip + limit)
  }
  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendence Report</h2>
      <div>
        <h2 className="text-xl font-semibold">Filter By date</h2>
        <input type="date" className="border bg-gray-100" onChange={(e)=>{setDateFilter(e.target.value),
          setSkip(0)
        }} />
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        Object.entries(report).map(([date, record]) => (
          <div className="mt-4 " key={date}>
            <h2 className="text-xl font-semibold">{date}</h2>
            <table className="" border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>S no</th>

                  <th>Employee Id</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {record.map((data, i) => (
                  <tr key={data.employeeId}>
                    <td>{i + 1}</td>

                    <td>{data.employeeId}</td>
                    <td>{data.employeeName}</td>
                    <td>{data.departmentName}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      <button
        className="px-4 py-2 border bg-gray-100 text-lg font-semibold"
        onClick={handleLoad}
      >
        Load More{" "}
      </button>
    </div>
  );
}

export default AttendanceReport
*/}

import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const { data } = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        setReport((prevReport) => {
          const newReport = { ...prevReport };
          Object.entries(data.groupData).forEach(([date, records]) => {
            if (newReport[date]) {
              newReport[date] = [...newReport[date], ...records];
            } else {
              newReport[date] = records;
            }
          });
          return newReport;
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Report error:", error.response?.data || error.message);
    }
  };

  // Fetch data when skip or dateFilter changes
  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoad = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
    setSkip(0);
    setReport({}); // reset report for new filter
  };

  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>

      <div className="my-4">
        <h2 className="text-xl font-semibold">Filter By Date</h2>
        <input
          type="date"
          className="border bg-gray-100 px-2 py-1"
          value={dateFilter}
          onChange={handleDateChange}
        />
      </div>

      {loading && <div>Loading...</div>}

      {!loading && Object.keys(report).length === 0 && (
        <div>No records found</div>
      )}

      {!loading &&
        Object.keys(report)
          .sort((a, b) => new Date(b) - new Date(a)) // newest date first
          .map((date) => {
            const records = report[date];
            return (
              <div key={date} className="mt-6">
                <h3 className="text-xl font-semibold">{date}</h3>
                <table className="w-full border-collapse border" cellPadding="10">
                  <thead>
                    <tr>
                      <th>S No</th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec, i) => (
                      <tr key={`${rec.employeeId}-${i}`} className="text-center">
                        <td>{i + 1}</td>
                        <td>{rec.employeeId}</td>
                        <td>{rec.employeeName}</td>
                        <td>{rec.departmentName}</td>
                        <td>{rec.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}

      {Object.keys(report).length > 0 && (
        <button
          className="mt-4 px-4 py-2 border bg-gray-100 text-lg font-semibold"
          onClick={handleLoad}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default AttendanceReport;
