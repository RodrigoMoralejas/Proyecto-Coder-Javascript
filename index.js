// Elements from the DOM
const storeList = document.getElementById("storeList")
const vaultItems = document.getElementById("vaultItems")
const userCoins = document.getElementById("userCoins")

let items = []

async function itemsJson() {
    const items = await fetch("./JSON/items.json")
    console.log(items)
    const itemsConverter = await items.json()
    console.log(itemsConverter)
    return itemsConverter
}

const itemsReturn = itemsJson()

// itemsReturn.then(data => items = data)

// Initial array
let userItem = []

let coins = 500

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
    localStorage.getItem("userItemsDB") ?
        (userItem = JSON.parse(localStorage.getItem("userItemsDB")), userVault()) :
        localStorage.setItem("userItemsDB", userItem)

    localStorage.getItem("userCoins") ?
        (coins = JSON.parse(localStorage.getItem("userCoins"))) :
        localStorage.setItem("userCoins", JSON.stringify(coins))
}

// Function app initializer
storageChecker()

userCoins.innerHTML = `${JSON.parse(localStorage.getItem("userCoins"))}`

// Store item creation
const itemsForEach = (dataReturn) => {
    items = dataReturn
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
}

itemsReturn.then(data => itemsForEach(data))

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
            Swal.fire({
                icon: 'warning',
                title: 'No funds available',
                text: 'Make some money and come back again',
            })
        } else {
            coins = coins - itemPrice
            userCoins.innerHTML = `${coins}`
            localStorage.setItem("userCoins", coins)

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

            Toastify({
                text: "Item added",
                gravity: "top",
                position: "right",
                offset: {
                    y: "4rem"
                },
                style: {
                    background: "#008000"
                },
                duration: 2000
            }).showToast();
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
        localStorage.setItem("userCoins", JSON.stringify(coins))

        console.log(itemPrice)
        userItem.splice(itemIndex, 1)
        localStorage.setItem("userItemsDB", JSON.stringify(userItem))

        Toastify({
            text: "Item sold",
            gravity: "top",
            position: "right",
            offset: {
                y: "4rem"
            },
            style: {
                background: "#ff0000"
            },
            duration: 2000
        }).showToast();
    }
})