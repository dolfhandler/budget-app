


class Product {

    constructor(id, description, value, amount, hasDiscount, discount){
        this.id = id;
        this.description = description;
        this.value = value;
        this.amount = amount;
        this.hasDiscount = hasDiscount;
        this.discount = discount;
    }

    getTotalValue() {

        return this.hasDiscount ?
            this.amount * (this.value * (1 - this.discount / 100)) :
            this.amount * this.value;

    }

}