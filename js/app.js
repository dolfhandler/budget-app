

let products = [];

//containers
let containerProductForm = document.querySelector('#container-product-form');
let containerProductList = document.querySelector('#container-product-list');
let containerTotalValue = document.querySelector('#container-total-value');
let containerCreateProduct = document.querySelector('#container-create-product');
let containerDiscount = document.querySelector('#container-discount');

//buttons
let btnCancel = document.querySelector('#btnCancel');
let btnSave = document.querySelector('#btnSave');
let btnCreate = document.querySelector('#btnCreate');

//inputs
let id = document.querySelector('#id');
let description = document.querySelector('#description');
let value = document.querySelector('#value');
let amount = document.querySelector('#amount');
let discount = document.querySelector('#discount');

//input chekboxes
let hasDiscount = document.querySelector('#hasDiscount');

//events
document.addEventListener('DOMContentLoaded', handlerContentLoaded);
hasDiscount.addEventListener('change', handlerChangeHasDiscount);
btnCreate.addEventListener('click', handlerClickBtnCreate);
btnCancel.addEventListener('click', handlerClickBtnCancel);
btnSave.addEventListener('click', handlerClickBtnSave);

//handler events
function handlerContentLoaded(event) {

    loadProducts();

}

function loadProducts() {

    const hasElements = products.length > 0;

    if (hasElements) {

        containerProductList.style.display = 'block'
        products.forEach(addProductToList);
        showTotalValueByProducts();

    } else {

        containerProductList.style.display = 'none'

    }

}

function handlerChangeHasDiscount(event) {

    const show = event.target.checked ? 'block' : 'none';
    containerDiscount.style.display = show;

}

function handlerClickBtnCreate(event) {

    containerProductForm.style.display = 'block';
    containerCreateProduct.style.display = 'none';
    containerTotalValue.style.display = 'none';
    containerProductList.style.display = 'none';

}

function handlerClickBtnCancel(event) {

    containerProductForm.style.display = 'none';
    containerCreateProduct.style.display = 'block';
    containerTotalValue.style.display = 'block';
    containerProductList.style.display = 'block';

    Utils.clearForm(document.querySelectorAll('form input'));

}

function handlerClickBtnSave(event) {

    const product = new Product(
        new Date().getTime().toString(),
        description.value,
        parseFloat(value.value),
        parseFloat(amount.value),
        hasDiscount.checked,
        parseFloat(discount.value)
    );

    products.push(product);
    addProductToList(product);

    containerProductForm.style.display = 'none';
    containerCreateProduct.style.display = 'block';
    containerTotalValue.style.display = 'block';
    containerProductList.style.display = 'block';

    showTotalValueByProducts();
    Utils.clearForm(document.querySelectorAll('form input'));

}

function showTotalValueByProducts() {

    containerTotalValue.innerHTML = `<p class="text-success display-1">
    $${Utils.getTotalValueByProducts(products)}
    </p>`;

}

function addProductToList(product) {

    const template = `
    <a class="product-item list-group-item list-group-item-action"
    product-id="${product.id}">
        <div class="d-flex w-100 justify-content-between">
            <div class="w-100">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${product.description}</h5>
                    <div class="text-body-secondary">
                        <small>$${product.getTotalValue()}</small>
                    </div>

                </div>
                <small class="mb-1 d-flex flex-row text-body-secondary">
                    <div class="mr-2"><b>Cant:</b> ${product.amount}</div>
                    <div class="p-2"></div>
                    <div class="mr-2"><b>Valor:</b> $${product.value}</div>
                </small>
                <small class="mb-1 text-body-secondary"
                style="display: ${product.hasDiscount ? 'block' : 'none'}">
                    <div class="mr-2"><b>Descuento:</b> ${product.discount}%</div>
                </small>
            </div>
            <div class="btnDelete text-danger d-flex align-items-center"
            product-id="${product.id}">
                <i class="fa-solid fa-circle-xmark m-2"></i>
            </div>
        </div>

    </a>
`;
    containerProductList.innerHTML = template + containerProductList.innerHTML;

    //dinamyc buttons
    let btnDelete = document.querySelectorAll('.btnDelete');

    //dinamyc events
    btnDelete.forEach(btn => btn.addEventListener('click', handlerClickBtnDelete));

}

//handler dinamyc events
function handlerClickBtnDelete(event) {

    const btnDelete = (event.target.tagName === 'I') ?
        event.target.parentElement :
        event.target;

    const productId = btnDelete.getAttribute('product-id');
    const productItem = btnDelete.parentElement.parentElement;

    //delete products logically
    products = products.filter(p => p.id !== productId);

    //delete products from view
    productItem.remove();

    showTotalValueByProducts();

}

















