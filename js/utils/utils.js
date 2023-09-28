

class Utils {

    static textFields = ['hidden', 'text', 'number'];
    static checkFields = ['checkbox'];

    static getTotalValueByProducts(products) {

        let total = 0;
        products.forEach(product => {
            total += product.getTotalValue();
        });
        return total;
    }

    static clearForm(inputs) {

        inputs.forEach(input => {

            let inputType = input.getAttribute('type');

            if (this.textFields.includes(inputType)) {
                input.value = '';
            }

            if (this.checkFields.includes(inputType)) {
                input.checked = false;
                //trigger event when changed the checkbox
                input.dispatchEvent(new Event("change"));
            }

        });

    }

}


