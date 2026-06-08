const api = "http://localhost:8080/products";
console.log("Script Loaded");
// console.log("ID:", id);

// let editId = null;

document
.getElementById("addBtn")
.addEventListener("click", saveProduct);

window.onload = function () {
    loadProducts();
    loadCart();
};

function saveProduct() {

    /*
    if (event) event.preventDefault();

    document
    .getElementById("addBtn")
    .addEventListener("click", saveProduct);

    */

    const id =
        document.getElementById("productId").value;


    const product = {

        name:
        document.getElementById("name").value,

        desc:
        document.getElementById("desc").value,

        price:
        document.getElementById("price").value
    };

    if(id){

        product.id = id;

        fetch(api,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
        .then(res => res.json())  // wait for backend response
        .then(()=>{
            // document.getElementById("msg").innerText = "Updated successfully!";
            location.reload();
            clearForm();
            loadProducts();
        });

    }else{

        fetch(api,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
        .then(res => res.json())
        .then(()=>{
            // document.getElementById("msg").innerText = "Added successfully!";
            location.reload();
            clearForm();
            loadProducts();
        });
    }
}

function loadProducts(){

    fetch(api)
    .then(res=>res.json())
    .then(data=>{

        console.log("DATA:", data);

        let html="";

        data.forEach(product=>{

            const id = product.id || product._id;

            html += `
            <div class="card">

                <div class="card-left">
                    <h3>${product.name}</h3>
                    <p>${product.desc}</p>
                    <p>₹${product.price}</p>
                </div>

                <div class="card-right">

                    <button class="add-btn" onclick="addToCart(
                        '${id}',
                        '${product.name}',
                        '${product.price}'
                    )">ADD</button>

                    <button type="button" class="update-btn" onclick="editProduct(
                        '${id}',
                        '${product.name}',
                        '${product.desc}',
                        '${product.price}'
                    )">
                        Update
                    </button>

                    <button type="button" class="delete-btn" onclick="deleteProduct('${id}')">
                        Delete
                    </button>
                </div>

            </div>
            `;
        });

        document
        .getElementById("product-list")
        .innerHTML = html;
    });
}


function loadCart() {

    fetch("http://localhost:8080/cart")
    .then(res => res.json())
    .then(data => {

        let html = "";

        data.forEach(item => {

            const total = item.price * item.quantity;

            html += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: ₹${total}</p>

                <button onclick="removeFromCart('${item.productId}')">
                    Remove
                </button>
            </div>
            `;
        });

        console.log(document.getElementById("cart-items"));

        document.getElementById("cart-items").innerHTML = html;
    });
}


function deleteProduct(id)
{

    fetch(`${api}/${id}`,{
        method:"DELETE"
    })
    .then(()=>loadProducts());
}

function clearForm() {
    document
    .getElementById("productId").value = "";

    document
    .getElementById("name").value = "";

    document
    .getElementById("desc").value = "";

    document
    .getElementById("price").value = "";

    document
    .getElementById("addBtn").innerText = "Add Product";

    if (btn) {
            btn.innerText = "Add Product";
        } else {
            console.log("addBtn not found!");
        }
}

function editProduct(
                        id,
                        name,
                        desc,
                        price
                    )
{
    document
        .getElementById("productId")
        .value=id;

        document
        .getElementById("name")
        .value=name;

        document
        .getElementById("desc")
        .value=desc;

        document
        .getElementById("price")
        .value=price;

        document
        .getElementById("addBtn")
        .innerText = "Update Product";
}

function addToCart(id, name, price) {

    fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId: id,
            name: name,
            price: price
        })
    })
    .then(res => res.json())
    .then(() => {
        loadCart(); // refresh cart UI
    });
}

function removeFromCart(productId) {

    fetch(`http://localhost:8080/cart/${productId}`, {
        method: "DELETE"
    })
    .then(() => {
        loadCart();
    });
}

function toggleCart(){

    const cart =
        document.getElementById("cart-box");

    if(cart.style.display === "none" ||
       cart.style.display === ""){

        cart.style.display = "block";

    }else{

        cart.style.display = "none";
    }
}

