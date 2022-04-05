let itemInCart = JSON.parse(localStorage.getItem("productInCart")) || [];
let num = itemInCart.length;
localStorage.setItem("numberCart", num);
let $numberItems = document.getElementById("number-item");
$numberItems.innerHTML = localStorage.getItem("numberCart");

var newEl = "";
var $tbody = document.getElementById("insert-content");
for (let index in itemInCart) {
  newEl += `
  <tr id=${itemInCart[index].id}>
    <td>${parseInt(index) + 1}</td>
    <td class="product-img-small">
      <img src="${itemInCart[index].image}"
    </td>
    <td>${itemInCart[index].title}</td>
    <td>${itemInCart[index].price} đ</td>
    <td>
      <button type ="button" onclick="remove(this)" class="btn-action remove">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </td>
  </tr>`;
}
console.log("hello");

// remove item in cart
function remove($this, id) {
  var $trParent = $this.closest("tr");
  var idItem = $trParent.getAttribute("id");
  console.log(idItem);

  if (confirm("Are you sure?")) {
    $tbody.removeChild($trParent);
    removeItemLocal(idItem);
    location.reload();
    console.log(idItem);
  }
}

// remove item in local
var removeItemLocal = function (id) {
  var newData = itemInCart.filter(function (e) {
    return e.id != id;
  });
  // console.log(cart)
  localStorage.setItem("productInCart", JSON.stringify(newData));
  console.log(id);
};

$tbody.innerHTML = newEl;
