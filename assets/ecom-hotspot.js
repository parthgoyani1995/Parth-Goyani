document.addEventListener("DOMContentLoaded", () =>
{
    const popup = document.querySelector(".popup-overlay");

    // Open pop up on + icon click
    const ecomHotspotIcons = document.querySelectorAll(".ecom-hotspot-icon");
    ecomHotspotIcons.forEach(icon =>
    {
        icon.addEventListener("click", (event) =>
        {
            event.preventDefault();
            // get the data from the icon
            const hotspotId = icon.dataset.hotspotid;
            // remove active from all .popup-item
            const activeItems = document.querySelectorAll(".popup-item");
            activeItems.forEach(item =>
            {
                item.classList.remove("active");
            });
            const activeItem = document.querySelector("#" + hotspotId);
            activeItem.classList.add("active");
            // Show the popup
            popup.classList.add("active");

        });
    });


    // close popup when clicking on X
    const closePopup = document.querySelector(".popup-close");
    closePopup.addEventListener("click", () =>
    {
        popup.classList.remove("active");
    });

    // Close popup when clicking outside of .popup-content
    document.addEventListener("click", (event) =>
    {
        const popupContent = document.querySelector(".popup-content");
        if ( popup.classList.contains("active") && !popupContent.contains(event.target) && !closePopup.contains(event.target) && !event.target.closest(".ecom-hotspot-icon") )
        {
            popup.classList.remove("active");
        }
    });


    // Custom variant selection JS.
    const popupItemVariantColor = document.querySelectorAll(".popup-item-variant-color");
    popupItemVariantColor.forEach(item =>
    {
        item.addEventListener("click", () =>
        {
            const activeItem = document.querySelector(".popup-item-variant-color.active");
            if ( activeItem )
            {
                activeItem.classList.remove("active");
            }
            item.classList.add("active");
        });
    });

    const dropdowns = document.querySelectorAll('.popup-variant-dropdown');
    dropdowns.forEach(dropdown =>
    {
        const select = dropdown.querySelector('.popup-item-variant-select');
        const selected = dropdown.querySelector('.selected-value');

        dropdown.addEventListener('click', () =>
        {
            dropdowns.forEach(d => d.classList.remove('open'));
            dropdown.classList.toggle('open');
        });

        select.querySelectorAll('span').forEach(option =>
        {
            option.addEventListener('click', event =>
            {
                event.stopPropagation();
                selected.textContent = option.textContent;
                getSelectedVariant();
                dropdown.classList.remove('open');
            });
        });
    });


    // Select appropriate variant in ecom-variants
    function getSelectedVariant()
    {
        const activeItem = document.querySelector(".popup-item.active");
        const selectedVariantColor = activeItem.querySelector(".popup-item-variant-color.active");
        const selectedSize = activeItem.querySelector(".selected-value").innerText;
        if ( selectedSize && selectedVariantColor )
        {
            // get value of .ecom-variants by matching text like 'size - color'
            const selectedVariant = selectedSize + " / " + selectedVariantColor.innerText;

            // match selectedVariant with options in .ecom-variants and get data-qty and value
            const options = activeItem.querySelectorAll(".ecom-variants option");
            options.forEach(option =>
            {
                const variantText = option.innerText;
                if ( variantText === selectedVariant )
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

    // getSelectedVariant on click of popup-item-variant-color  and popup-item-variant-select
    popupItemVariantColor.forEach(item =>
    {
        item.addEventListener("click", () =>
        {
            getSelectedVariant();
        });
    });

    function handleSuccess(data, cartButton)
    {
        // add message in .popup-item-cart-message
        if ( cartButton )
        {
            let cartMessage = cartButton.parentElement.querySelector(".popup-item-cart-message");
            if ( !cartMessage )
            {
                console.error("Cart message element not found");
                return;
            }
            cartMessage.classList.remove("ecom-hidden");
            cartMessage.innerText = "Item added to cart";
            // remove message after 3 seconds
            setTimeout(() =>
            {
                cartMessage.classList.add("ecom-hidden");
            }, 3000);

        }

        const cartCount = document.querySelector(".cart-count");
        if ( !cartCount )
        {
            console.error("Cart count element not found");
            return;
        }
        const currentCount = parseInt(cartCount.innerText);
        cartCount.innerText = currentCount + 1;
    }

    async function ecomAddToCart(selectedVariantId, cartButton = null)
    {
        if ( cartButton )
        {
            cartButton.classList.remove("ecom-hidden");
        }
        await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: selectedVariantId,
                quantity: 1
            })
        })
            .then(response => response.json())
            .then(data =>
            {
                console.log('Success:', data);
                handleSuccess(data, cartButton);
            })
            .catch((error) =>
            {
                console.error('Error:', error);
            });
        return true;
    }


    // Add to cart feature
    const cartButtons = document.querySelectorAll(".popup-item-cart-button");
    cartButtons.forEach(button =>
    {
        button.addEventListener("click", (event) =>
        {
            event.preventDefault();
            const cartButton = event.currentTarget;
            const activeItem = document.querySelector(".popup-item.active");
            const selectedVariantColor = activeItem.querySelector(".popup-item-variant-color.active");
            const selectedSize = activeItem.querySelector(".selected-value").innerText;
            if ( !selectedSize || !selectedVariantColor )
            {
                let cartMessage = cartButton.parentElement.querySelector(".popup-item-cart-message");
                if ( !cartMessage )
                {
                    console.error("Cart message element not found");
                    return;
                }
                cartMessage.classList.remove("ecom-hidden");
                cartMessage.innerText = "Please select a variant";
                // remove message after 3 seconds
                setTimeout(() =>
                {
                    cartMessage.classList.add("ecom-hidden");
                }, 3000);
                console.error("Please select a variant");
                return;
            }


            const selectedVariantId = activeItem.querySelector(".ecom-variants").value;
            // get text for selected option
            const selectedVariantText = activeItem.querySelector(".ecom-variants option:checked").innerText;
            ecomAddToCart(selectedVariantId, cartButton);

            // Add Complementary product if selectedVariantText is Medium / Black
            if ( selectedVariantText === 'M / Black' )
            {
                const complementaryProduct = document.querySelector(".hotspot_complementary_product");
                const complementaryProductVariantId = complementaryProduct.dataset.variantid;
                ecomAddToCart(complementaryProductVariantId);
            }
        });
    });
});