// Like item
function likeItem(itemnumber) {
    
    var likeBtn = document.getElementById("like"+itemnumber);
    var likeBtnClass = likeBtn.classList;

    // Check if the element has a specific class
    if (likeBtnClass.contains("btn-outline-primary")) {

        // Remove the original class
        likeBtn.classList.remove("btn-outline-primary");

        // Add new class
        likeBtn.classList.add("btn-primary");

        // console.log("The element has the class 'firstClass'");
    } else if (likeBtnClass.contains("btn-primary")) {
        
        // Remove the original class
        likeBtn.classList.remove("btn-primary");

        // Add new class
        likeBtn.classList.add("btn-outline-primary");
    } else {
        
        // Add new class
        likeBtn.classList.add("btn-outline-primary");
    }
    
}

// Decrement Item in the input box
function subtractItem(itemnumber){
    
    // Get value from input
    let itemqty = document.getElementById("qty"+itemnumber).value;
    itemqty --;
    
    // Prevent decrement less than 1
    if (itemqty > 0) {
        
        // Show the new quantity in input
        document.getElementById("qty"+itemnumber).value = itemqty;
        singleSubTotal(itemnumber);

        // console.log(itemqty);
    }

}

// Increament Item in the text box
function addItem(itemnumber){
    
    // Get value from input
    let itemqty = document.getElementById("qty"+itemnumber).value;
    itemqty ++;

    // Show the new quantity in input
    document.getElementById("qty"+itemnumber).value = itemqty;
    singleSubTotal(itemnumber);

    console.log(itemqty);
}

function singleSubTotal(itemnumber){
    
    // Use the item number to construct the id for the price and qty to get their values
    let itemprice = document.getElementById("price"+itemnumber).innerHTML;
    let itemqty = document.getElementById("qty"+itemnumber).value;
    
    // let itemsingletotal = document.getElementById("total"+itemnumber).innerHTML;
    let itemtotal = itemprice * itemqty;
    
    // Show the total in span
    document.getElementById("total"+itemnumber).innerHTML = itemtotal;

    // Recalculate total price
    totalPrice(subTotalPrice());
    
}

// Calculate subtotal of all items
function subTotalPrice() {
    
    // Get all items with a class itemlist
    const items = document.getElementsByClassName("itemlist");

    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {

        // For each of the items, retrive the corresponding Id of the parent element
        let itemid = items[i].id;

        // Get the item number from the last character of the id
        let itemnumber = itemid.charAt(itemid.length - 1);

        // Use the item number to construct the id for the price and qty to get their values
        let itemprice = document.getElementById("price"+itemnumber).innerHTML;
        let itemqty = document.getElementById("qty"+itemnumber).value;
        
        // let itemsingletotal = document.getElementById("total"+itemnumber).innerHTML;
        let itemtotal = itemprice * itemqty;
        subtotal += itemtotal;
        
        document.getElementById("total"+itemnumber).innerHTML = itemtotal;
        
    }

    // console.log("ST:", subtotal);
    // Show the subtotal at the summary container
    return subtotal;

}

function totalPrice(subtotal) {

    
    // Get Tax and Discount from the span element by id
    let taxprice = document.getElementById("taxprice").innerHTML;
    let discountprice = document.getElementById("discountprice").innerHTML;
    let totalprice = 0;
    let warning = "";

    // convert the string to float calculate the actual amount to debit
    taxprice = parseFloat(taxprice);
    discountprice = parseFloat(discountprice);
    let taxcredit = subtotal * taxprice * 0.01;
    let discountdebit = subtotal * discountprice * 0.01;

    // Subtract discount, tax and subtotal to get total price
    if (subtotal > discountdebit) {
        totalprice = subtotal + taxcredit - discountdebit;
        warning = "Discount applied";
    } else {
        totalprice = subtotal;
        warning = "Discount not applicable, order more items to enjoy discount.";
    }

    // console.log(totalprice);

    // Display subtotal and total
    document.getElementById("subtotalprice").innerHTML = subtotal;
    document.getElementById("totalprice").innerHTML = totalprice;
    document.getElementById("summarywarning").innerHTML = warning;

}

// Delete Item Card
function deleteItem(itemnumber) {
    let itemcard = document.getElementById("item"+itemnumber);
    let itemtotal = document.getElementById("total"+itemnumber);
    let totalprice = document.getElementById("subtotalprice");

    itemcard.remove();

    totalPrice(subTotalPrice());
    // alert("hi" + itemnumber);
}