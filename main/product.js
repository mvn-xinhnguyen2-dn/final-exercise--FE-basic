//show list product

const product = JSON.parse(localStorage.getItem("product")) || []
let productList = '';
let $productList = document.getElementById('product-list')
for (let index in product) {
  productList += `<li class="product-item">
  <img src=${product[index].image}>
  <h3 class="product-name">${product[index].productName}</h3>
  <p class="product-price">${product[index].price} đ</p>
  <button type="button" id="${product[index].id}" onClick="reply_click(this.id)" class="btn add2cart">Add to cart</button></li>`
}
$productList.innerHTML = productList;

// search item by price or name 
let $formSearch = document.getElementById('form-search')
let $keyWord = document.getElementById('key-word')
$formSearch.addEventListener('submit', function(e) {
  e.preventDefault()
  let $keySearch = document.getElementById('search-key').value
  let filterProduct = product.filter(function(product) {
    let $productName = product.productName
    return (
      new RegExp($keySearch.toLowerCase()).test($productName.toLowerCase()) === true ||
      (parseInt($keySearch) >= parseInt(product.price) - 5000000 &&
       parseInt($keySearch) <= parseInt(product.price) + 5000000)
    )
  })
  $formSearch.reset()

  //show item 
  let productList = '';
  let $productList = document.getElementById('product-list')
  for (let index in filterProduct) {
    productList += `<li class="product-item">
    <img src=${filterProduct[index].image}>
    <h3 class="product-name">${filterProduct[index].productName}</h3>
    <p class="product-price">${filterProduct[index].price} đ</p>
    <button type="button" id="${filterProduct[index].id}" onClick="reply_click(this.id)" class="btn add2cart">Add to cart</button></li>`
  }
  $productList.innerHTML = productList
  if ($keySearch =="") {
    $keyWord.innerText = "Tất cả sản phẩm"
  }else{
    $keyWord.innerHTML = $keySearch
  }
  activeReplaceKey()
})

function activeReplaceKey() {
  document.querySelector('.replace-key').classList.add('active')
}


console.log(product)
