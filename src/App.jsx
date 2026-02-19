import { useEffect, useState } from "react";
import { EmployeeData } from "./Employee";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    setEmployees(EmployeeData);
  }, []);

  // EDIT
  const handleEdit = (id) => {
    const emp = employees.find((emp) => emp.id === id);
    if (emp) {
      setId(id);
      setFirstName(emp.firstName);
      setLastName(emp.lastName);
      setAge(emp.age);
    }
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedEmployees = employees.filter(
        (emp) => emp.id !== id
      );
      setEmployees(updatedEmployees);
    }
  };

  // SAVE (Add + Update)
  const handleSave = () => {
    if (!firstName || !lastName || !age) {
      alert("All fields are required!");
      return;
    }

    if (id === 0) {
      // ADD NEW
      const newEmployee = {
        id: employees.length + 1,
        firstName,
        lastName,
        age,
      };

      setEmployees([...employees, newEmployee]);
    } else {
      // UPDATE
      const updatedEmployees = employees.map((emp) =>
        emp.id === id
          ? { id, firstName, lastName, age }
          : emp
      );

      setEmployees(updatedEmployees);
    }

    handleClear();
  };

  // CLEAR
  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
  };

  return (
    <div className="employee-container">
      <div
        style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        className="m-2"
      >
        <div>
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            placeholder="Enter Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>

        <div>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>{" "}
          <button className="btn btn-danger" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <h2>Employee List</h2>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.age}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(emp.id)}
                >
                 After Edit
                </button>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(emp.id)}
                >
                 After Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

export default App;
