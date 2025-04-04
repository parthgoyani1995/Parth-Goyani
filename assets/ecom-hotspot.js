document.addEventListener("DOMContentLoaded", () =>
{
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
                dropdown.classList.remove('open');
            });
        });
    });
});