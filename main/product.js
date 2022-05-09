// ===1. show list product===

const itemInCart = JSON.parse(localStorage.getItem("productInCart")) || [];
let $productList = document.getElementById("product-list");
function showProductHtml(productData) {
  let productListHtml = "";
  for (let index in productData) {
    productListHtml += `<li class="product-item">
  <img src=${productData[index].image}>
  <h3 class="product-name">${productData[index].productName}</h3>
  <p class="product-price">${productData[index].price} đ</p>
  <button type="button" id="${productData[index].id}" onClick="addClick(this.id)" class="btn add2cart">Add to cart</button></li>`;
  }
  if (productListHtml != '') {
    $productList.innerHTML = productListHtml;
  } else {
    $productList.innerHTML = `Không có sản phẩm nào! `;
  }
}
showProductHtml(product)


// ===2. search item by price or name===
function searchProduct() {
  let $formSearch = document.getElementById("form-search");
  let $keyWord = document.getElementById("key-word");
  $formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    let $keySearch = document.getElementById("search-key").value;
    let filterProduct = product.filter(function (product) {
      let $productName = product.productName;
      if (parseInt($keySearch) >= 10000000) {
        return (
          new RegExp($keySearch.toLowerCase()).test(
            $productName.toLowerCase()
          ) === true ||
          (parseInt($keySearch) - 5000000 <= parseInt(product.price) &&
            parseInt($keySearch) >= parseInt(product.price))
        );
      } else{
        return (
          new RegExp($keySearch.toLowerCase()).test(
            $productName.toLowerCase()
          ) === true ||
            parseInt($keySearch) >= parseInt(product.price)
        );
      }
    });
    $formSearch.reset();

    //show item
    showProductHtml(filterProduct)
    // show key search 
    if ($keySearch == "") {
      $keyWord.innerText = "Tất cả sản phẩm";
    } else if ($keySearch > 5000000)  {
      $keyWord.innerHTML = `Từ ${$keySearch - 5000000} đ đến ${$keySearch} đ`;
    } else if ($keySearch - 5000000 < 0)  {
      $keyWord.innerHTML = `Dưới ${$keySearch} đ`
    } else {
      $keyWord.innerHTML = $keySearch;
    }
    activeReplaceKey();
  });
  function activeReplaceKey() {
    document.querySelector(".replace-key").classList.add("active");
  }
}
searchProduct();

// ===3. add item to cart===
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

// ===4. update number of item in cart icon==
function showNumberCart() {
  let num = itemInCart.length;
  localStorage.setItem("numberCart", num);
  console.log(localStorage.numberCart);
  let $numberItems = document.getElementById("number-item");
  $numberItems.innerHTML = localStorage.numberCart;
}

showNumberCart();

// ===5. sort product. ===
// Sort latest products
function sortlatest() {
  removeSortItem()
  activeSortItem(".sort-latest")
  product.sort(function(a, b) {
    return b.id - a.id
  })
  removeSortIcon()
  document.getElementsByClassName("icon-sort")[0].style.display = 'block'
  document.getElementById("key-word").innerHTML="Sản phẩm mới nhất"
  showProductHtml(product)
}
// Sort price ascending
function sortPriceAsc() {
  removeSortItem()
  activeSortItem()
  removeSortIcon()
  document.getElementsByClassName("arrow-up")[0].style.display = 'block'
  product.sort(function(a, b) {
    return a.price - b.price
  })
  document.getElementById("key-word").innerHTML="Sắp xếp giá tăng dần"
  showProductHtml(product)
}

// Sort price descending
function sortPriceDesc() {
  removeSortItem()
  activeSortItem()
  removeSortIcon()
  document.getElementsByClassName("arrow-down")[0].style.display = 'block'
  product.sort(function(a, b) {
    return b.price - a.price
  })
  document.getElementById("key-word").innerHTML="Sắp xếp giá giảm dần"
  showProductHtml(product)
}

function activeSortItem() {
  document.querySelector(".sort-price").classList.add("active");
}
function removeSortItem() {
  document.querySelector(".sort-list li.active").classList.remove("active");
}

function removeSortIcon() {
  document.getElementsByClassName("icon-sort")[0].style.display = 'none'
  document.getElementsByClassName("arrow-up")[0].style.display = 'none'
  document.getElementsByClassName("arrow-down")[0].style.display = 'none'
}
