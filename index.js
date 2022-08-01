// Elements from the DOM
const storeList = document.getElementById("storeList")
const vaultItems = document.getElementById("vaultItems")
const userCoins = document.getElementById("userCoins")

// Objects' list
const items = [{
        id: "sword",
        price: 20,
        img: "./img/swordCard.png"
    },

    {
        id: "axe",
        price: 25,
        img: "./img/axeCard.png"
    },

    {
        id: "bow",
        price: 30,
        img: "./img/bowCard.png"
    },

    {
        id: "wand",
        price: 30,
        img: "./img/wandCard.webp"
    },

    {
        id: "helmet",
        price: 10,
        img: "./img/helmetCard.jpg"
    },

    {
        id: "armor",
        price: 60,
        img: "./img/armorCard.jpg"
    },

    {
        id: "pants",
        price: 40,
        img: "./img/pantsCard.jpg"
    },

    {
        id: "boots",
        price: 20,
        img: "./img/bootsCard.jpg"
    },

    {
        id: "gloves",
        price: 10,
        img: "./img/glovesCard.jpg"
    },

    {
        id: "potion",
        price: 5,
        img: "./img/potionCard.png"
    },
]

// Initial array
let userItem = []

let coins = 500

userCoins.innerHTML = `${coins}`

// User vault item creation
const userVault = () => {
    userItem.forEach((itemV) => {
        const newItem = document.createElement("div")
        newItem.classList.add("itemVault")
        newItem.id = itemV.id
        newItem.innerHTML = `
        <div class="divImg">
            <img class="vaultImg" src="${itemV.img}" alt="">
        </div>
        <h2>${itemV.id}</h2>`
        vaultItems.append(newItem)
    })
}

// Storage checker
const storageChecker = () => {
    //Operador ternario
    localStorage.getItem("userItemsDB") 
    ? (userItem = JSON.parse(localStorage.getItem("userItemsDB")), userVault()) 
    : localStorage.setItem("userItemsDB", userItem)
}

// Function app initializer
storageChecker()

// Store item creation
items.forEach((item) => {
    const newItem = document.createElement("div")
    newItem.classList.add("storeItem")
    newItem.id = item.id
    newItem.innerHTML = `
        <div class="itemImg">
            <img class="cardImg" src="${item.img}" alt="">
        </div>
        <h3>${item.id}</h3>
        <p>${item.price}</p>
    `
    storeList.append(newItem)
})

// Store item event listener
storeList.addEventListener("click", (e) => {
    const selectedItem = e.target

    if (selectedItem.classList.contains("storeItem")) {

        const {
            id: itemId,
            price: itemPrice,
            img: itemImg
        } = items.find(x => x.id === selectedItem.id)

        if (itemPrice > coins) {
            alert("No funds available")
        } else {
            coins = coins - itemPrice
            userCoins.innerHTML = `${coins}`

            userItem.push({
                id: itemId,
                price: itemPrice,
                img: itemImg
            })

            const itemVault = document.createElement("div")
            itemVault.classList.add("itemVault")
            itemVault.innerHTML = `
                <div class="divImg">
                <img class="vaultImg" src="${itemImg}" alt="">
                </div>
                <h2>${selectedItem.id}</h2>
            `
            vaultItems.append(itemVault)
            localStorage.setItem("userItemsDB", JSON.stringify(userItem))
        }
    }
})

// Vault items
vaultItems.addEventListener("click", (e) => {
    const vaultTarget = e.target
    if (vaultTarget.classList.contains("itemVault")) {
        const itemIndex = Array.from(vaultTarget.parentNode.children).indexOf(e.target)
        vaultTarget.remove()
        const {
            price: itemPrice
        } = userItem[itemIndex]

        coins = coins + itemPrice
        userCoins.innerHTML = `${coins}`

        console.log(itemPrice)
        userItem.splice(itemIndex, 1)
        localStorage.setItem("userItemsDB", JSON.stringify(userItem))
    }
})