

let products = new Array();

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
hasDiscount.addEventListener('change', handlerChangeHasDiscount);
btnCreate.addEventListener('click', handlerClickBtnCreate);
btnCancel.addEventListener('click', handlerClickBtnCancel);
btnSave.addEventListener('click', handlerClickBtnSave);

//handler events
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
        new Date().getTime(),
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

    containerTotalValue.innerHTML = `<p class="text-success display-1">
    $${Utils.getTotalValueByProducts(products)}
    </p>`;
    Utils.clearForm(document.querySelectorAll('form input'));

}

function addProductToList(product) {

    const template = `
    <a href="#" class="list-group-item list-group-item-action">
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
            <div id="btnDelete" class="text-danger d-flex align-items-center">
                <i class="fa-solid fa-circle-xmark m-2"></i>
            </div>
        </div>

    </a>
`;
    containerProductList.innerHTML = template + containerProductList.innerHTML;

}





















