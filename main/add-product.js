
const $addItemForm = document.getElementById('form-add-item')
const product = JSON.parse(localStorage.getItem("product")) || []
$addItemForm.addEventListener('submit', function(e) {
  e.preventDefault()
  let data = new FormData($addItemForm)
  let $selectOption = document.getElementById('product-category').value
  if (confirm("Are you sure?")) {
    countForm() //function create auto id product
    addItem2Local(
      {
        id: localStorage.countID,
        productName: data.get('product-name'),
        price: data.get('product-price'),
        category: $selectOption,
        image: data.get('product-image'),
        quantity: data.get('product-quantity'),
        description: data.get('product-description')
      }
    )
    $addItemForm.reset()
  }
  alert("Successfully!!!")
})

// create ID for product in localStorage
function countForm() {
  if (localStorage.countID) {
    localStorage.countID = Number(localStorage.countID)+1;
  } else {
    localStorage.countID = 1
  }
}

// add new product in localStorage 
function addItem2Local(newProduct) {
  product.push(newProduct);
  localStorage.setItem('product', JSON.stringify(product))
}

function resetForm() {
  $addItemForm.reset()
}
