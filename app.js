// Elements from the DOM
const storeList = document.getElementById("storeList");
const vaultItems = document.getElementById("vaultItems");
const userCoins = document.getElementById("userCoins");
const btnLogout = document.getElementById("btnLogout");
const userLogged = document.getElementById("userLogged");

let items = [];

async function itemsJson() {
  const items = await fetch("./JSON/items.json");
  const itemsConverter = await items.json();
  return itemsConverter;
}

const itemsReturn = itemsJson();

// Initial array
let usersDB = JSON.parse(localStorage.getItem("usersDB"));

const userActive = usersDB.find((x) => x.logged === true);
if (userActive !== undefined) {
  userLogged.innerHTML = `${userActive.user}`;

  let userItem = userActive.items;

  let coins = userActive.coins;

  // User vault item creation
  const userVault = () => {
    userItem.forEach((itemV) => {
      const newItem = document.createElement("div");
      newItem.classList.add("itemVault");
      newItem.id = itemV.id;
      newItem.innerHTML = `
        <div class="divImg">
            <img class="vaultImg" src="${itemV.img}" alt="">
        </div>
        <h2>${itemV.id}</h2>`;
      vaultItems.append(newItem);
    });
  };

  userVault();

  userCoins.innerHTML = `${coins}`;

  // Store item creation
  const itemsForEach = (dataReturn) => {
    items = dataReturn;
    items.forEach((item) => {
      const newItem = document.createElement("div");
      newItem.classList.add("storeItem");
      newItem.id = item.id;
      newItem.innerHTML = `
        <div class="itemImg">
            <img class="cardImg" src="${item.img}" alt="">
        </div>
        <h3>${item.id}</h3>
        <p>${item.price}</p>
    `;
      storeList.append(newItem);
    });
  };

  itemsReturn.then((data) => itemsForEach(data));

  // Store item event listener
  storeList.addEventListener("click", (e) => {
    const selectedItem = e.target;

    if (selectedItem.classList.contains("storeItem")) {
      const {
        id: itemId,
        price: itemPrice,
        img: itemImg,
      } = items.find((x) => x.id === selectedItem.id);

      if (itemPrice > coins) {
        Swal.fire({
          icon: "warning",
          title: "No funds available",
          text: "Make some money and come back again",
        });
      } else {
        coins = coins - itemPrice;
        userCoins.innerHTML = `${coins}`;
        userActive.coins = coins;

        userItem.push({
          id: itemId,
          price: itemPrice,
          img: itemImg,
        });

        const itemVault = document.createElement("div");
        itemVault.classList.add("itemVault");
        itemVault.innerHTML = `
                <div class="divImg">
                <img class="vaultImg" src="${itemImg}" alt="">
                </div>
                <h2>${selectedItem.id}</h2>
            `;
        vaultItems.append(itemVault);
        localStorage.setItem("usersDB", JSON.stringify(usersDB));

        Toastify({
          text: "Item added",
          gravity: "top",
          position: "right",
          offset: {
            y: "4rem",
          },
          style: {
            background: "#008000",
          },
          duration: 2000,
        }).showToast();
      }
    }
  });

  // Vault items
  vaultItems.addEventListener("click", (e) => {
    const vaultTarget = e.target;
    if (vaultTarget.classList.contains("itemVault")) {
      const itemIndex = Array.from(vaultTarget.parentNode.children).indexOf(
        e.target
      );
      vaultTarget.remove();
      const { price: itemPrice } = userItem[itemIndex];

      coins = coins + itemPrice;
      userCoins.innerHTML = `${coins}`;
      userActive.coins = coins;

      console.log(itemPrice);
      userItem.splice(itemIndex, 1);
      localStorage.setItem("usersDB", JSON.stringify(usersDB));

      Toastify({
        text: "Item sold",
        gravity: "top",
        position: "right",
        offset: {
          y: "4rem",
        },
        style: {
          background: "#ff0000",
        },
        duration: 2000,
      }).showToast();
    }
  });

  //Log out button
  btnLogout.addEventListener("click", () => {
    userActive.logged = false;

    localStorage.setItem("usersDB", JSON.stringify(usersDB));

    window.location.href = "./index.html";
  });
} else {
  window.location.href = "./index.html";
}
