document.addEventListener("DOMContentLoaded", function ()
{
    let popupItemVariantColor = document.querySelectorAll(".popup-item-variant-color");
    if ( popupItemVariantColor.length > 0 )
    {
        popupItemVariantColor.forEach(function (item)
        {
            item.addEventListener("click", function ()
            {
                var activeItem = document.querySelector(".popup-item-variant-color.active");
                if ( activeItem )
                {
                    activeItem.classList.remove("active");
                }
                this.classList.add("active");
            });
        });
    }

    /* Dropdown menu */
    const dropdowns = document.querySelectorAll('.popup-variant-dropdown');

    document.addEventListener('click', function (event)
    {
        dropdowns.forEach(dropdown =>
        {
            if ( !dropdown.contains(event.target) )
            {
                dropdown.classList.remove('open');
            }
        });
    });

    dropdowns.forEach(dropdown =>
    {
        const select = dropdown.querySelector('.popup-item-variant-select');
        const selected = dropdown.querySelector('.selected-value');

        dropdown.addEventListener('click', function ()
        {
            dropdown.classList.toggle('open');
        });

        select.querySelectorAll('span').forEach(option =>
        {
            option.addEventListener('click', function ()
            {
                selected.textContent = option.textContent;
                dropdown.classList.remove('open');
            });
        });
    });

});