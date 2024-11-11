document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const product = {
        code: document.getElementById('productCode').value,
        name: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        unit: document.getElementById('unit').value,
        quantity: parseInt(document.getElementById('quantity').value),
        costPrice: document.getElementById('costPrice').value,
        salePrice: document.getElementById('salePrice').value,
        supplier: document.getElementById('supplier').value,
        entryDate: document.getElementById('entryDate').value,
        location: document.getElementById('location').value,
        minQuantity: parseInt(document.getElementById('minQuantity').value)
    };

    if (!updateProductQuantity(product.code, product.quantity)) {
        addProductToTable(product);
    } else {
        alert(`Quantidade do produto ${product.name} atualizada.`);
    }

    checkStockLevels();
    clearForm();
});

document.getElementById('search-bar').addEventListener('input', function (e) {
    searchProducts(e.target.value);
});

document.getElementById('search-button').addEventListener('click', function () {
    const searchTerm = document.getElementById('search-bar').value;
    searchProducts(searchTerm);
});

function searchProducts(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const rows = document.querySelectorAll('#product-table tr');

    rows.forEach(row => {
        const productCode = row.children[0].innerText.toLowerCase();
        const productName = row.children[1].innerText.toLowerCase();

        if (productCode.includes(searchTerm) || productName.includes(searchTerm)) {
            row.style.display = '';
            row.style.backgroundColor = 'yellow'; // Destacar a linha
        } else {
            row.style.display = 'none';
            row.style.backgroundColor = ''; // Remover o destaque
        }
    });
}

function addProductToTable(product) {
    const table = document.getElementById('product-table');
    const row = table.insertRow();

    row.insertCell(0).innerText = product.code;
    row.insertCell(1).innerText = product.name;
    row.insertCell(2).innerText = product.category;
    row.insertCell(3).innerText = product.description;
    row.insertCell(4).innerText = product.unit;
    row.insertCell(5).innerHTML = `<input type="number" value="${product.quantity}" class="form-control" onchange="updateTableQuantity(this)">`;
    row.insertCell(6).innerText = product.costPrice;
    row.insertCell(7).innerText = product.salePrice;
    row.insertCell(8).innerText = product.supplier;
    row.insertCell(9).innerText = product.entryDate;
    row.insertCell(10).innerText = product.location;
    row.insertCell(11).innerHTML = `<input type="number" value="${product.minQuantity}" class="form-control" onchange="updateMinQuantity(this)">`;

    const actions = row.insertCell(12);

    // Botão de Dar Baixa
    const decreaseBtn = document.createElement('button');
    decreaseBtn.innerText = 'Dar Baixa';
    decreaseBtn.classList.add('btn', 'btn-warning', 'btn-action', 'me-2');
    decreaseBtn.addEventListener('click', function () {
        decreaseStock(row);
    });
    actions.appendChild(decreaseBtn);

    // Botão de Excluir
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Excluir';
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-action');
    deleteBtn.addEventListener('click', function () {
        row.remove();
    });
    actions.appendChild(deleteBtn);
}

function updateProductQuantity(code, additionalQuantity) {
    const rows = document.querySelectorAll('#product-table tr');
    for (let row of rows) {
        const productCode = row.children[0].innerText;
        if (productCode === code) {
            const quantityCell = row.children[5].querySelector('input');
            let quantity = parseInt(quantityCell.value);
            quantity += additionalQuantity;
            quantityCell.value = quantity;
            return true;
        }
    }
    return false;
}

function updateTableQuantity(input) {
    const row = input.parentElement.parentElement;
    const newQuantity = parseInt(input.value);

    row.children[5].querySelector('input').value = newQuantity;

    checkStockLevels();
}

function updateMinQuantity(input) {
    const row = input.parentElement.parentElement;
    const newMinQuantity = parseInt(input.value);

    row.children[11].querySelector('input').value = newMinQuantity;

    checkStockLevels();
}

function checkStockLevels() {
    const rows = document.querySelectorAll('#product-table tr');
    rows.forEach(row => {
        const quantity = parseInt(row.children[5].querySelector('input').value);
        const minQuantity = parseInt(row.children[11].querySelector('input').value);

        if (quantity <= minQuantity) {
            alert(`Estoque baixo: ${row.children[1].innerText}`);
        }
    });
}

function decreaseStock(row) {
    const quantityCell = row.children[5].querySelector('input');
    let quantity = parseInt(quantityCell.value);
    quantity -= 1;
    quantityCell.value = quantity;

    checkStockLevels();
}

function clearForm() {
    document.getElementById('product-form').reset();
}
