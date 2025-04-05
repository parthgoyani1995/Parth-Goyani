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
            const ecomVariants = activeItem.querySelectorAll(".ecom-variants option");
            ecomVariants.forEach(variant =>
            {
                const variantText = variant.innerText;
                if ( variantText === selectedVariant )
                {
                    const qty = parseInt(variant.dataset.qty);
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


    // Add to cart feature

    const cartButtons = document.querySelector(".popup-item-cart-button");
    cartButtons.addEventListener("click", (event) =>
    {
        event.preventDefault();
        const activeItem = document.querySelector(".popup-item.active");
        const selectedVariantColor = activeItem.querySelector(".popup-item-variant-color.active");
        const selectedSize = activeItem.querySelector(".selected-value").innerText;

        if ( selectedSize && selectedVariantColor )
        {
            // get value of .ecom-variants by matching text like 'size - color'
            const selectedVariant = selectedSize + " / " + selectedVariantColor.innerText;
            // match selectedVariant with options in .ecom-variants and get data-qty and value
            const ecomVariants = activeItem.querySelectorAll(".ecom-variants option");
            ecomVariants.forEach(variant =>
            {
                const variantText = variant.innerText;
                if ( variantText === selectedVariant )
                {
                    const qty = parseInt(variant.dataset.qty);
                    const outOfStock = activeItem.querySelector(".popup-item-out-of-stock");
                    if ( qty > 0 )
                    {
                        // add to cart
                        alert("Added to cart: " + variant.value);
                    }
                }
            });
        }
    });






});