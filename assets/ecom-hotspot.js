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


    dropdowns.forEach(dropdown =>
    {
        const select = dropdown.querySelector('.popup-item-variant-select');
        const selected = dropdown.querySelector('.selected-value');

        dropdown.addEventListener('click', function ()
        {
            if ( !dropdown.classList.contains('open') )
            {
                dropdowns.forEach(d => d.classList.remove('open'));
                dropdown.classList.add('open');
            }
            else
            {
                dropdown.classList.remove('open');
            }
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