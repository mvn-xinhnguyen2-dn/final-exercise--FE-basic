// ===1. Print items in product management table===
let productHtml = "";
let $tbody = document.getElementById("insert-product-table");
let product = JSON.parse(localStorage.getItem("product")) || [];

for (let index in product) {
  productHtml += `<tr id="${product[index].id}">
    <td>${parseInt(index) + 1}</td>
    <td class=image><img src="${product[index].image}"</td>
    <td>${product[index].productName}</td>
    <td>${product[index].price}<span> đ</span></td>
    <td>${product[index].quantity}</td>
    <!--<td>${product[index].description}</td> --!>
    <td>
      <button type ="button" onclick="update(${product[index].id})" 
        class="btn-action update"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type ="button" onclick="productDetail(${
        product[index].id
      })"class="btn-action detail"><i class="fa-solid fa-eye"></i></button>
      <button type ="button" onclick="remove(this)" class="btn-action remove"><i class="fa-solid fa-trash-can"></i></button>
    </td>
  </tr>`;
}
$tbody.innerHTML = productHtml;

// ===2. update item in product management table===
//get data in form
let targetId;
function update(x) {
  let updateItem = product.find((item) => item.id == x);
  activeFormUpdate();
  targetId = updateItem.id;
  document.getElementById("product-name").value = updateItem.productName;
  document.getElementById("product-category").value = updateItem.category;
  document.getElementById("product-image").value = updateItem.image;
  document.getElementById("product-quantity").value = updateItem.quantity;
  document.getElementById("product-price").value = updateItem.price;
  document.getElementById("product-description").value = updateItem.description;
}
// update new product in localStorage
const $updateItemForm = document.getElementById("form-update-item");
$updateItemForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let data = new FormData($updateItemForm);
  let $selectOption = document.getElementById("product-category").value;
  if (confirm("Are you sure?")) {
    updateItem2Local({
      id: targetId,
      productName: data.get("product-name"),
      price: data.get("product-price"),
      category: $selectOption,
      image: data.get("product-image"),
      quantity: data.get("product-quantity"),
      description: data.get("product-description"),
    });
    removeFormUpdate();
  }
});

function updateItem2Local(newProduct) {
  let itemIndex = product.findIndex((item) => item.id == newProduct.id);
  product[itemIndex].id = newProduct.id;
  product[itemIndex].productName = newProduct.productName;
  product[itemIndex].price = newProduct.price;
  product[itemIndex].category = newProduct.category;
  product[itemIndex].image = newProduct.image;
  product[itemIndex].quantity = newProduct.quantity;
  product[itemIndex].description = newProduct.description;
  localStorage.setItem("product", JSON.stringify(product));
  // reloadTable()
  location.reload();
}

function activeFormUpdate() {
  document.querySelector(".form.update-item").classList.add("active");
  if (document.querySelector(".product-detail.active")) {
    removeProductDetail();
  }
}

function removeFormUpdate() {
  document.querySelector(".form.update-item.active").classList.remove("active");
}

// ===3. show product detail.===

let $showItemInfo = document.getElementById("product-detail");
let detailItemHtml = "";
function productDetail(x) {
  // const product = JSON.parse(localStorage.getItem("product")) || [];
  let detailItem = product.find((item) => item.id == x);
  targetId = detailItem.id;
  detailItemHtml = `<div class="product-detail">
      <div>
        <button class="btn-action update" type="submit"  onclick=activeFormUpdate()><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn-action close" type="button" onclick=removeProductDetail()><i class="fa-solid fa-square-xmark"></i></button>
      </div>
      <div class="product-wrap">
        <p class='image-product'><img src="${detailItem.image}"</p>
        <div class='product-text'>
          <p>Mã sản phẩm: ${detailItem.id}</p>
          <h3>${detailItem.productName}</h3>
          <p>Giá cả: ${detailItem.price}<span> đ</span></p>
          <p>Số lượng: ${detailItem.quantity}</p>
          <p>Mô tả: ${detailItem.description}</p>
        </div>
      </div>
    </div>`;
  $showItemInfo.innerHTML = detailItemHtml;
  activeProductDetail();
  // removeProductDetail()
}

function activeProductDetail() {
  document.querySelector(".product-detail").classList.add("active");
}

function removeProductDetail() {
  document.querySelector(".product-detail.active").classList.remove("active");
}

// ===4. remove item in product management table===
function remove($this, id) {
  let $trParent = $this.closest("tr");
  let idItem = $trParent.getAttribute("id");
  if (confirm("Are you sure?")) {
    $tbody.removeChild($trParent);
    removeItemLocal(idItem);
    location.reload();
  }
}

// remove item in localStorage
let removeItemLocal = function (id) {
  let newData = product.filter(function (e) {
    return e.id != id;
  });
  localStorage.setItem("product", JSON.stringify(newData));
};

// ===5. filter product===
// search item by price or name
let $formSearch = document.getElementById("form-search");
let $keyWord = document.getElementById("key-word");
$formSearch.addEventListener("submit", function (e) {
  e.preventDefault();
  let $keySearch = document.getElementById("search-key").value;
  let filterProduct = product.filter(function (product) {
    let $productName = product.productName;
    return (
      new RegExp($keySearch.toLowerCase()).test($productName.toLowerCase()) ===
        true ||
      (parseInt($keySearch) - 5000000 <= parseInt(product.price) &&
        parseInt($keySearch) >= parseInt(product.price))
    );
  });
  $formSearch.reset();
  console.log(filterProduct);

  //show item
  let productHtml = "";
  for (let index in filterProduct) {
    productHtml += `<tr id="${filterProduct[index].id}">
        <td>${parseInt(index) + 1}</td>
        <td class=image><img src="${filterProduct[index].image}"</td>
        <td>${filterProduct[index].productName}</td>
        <td>${filterProduct[index].price}<span> đ</span></td>
        <td>${filterProduct[index].quantity}</td>
        <!--<td>${filterProduct[index].description}</td> --!>
        <td>
          <button type ="button" onclick="update(${filterProduct[index].id})" 
            class="btn-action update"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type ="button" onclick="productDetail(${
            filterProduct[index].id
          })"class="btn-action detail"><i class="fa-solid fa-eye"></i></button>
          <button type ="button" onclick="remove(this)" class="btn-action remove"><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>`;
  }
  $tbody.innerHTML = productHtml;
  if ($keySearch == "") {
    $keyWord.innerText = "Tất cả sản phẩm";
  } else if ($keySearch - 1 >= 0) {
    $keyWord.innerHTML = `Từ ${$keySearch - 5000000} đ đến ${$keySearch} đ`;
  } else {
    $keyWord.innerHTML = $keySearch;
  }
  activeReplaceKey();
});

function activeReplaceKey() {
  document.querySelector(".replace-key").classList.add("active");
}
