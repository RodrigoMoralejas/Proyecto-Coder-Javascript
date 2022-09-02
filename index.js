//Elements from DOM
const formLogin = document.getElementById("formLogin");
const nameLogin = document.getElementById("nameLogin");
const passLogin = document.getElementById("passLogin");
const btnLogin = document.getElementById("btnLogin");
const btnCreate = document.getElementById("btnCreate");

let userLogin = [];

localStorage.getItem("usersDB")
  ? (userLogin = JSON.parse(localStorage.getItem("usersDB")))
  : localStorage.setItem("usersDB", userLogin);

const userActive = userLogin.find((x) => x.logged === true);

if (userActive !== undefined) {
  window.location.href = "./app.html";
} else {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = nameLogin.value;
    const passInput = passLogin.value;

    const userSearch = userLogin.find((x) => x.user === nameInput);

    if (nameInput.trim() === "" || passInput.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Empty fields",
        text: "You need to put name and pass",
      });
    } else if (userSearch !== undefined && userSearch.pass !== passInput) {
      Swal.fire({
        icon: "error",
        title: "Wrong password",
        text: "Password incorrect, please try again",
      });
    } else if (userSearch !== undefined && userSearch.pass === passInput) {
      userSearch.logged = true;
      localStorage.setItem("usersDB", JSON.stringify(userLogin));
      window.location.href = "./app.html";
    } else {
      Swal.fire({
        icon: "warning",
        title: "Attention",
        text: "This user does not exists, click to create one",
      });
    }
  });

  btnCreate.addEventListener("click", () => {
    const nameInput = nameLogin.value;
    const passInput = passLogin.value;

    const userFind = userLogin.find((x) => x.user === nameInput);

    if (nameInput.trim() === "" || passInput.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Empty fields",
        text: "You need to put name and pass",
      });
    } else if (userFind !== undefined) {
      Swal.fire({
        icon: "info",
        title: "Attention",
        text: "User already exists",
      });
    } else {
      userLogin.push({
        user: nameInput,
        pass: passInput,
        coins: 500,
        logged: false,
        items: [],
      });
      Swal.fire({
        icon: "success",
        title: "Successful",
        text: "User created",
      });

      localStorage.setItem("usersDB", JSON.stringify(userLogin));
    }
  });
}
