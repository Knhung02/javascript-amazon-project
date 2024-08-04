import { cart as myCart } from "../data/cart";
import { products } from "../data/products";

let productsHTML = '';

products.forEach((product)=>{
    //combine this HTML together
    productsHTML += `
         <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class = "add-to-cart-button button-primary js-add-to-cart"
                data-product-id = "${product.id}"
           >
            Add to Cart
          </button>
        </div>
    `
});

// console.log(productsHTML)

// put it on the web page (using the DOM)
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Make it interactive
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click', ()=>{
        // console.log('Added product')
        //  console.log(button.dataset)
        const productId = button.dataset.productId;

        let matchingItem;

        // 1. Check if the product is already in the cart.
        cart.forEach((item)=>{
            if(productId === item.productId){
                matchingItem = item;
            }
        })

        // 2. If it is in the cart, increase the quantity.
        // 3. If it is not in the cart, add it to the cart.
        if(matchingItem){
            matchingItem.quantity += 1;
        }else{
            cart.push({
                productId: productId,
                quantity: 1
            });
        }

        //1. Calculate the quantity.
        let cartQuantity = 0;

        cart.forEach((item)=>{
          cartQuantity += item.quantity;
        })
        // console.log(cartQuantity)
        // console.log(cart);

        //2. Put the quantity on the page (using the DOM)
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

        
    });
});
