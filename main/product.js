// 1. show list product

const itemInCart = JSON.parse(localStorage.getItem("productInCart")) || [];
let productList = "";
let $productList = document.getElementById("product-list");
for (let index in product) {
  productList += `<li class="product-item">
  <img src=${product[index].image}>
  <h3 class="product-name">${product[index].productName}</h3>
  <p class="product-price">${product[index].price} đ</p>
  <button type="button" id="${product[index].id}" onClick="addClick(this.id)" class="btn add2cart">Add to cart</button></li>`;
}
$productList.innerHTML = productList;

// 2. search item by price or name
function searchProduct() {
  let $formSearch = document.getElementById("form-search");
  let $keyWord = document.getElementById("key-word");
  $formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    let $keySearch = document.getElementById("search-key").value;
    let filterProduct = product.filter(function (product) {
      let $productName = product.productName;
      return (
        new RegExp($keySearch.toLowerCase()).test(
          $productName.toLowerCase()
        ) === true ||
        (parseInt($keySearch) - 5000000 <= parseInt(product.price) &&
          parseInt($keySearch) >= parseInt(product.price))
      );
    });
    $formSearch.reset();

    //show item
    let productList = "";
    let $productList = document.getElementById("product-list");
    for (let index in filterProduct) {
      productList += `<li class="product-item">
      <img src=${filterProduct[index].image}>
      <h3 class="product-name">${filterProduct[index].productName}</h3>
      <p class="product-price">${filterProduct[index].price} đ</p>
      <button type="button" id="${filterProduct[index].id}" onClick="addClick(this.id)" class="btn add2cart">Add to cart</button></li>`;
    }
    $productList.innerHTML = productList;
    if ($keySearch == "") {
      $keyWord.innerText = "Tất cả sản phẩm";
    } else if (typeof($keySearch) == string) {
      $keyWord.innerHTML = $keySearch;
    } else {
      $keyWord.innerHTML = `Từ ${$keySearch - 5000000} đ đến ${$keySearch} đ`;
    }
    activeReplaceKey();
  });
  function activeReplaceKey() {
    document.querySelector(".replace-key").classList.add("active");
  }
}
searchProduct();

// 3. add item to cart
function addClick(click_id) {
  let id = parseInt(click_id) - 1;
  addItem2Cart({
    id: product[id].id,
    image: product[id].image,
    title: product[id].productName,
    price: product[id].price,
  });
}
function addItem2Cart(itemA) {
  itemInCart.push(itemA);
  localStorage.setItem("productInCart", JSON.stringify(itemInCart));
  showNumberCart();
}

// 4. update number of item in cart icon
function showNumberCart() {
  let num = itemInCart.length;
  localStorage.setItem("numberCart", num);
  console.log(localStorage.numberCart);
  let $numberItems = document.getElementById("number-item");
  $numberItems.innerHTML = localStorage.numberCart;
}

showNumberCart();
