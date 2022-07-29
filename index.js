const storeList = document.getElementById("storeList")
const vaultItems = document.getElementById("vaultItems")
const userCoins = document.getElementById("userCoins")

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

let userItem = []

let coins = 500

userCoins.innerHTML = `${coins}`

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

const storageChecker = () => {
    if (localStorage.getItem("userItemsDB")) {
        userItem = JSON.parse(localStorage.getItem("userItemsDB"))
        userVault()
    } else {
        localStorage.setItem("userItemsDB", userItem)
    }
}

storageChecker()

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

storeList.addEventListener("click", (e) => {
    const selectedItem = e.target

    if (selectedItem.classList.contains("storeItem")) {

        const itemFind = items.find(x => x.id === selectedItem.id)

        coins = coins - itemFind.price

        userCoins.innerHTML = `${coins}`

        userItem.push({
            id: itemFind.id,
            price: itemFind.price,
            img: itemFind.img
        })

        const itemVault = document.createElement("div")
        itemVault.classList.add("itemVault")
        itemVault.innerHTML = `
                <div class="divImg">
                <img class="vaultImg" src="${itemFind.img}" alt="">
                </div>
                <h2>${selectedItem.id}</h2>
            `
        vaultItems.append(itemVault)
        localStorage.setItem("userItemsDB", JSON.stringify(userItem))
    }
})

vaultItems.addEventListener("click", (e) => {
    const vaultTarget = e.target
    const parentVault = e.target.parentElement
    if (vaultTarget.classList.contains("itemVault")) {
        const itemIndex = Array.from(vaultTarget.parentNode.children).indexOf(e.target)
        vaultTarget.remove()
        const itemPrice = userItem[itemIndex].price
        console.log(itemPrice)
        userItem.splice(itemIndex, 1)
        localStorage.setItem("userItemsDB", JSON.stringify(userItem))
    }
})