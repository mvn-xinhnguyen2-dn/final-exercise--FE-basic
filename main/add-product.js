const $addItemForm = document.getElementById("form-add-item");
let product = JSON.parse(localStorage.getItem("product")) || [];

// submit form add product
$addItemForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let data = new FormData($addItemForm);
  let $selectOption = document.getElementById("product-category").value;
  if (confirm("Are you sure?")) {
    addItem2Local({
      id: product.length + 1,
      productName: data.get("product-name"),
      price: data.get("product-price"),
      category: $selectOption,
      image: data.get("product-image"),
      quantity: data.get("product-quantity"),
      description: data.get("product-description"),
    });
    $addItemForm.reset();
  }
  alert("Successfully!!!");
});

// Add new product in localStorage
function addItem2Local(newProduct) {
  product.push(newProduct);
  localStorage.setItem("product", JSON.stringify(product));
}

function resetForm() {
  $addItemForm.reset();
}
