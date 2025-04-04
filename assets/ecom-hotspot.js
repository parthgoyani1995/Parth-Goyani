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

    /* drop down menu */
    
    const dropdowns = document.querySelectorAll('.popup-variant-dropdown');

    dropdowns.forEach(dropdown =>
    {
        const select = dropdown.querySelector('.popup-item-variant-select');
        const selected = document.createElement('div');
        selected.className = 'selected-value';
        selected.textContent = select.querySelector('span').textContent;
        dropdown.insertBefore(selected, select);

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

});
