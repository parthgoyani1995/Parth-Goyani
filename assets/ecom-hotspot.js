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
    ```javascript
dropdown.addEventListener('click', function (event)
{
    if (!dropdown.contains(event.target))
    {
        dropdown.classList.remove('open');
    }
    else
    {
        dropdown.classList.toggle('open');
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
```

});