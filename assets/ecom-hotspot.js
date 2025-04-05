document.addEventListener("DOMContentLoaded", () =>
{
    const popup = document.querySelector(".popup-overlay");

    // Function to open the popup
    function openPopup(icon)
    {
        const hotspotId = icon.dataset.hotspotid;
        document.querySelectorAll(".popup-item").forEach(item => item.classList.remove("active"));
        document.querySelector(`#${ hotspotId }`).classList.add("active");
        popup.classList.add("active");
    }

    // Function to close the popup
    function closePopup()
    {
        popup.classList.remove("active");
    }

    // Function to handle outside click to close the popup
    function handleOutsideClick(event)
    {
        const popupContent = document.querySelector(".popup-content");
        if ( popup.classList.contains("active") && !popupContent.contains(event.target) && !event.target.closest(".ecom-hotspot-icon") )
        {
            closePopup();
        }
    }

    // Function to handle variant color selection
    function handleVariantColorSelection(item)
    {
        document.querySelectorAll(".popup-item-variant-color.active").forEach(activeItem => activeItem.classList.remove("active"));
        item.classList.add("active");
        updateSelectedVariant();
    }

    // Function to handle dropdown selection
    function handleDropdownSelection(dropdown, option)
    {
        const selected = dropdown.querySelector('.selected-value');
        selected.textContent = option.textContent;
        updateSelectedVariant();
        dropdown.classList.remove('open');
    }

    // Function to update the selected variant
    function updateSelectedVariant()
    {
        const activeItem = document.querySelector(".popup-item.active");
        const selectedColor = activeItem.querySelector(".popup-item-variant-color.active");
        const selectedSize = activeItem.querySelector(".selected-value").innerText;
        if ( selectedSize && selectedColor )
        {
            const selectedVariant = `${ selectedSize } / ${ selectedColor.innerText }`;
            const options = activeItem.querySelectorAll(".ecom-variants option");
            options.forEach(option =>
            {
                if ( option.innerText === selectedVariant )
                {
                    option.selected = true;
                    const qty = parseInt(option.dataset.qty);
                    const outOfStock = activeItem.querySelector(".popup-item-out-of-stock");
                    const cartButton = activeItem.querySelector(".popup-item-cart-button");
                    if ( qty === 0 )
                    {
                        outOfStock.classList.remove("ecom-hidden");
                        cartButton.classList.add("ecom-hidden");
                    }
                    else
                    {
                        outOfStock.classList.add("ecom-hidden");
                        cartButton.classList.remove("ecom-hidden");
                    }
                }
            });
        }
    }

    // Function to handle add to cart success
    function handleAddToCartSuccess(data, cartButton)
    {
        if ( cartButton )
        {
            const cartMessage = cartButton.parentElement.querySelector(".popup-item-cart-message");
            if ( cartMessage )
            {
                cartMessage.classList.remove("ecom-hidden");
                cartMessage.innerText = "Item added to cart";
                setTimeout(() => cartMessage.classList.add("ecom-hidden"), 3000);
            }
        }
        const cartCount = document.querySelector(".cart-count");
        if ( cartCount )
        {
            cartCount.innerText = parseInt(cartCount.innerText) + 1;
        }
    }

    // Function to add item to cart
    function addToCart(variantId, cartButton = null)
    {
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: variantId, quantity: 1})
        })
            .then(response => response.json())
            .then(data => handleAddToCartSuccess(data, cartButton))
            .catch(error => console.error('Error:', error));
    }

    // Function to handle add to cart button click
    function handleAddToCartButtonClick(event)
    {
        event.preventDefault();
        const cartButton = event.currentTarget;
        const activeItem = document.querySelector(".popup-item.active");
        const selectedColor = activeItem.querySelector(".popup-item-variant-color.active");
        const selectedSize = activeItem.querySelector(".selected-value").innerText;
        if ( !selectedSize || !selectedColor )
        {
            const cartMessage = cartButton.parentElement.querySelector(".popup-item-cart-message");
            if ( cartMessage )
            {
                cartMessage.classList.remove("ecom-hidden");
                cartMessage.innerText = "Please select a variant";
                setTimeout(() => cartMessage.classList.add("ecom-hidden"), 3000);
            }
            return;
        }
        const selectedVariantId = activeItem.querySelector(".ecom-variants").value;
        addToCart(selectedVariantId, cartButton);
        console.log("Cart completed");

        // Add complementary product if selected variant is Medium / Black
        // if ( activeItem.querySelector(".ecom-variants option:checked").innerText === 'Medium / Black' )
        // {
        //     const complementaryProduct = document.querySelector(".hotspot_complementary_product");
        //     const complementaryProductVariantId = complementaryProduct.dataset.variantid;
        //     setTimeout(() => addToCart(complementaryProductVariantId), 1000);
        // }
    }

    // Event listeners
    document.querySelectorAll(".ecom-hotspot-icon").forEach(icon => icon.addEventListener("click", () => openPopup(icon)));
    document.querySelector(".popup-close").addEventListener("click", closePopup);
    document.addEventListener("click", handleOutsideClick);
    document.querySelectorAll(".popup-item-variant-color").forEach(item => item.addEventListener("click", () => handleVariantColorSelection(item)));
    document.querySelectorAll('.popup-variant-dropdown').forEach(dropdown =>
    {
        const select = dropdown.querySelector('.popup-item-variant-select');
        dropdown.addEventListener('click', () =>
        {
            document.querySelectorAll('.popup-variant-dropdown').forEach(d => d.classList.remove('open'));
            dropdown.classList.toggle('open');
        });
        select.querySelectorAll('span').forEach(option => option.addEventListener('click', event =>
        {
            event.stopPropagation();
            handleDropdownSelection(dropdown, option);
        }));
    });
    document.querySelectorAll(".popup-item-cart-button").forEach(button => button.addEventListener("click", handleAddToCartButtonClick));
});