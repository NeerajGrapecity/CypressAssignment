let jsonData;

async function getData() {
  await fetch("http://restapi.adequateshop.com/api/Tourist")
    .then((response) => response.json())
    .then((_data) => {
      jsonData = _data.data;
    })
    .catch((error) => {
      alert(error);
    });
}

let _tr, _dataTable;

async function displayData() {
  // await getData()
  let container = document.getElementById("container");
  if (container.classList.contains("non-active")) {
    container.classList.remove("non-active");
  }

  let sortButton = document.getElementById("sortButton");
  if (sortButton.classList.contains("non-active")) {
    sortButton.classList.remove("non-active");
  }

  let table = document.createElement("table");
  table.classList.add("dataTable");

  let cols = Object.keys(jsonData[0]);

  let thead = document.createElement("thead");
  let tr = document.createElement("tr");

  cols.forEach((item) => {
    let th = document.createElement("th");
    th.innerText = item;
    th.classList.add("headers");
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.append(tr);

  jsonData.forEach((item) => {
    let tr = document.createElement("tr");

    let vals = Object.values(item);

    vals.forEach((elem) => {
      let td = document.createElement("td");
      td.innerText = elem;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  container.append(table);
  _dataTable = table;
  _tr = tr;
}

let asc = true;

async function sortTable() {
  await getData();

  if (asc == true) {
    jsonData.sort(function (a, b) {
      console.log(`sort function called`);
      asc = false;
      return a.id - b.id;
    });
  } else {
    jsonData.sort(function (a, b) {
      console.log(`sort function called`);
      asc = true;
      return b.id - a.id;
    });
  }
  console.log(jsonData);

  setTimeout(() => displayData(), 1000);
}

async function insertData() {
  event.preventDefault();
  let insertedName = document.getElementById("insertedName").value;
  let insertedMail = document.getElementById("insertedMail").value;
  let insertedLocation = document.getElementById("insertedLocation").value;

  await fetch("http://restapi.adequateshop.com/api/Tourist", {
    method: "POST",

    body: JSON.stringify({
      tourist_name: insertedName,
      tourist_email: insertedMail,
      tourist_location: insertedLocation,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  await getData();
  setTimeout(() => displayData(), 1000);

  document.getElementById("insertedName").value = "";
  document.getElementById("insertedMail").value = "";
  document.getElementById("insertedLocation").value = "";
}

async function updateData() {
  event.preventDefault();
  let found;
  found = checkLogin();
  console.log(found);
}

// check whether the data which needs to be updated exists in API
function checkLogin() {
  event.preventDefault();
  let toBeUpdatedId = Number(document.getElementById("toBeUpdatedId").value);
  let toBeUpdatedName = document.getElementById("toBeUpdatedName").value;
  let toBeUpdatedMail = document.getElementById("toBeUpdatedMail").value;

  let jsonData;

  fetch("http://restapi.adequateshop.com/api/Tourist")
    .then((response) => response.json())
    .then((_data) => {
      jsonData = _data.data;

      let found = false;

      for (const key in jsonData) {
        if (
          jsonData[key].id == toBeUpdatedId &&
          jsonData[key].tourist_name == toBeUpdatedName &&
          jsonData[key].tourist_email == toBeUpdatedMail
        ) {
          found = true;
          return found;
        }
      }
      return found;
    });
}

async function switchToGetData() {
  let container2 = document.getElementById("container2");
  let container = document.getElementById("container");
  let container3 = document.getElementById("container3");
  let container4 = document.getElementById("container4");

  if (!container2.classList.contains("non-active")) {
    container2.classList.add("non-active");
  }
  if (!container3.classList.contains("non-active")) {
    container3.classList.add("non-active");
  }
  if (container.classList.contains("non-active")) {
    container.classList.remove("non-active");
  }
  if (!container4.classList.contains("non-active")) {
    container4.classList.add("non-active");
  }
  await getData();
  setTimeout(() => displayData(), 1000);
}

function switchToUpdate() {
  let container2 = document.getElementById("container2");
  let container = document.getElementById("container");
  let container3 = document.getElementById("container3");
  let toBeUpdatedForm = document.getElementById("toBeUpdatedForm");
  let container4 = document.getElementById("container4");

  if (!container.classList.contains("non-active")) {
    container.classList.add("non-active");
  }
  if (!container3.classList.contains("non-active")) {
    container3.classList.add("non-active");
  }
  if (container2.classList.contains("non-active")) {
    container2.classList.remove("non-active");
  }
  if (toBeUpdatedForm.classList.contains("non-active")) {
    toBeUpdatedForm.classList.remove("non-active");
  }
  if (!container4.classList.contains("non-active")) {
    container4.classList.add("non-active");
  }
  let updateButton = document.getElementById("updateButton");
  console.log(updateButton);
  
}

function switchToInsert() {
  let container2 = document.getElementById("container2");
  let container = document.getElementById("container");
  let container3 = document.getElementById("container3");
  let container4 = document.getElementById("container4");
  let insertForm = document.getElementById("insertForm");

  if (!container.classList.contains("non-active")) {
    container.classList.add("non-active");
  }
  if (!container2.classList.contains("non-active")) {
    container2.classList.add("non-active");
  }
  if (container3.classList.contains("non-active")) {
    container3.classList.remove("non-active");
  }
  if (insertForm.classList.contains("non-active")) {
    container.classList.remove("non-active");
  }
  if (!container4.classList.contains("non-active")) {
    container4.classList.add("non-active");
  }
}

function switchToDelete() {
  let container2 = document.getElementById("container2");
  let container = document.getElementById("container");
  let container3 = document.getElementById("container3");
  let container4 = document.getElementById("container4");

  if (!container.classList.contains("non-active")) {
    container.classList.add("non-active");
  }
  if (!container2.classList.contains("non-active")) {
    container2.classList.add("non-active");
  }
  if (!container3.classList.contains("non-active")) {
    container3.classList.add("non-active");
  }

  if (container4.classList.contains("non-active")) {
    container4.classList.remove("non-active");
  }
}

function deleteData() {
  let deleteId = document.getElementById("deleteId").value;
  fetch("http://restapi.adequateshop.com/api/Tourist/221311", {
    method: "DELETE",
    mode: "cors",
  })
    .then((res) => res.json())

    .then((res) => console.log(res));
}

async function searchName() {
  await getData();
  let inputValue = document.getElementById("searchBox").value;
  await displayData();

  let table = _dataTable;
  let tr, td, txtValue, tx;
  let foundIndex;
  let filter = inputValue.toUpperCase();
  tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].classList.add("searchedElement");
      } else {
        continue;
      }
    }
  }
}

// form js
let signUpButton = document.getElementById("signUpButton");
let signInButton = document.getElementById("signInButton");

function signUpCheck() {
  event.preventDefault();
  let x = document.forms["SignUpForm"]["Email"].value;
  if (x == "") {
    alert("Please Enter email");
    return False;
  }
  let y = document.forms["SignUpForm"]["password"].value;
  if (y == "") {
    alert("Please Enter password");
    return False;
  }
  let z = document.forms["SignUpForm"]["confirmPassword"].value;
  if (z == "") {
    alert("Please Enter confirmpassword");
    return False;
  }
  var emailValue = document.getElementById("Email").value;
  var signUpPassword = document.getElementById("password").value;
  var signUpConfirmPassword = document.getElementById("confirmPassword").value;
  var role = document.getElementById("role").value;

  if (role === "admin") {
    if (signUpPassword === signUpConfirmPassword) {
      localStorage.setItem("adminEmail", emailValue);
      localStorage.setItem("adminPassword", signUpPassword);
      let action = confirm(
        "Your response is submitted! You are now an Admin!!"
      );
      if (action == true) {
        window.location.href = "signIn.html";
      }
    } else {
      alert("Please check the password. Both passwords should match");
    }
  } else {
    if (signUpPassword === signUpConfirmPassword) {
      localStorage.setItem("userEmail", emailValue);
      localStorage.setItem("userPassword", signUpPassword);
      let action = confirm("Your response is submitted! You are a User Now!!");
      if (action == true) {
        window.location.href = "signIn.html";
      }
    } else {
      alert("Please check the password. Both passwords should match");
    }
  }
}

function checkSignInInfo() {
  event.preventDefault();
  let x = document.forms["SignInForm"]["signInEmail"].value;
  if (x == "") {
    alert("Please Enter email");
    return False;
  }
  let y = document.forms["SignInForm"]["signInPassword"].value;
  if (y == "") {
    alert("Please Enter password");
    return False;
  }
  var emailValue = document.getElementById("signInEmail").value;
  var signInPassword = document.getElementById("signInPassword").value;
  var adminEmailStored = localStorage.getItem("adminEmail");
  var adminPasswordStored = localStorage.getItem("adminPassword");
  var userEmailStored = localStorage.getItem("userEmail");
  var userPasswordStored = localStorage.getItem("userPassword");

  if (
    emailValue === adminEmailStored &&
    signInPassword === adminPasswordStored
  ) {
    role = "admin";
    let action = confirm("Hello Admin! Do you want to visit Homepage?");
    if (action == true) {
      changePage(role);
    }
  } else if (
    emailValue === userEmailStored &&
    signInPassword === userPasswordStored
  ) {
    role = "user";
    let action = confirm("Hello user! Do you want to visit Homepage?");
    if (action == true) {
      changePage(role);
    }
  } else {
    alert("Please check email and password");
  }
}

function changePage(role) {
  console.log("function called");
  let page = window.open("program.html");
  page.addEventListener("DOMContentLoaded", () => {
    let updateButton = page.document.getElementById("updateDataButton");
    let insertButton = page.document.getElementById("insertDataButton");
    let deleteButton = page.document.getElementById("deleteDataButton");

    console.log(updateButton);

    if (role == "user") {
      if (!updateButton.classList.contains("non-active")) {
        updateButton.classList.add("non-active");
      }
      if (!insertButton.classList.contains("non-active")) {
        insertButton.classList.add("non-active");
      }
      if (!deleteButton.classList.contains("non-active")) {
        deleteButton.classList.add("non-active");
      }
    } else {
      if (updateButton.classList.contains("non-active")) {
        updateButton.classList.remove("non-active");
      }
      if (insertButton.classList.contains("non-active")) {
        insertButton.classList.remove("non-active");
      }
      if (deleteButton.classList.contains("non-active")) {
        deleteButton.classList.remove("non-active");
      }
    }
  });
}
