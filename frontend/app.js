// When the DOM is fully loaded, fetch employees
document.addEventListener("DOMContentLoaded", function () {
  fetchEmployees();
});

// Function to fetch employees from the backend API
function fetchEmployees() {
  fetch("http://127.0.0.1:5000/employees") // Backend endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // Parse JSON from response
    })
    .then((data) => {
      // If employees exist, display them
      if (data.employees && data.employees.length > 0) {
        displayEmployees(data.employees);
      } else {
        document.getElementById("employee-list").innerHTML =
          "<p>No employees found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching employees:", error);
      document.getElementById("employee-list").innerHTML =
        "<p>Error loading employee data</p>";
    });
}

// Function to render employees in the DOM
function displayEmployees(employees) {
  const employeeList = document.getElementById("employee-list");
  employeeList.innerHTML = "";

  employees.forEach((employee) => {
    const employeeDiv = document.createElement("div");
    employeeDiv.classList.add("employee");

    const employeeInfo = document.createElement("div");
    employeeInfo.classList.add("employee-info");
    employeeInfo.innerHTML = `
      <div><strong>Name:</strong> ${employee.name}</div>
      <div><strong>Role:</strong> ${employee.role}</div>
      <div><strong>Department:</strong> ${employee.department}</div>
      <div><strong>Email:</strong> ${employee.email}</div>
    `;

    employeeDiv.appendChild(employeeInfo);
    employeeList.appendChild(employeeDiv);
  });
}
