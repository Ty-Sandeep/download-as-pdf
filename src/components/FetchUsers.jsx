import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FetchUsers = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  let fetchUsers = async () => {
    let res = await axios.get("https://api.github.com/users");
    console.log(res);
    setusers(res.data);
  };

  const printPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const pdf = new jsPDF(orientation, unit, size);

    pdf.setFontSize(15);

    const title = "My Awesome Report";
    const headers = [["Users"]];

    const data = users.map((elt) => [elt.login]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    pdf.text(title, marginLeft, 40);
    pdf.autoTable(content);

    pdf.save("demo.pdf");
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-end gap-4 my-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            window.print();
          }}
        >
          print
        </button>
        <button className="btn btn-outline-danger" onClick={() => printPdf()}>
          print pdf
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((val, i) => {
            return (
              <tr key={i}>
                <td>{val.login}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FetchUsers;
