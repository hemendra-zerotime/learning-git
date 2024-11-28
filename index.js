const product = [
    {
        productImg: "https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Shirt",
        productPrice: 650,
        productQuantity: 1,
    },
    {
        productImg: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "pant",
        productPrice: 3000,
        productQuantity: 1,
    },
    {
        productImg: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "watch",
        productPrice: 2000,
        productQuantity: 1,
    },
    {
        productImg: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Shoes",
        productPrice: 2500,
        productQuantity: 1,
    },
    {
        productImg: "https://images.pexels.com/photos/4495753/pexels-photo-4495753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        productName: "Socks",
        productPrice: 150,
        productQuantity: 1,
    }
]

let shoppingCart = []

let cartData = JSON.parse(localStorage.getItem("cart-items"))
document.getElementById("cart-main").classList.remove("hide-cart")
let container = document.getElementById("cart-items")
let cartContainer = document.createElement("div")
let cartContainerID = document.createAttribute('id')
let cartContainerClass = document.createAttribute('class')
cartContainerID.value = "cart-item"
cartContainerClass.value = "cart-item"
cartContainer.setAttributeNode(cartContainerID)
cartContainer.setAttributeNode(cartContainerClass)

let image = document.createElement("img");
let imageID = document.createAttribute('id')
let imageSrc = document.createAttribute('src')
imageID.value = "item-img"
image.setAttributeNode(imageID)
image.setAttributeNode(imageSrc)
cartContainer.appendChild(image)

let itemName = document.createElement("p");
let itemNameID = document.createAttribute('id')
itemNameID.value = "item-name"
itemName.setAttributeNode(itemNameID)
cartContainer.appendChild(itemName)

let quantInc = document.createElement("span")
let quantIncClass = document.createAttribute('class')
let quantIncId = document.createAttribute('id')
quantIncId.value = "quantinc"
quantIncClass.value = "quant"
quantInc.setAttributeNode(quantIncId)
quantInc.setAttributeNode(quantIncClass)
quantInc.innerHTML = "+"
cartContainer.appendChild(quantInc)

let quantItem = document.createElement("span");
let quantItemID = document.createAttribute('id')
let quantItemClass = document.createAttribute('class')
quantItemClass.value = "quant-value"
quantItem.setAttributeNode(quantItemID)
quantItem.setAttributeNode(quantItemClass)
cartContainer.appendChild(quantItem)

let quantDec = document.createElement("span");
let quantDecClass = document.createAttribute('class')
let quantDecId = document.createAttribute('id')
quantDecId.value = "quantdec"
quantDecClass.value = "quant"
quantDec.setAttributeNode(quantDecId)
quantDec.setAttributeNode(quantDecClass)
quantDec.innerHTML = "-"
cartContainer.appendChild(quantDec)

let itemAmount = document.createElement("p");
let itemAmountID = document.createAttribute('id')
itemAmountID.value = "item-totalamount"
itemAmount.setAttributeNode(itemAmountID)
cartContainer.appendChild(itemAmount)
let sum = 0;

if (localStorage.length > 0) {
    cartData.forEach((item, index) => {
        sum += parseInt(item.productPrice);
        let clonedCart = cartContainer.cloneNode(true)
        clonedCart.querySelector("#item-img").src = item.productImg;
        clonedCart.querySelector("#item-name").innerHTML = item.productName;
        clonedCart.querySelector(".quant-value").innerHTML = item.productQuantity;
        clonedCart.querySelector("#item-totalamount").innerHTML = `Rs. ${item.productPrice}`;
        clonedCart.querySelector(".quant-value").id = index;
        clonedCart.querySelector("#quantinc").addEventListener("click", function () {
            increment(index, item.productPrice);
        });
        clonedCart.querySelector("#quantdec").addEventListener("click", function () {
            decrement(index, item.productPrice);
        });

        container.appendChild(clonedCart);
    });
    document.getElementById("cart-total").innerHTML = `Rs. ${sum}`
}
else if (localStorage.length == 0) {
    container.innerHTML = `<h3 style="text-align:center; padding:10%; font-size:2rem;">No Item in cart</h3>`
}
function increment(ID, Rs) {
    shoppingCart = JSON.parse(localStorage.getItem("cart-items"))
    let quantity = parseInt(shoppingCart[ID].productQuantity)
    let price = Rs
    price = price / quantity
    quantity += 1
    Rs = quantity * price

    updateCart = {
        productName: `${shoppingCart[ID].productName}`,
        productQuantity: `${quantity}`,
        productImg: `${shoppingCart[ID].productImg}`,
        productPrice: `${Rs}`
    }
    shoppingCart[ID] = updateCart
    localStorage.setItem("cart-items", JSON.stringify(shoppingCart))
    location.reload()
    return
}
function decrement(vl, Rs) {
    shoppingCart = JSON.parse(localStorage.getItem("cart-items"))
    let quantity = parseInt(shoppingCart[vl].productQuantity)
    let price = Rs
    price = price / quantity
    quantity -= 1
    if (quantity == 0) {
        let x = shoppingCart.splice(vl, vl)
        localStorage.setItem("cart-items", JSON.stringify(shoppingCart))
        location.reload()
        return
    }

    else {
        Rs = quantity * price

        updateCart = {
            productName: `${shoppingCart[vl].productName}`,
            productQuantity: `${quantity}`,
            productImg: `${shoppingCart[vl].productImg}`,
            productPrice: `${Rs}`
        }
        shoppingCart[vl] = updateCart
        localStorage.setItem("cart-items", JSON.stringify(shoppingCart))
        location.reload()
        return
    }

}
let Shirt = document.getElementById("shirt-details")
let Pant = document.getElementById("pant-details")
let Shoes = document.getElementById("shoe-details")
let Socks = document.getElementById("socks-details")
let Watch = document.getElementById("watch-details")

function addToCart(val) {

    let imgsrc = val.children[0].getAttribute("src")
    let quantity = 1;
    let name = val.children[1].getHTML()
    let Rs = parseInt(val.children[2].getHTML().slice(4))
    Rs = quantity * Rs
    let cartObj = {
        productName: `${name}`,
        productQuantity: `${quantity}`,
        productImg: `${imgsrc}`,
        productPrice: `${Rs * quantity}`
    }

    if (localStorage.length == 0) {
        console.log("excuted when empty", localStorage.length)
        shoppingCart.push(cartObj)
        localStorage.setItem("cart-items", JSON.stringify(shoppingCart))
        location.reload()
    }

    else if (localStorage.length > 0) {
        shoppingCart = JSON.parse(localStorage.getItem("cart-items"))
        for (let ind = 0; ind < shoppingCart.length; ind++) {
            if (shoppingCart[ind].productName === `${name}`) {
                let result = increment(ind, shoppingCart[ind].productPrice)
                return result
            }
        }
        shoppingCart.push(cartObj)
        localStorage.setItem("cart-items", JSON.stringify(shoppingCart))
        location.reload()
        return
    }
}


