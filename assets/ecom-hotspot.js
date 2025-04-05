document.addEventListener("DOMContentLoaded", () =>
{

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
                dropdown.classList.remove('open');
            });
        });
    });

    // close popup when clicking on X
   const closePopup = document.querySelector(".popup-close");
   closePopup.addEventListener("click", () =>
   {
       const popup = document.querySelector(".popup-overlay");
       popup.classList.remove("active");
   });

   // Close popup when clicking outside of .popup-content
   document.addEventListener("click", (event) =>
   {
       const popup = document.querySelector(".popup-overlay");
       const popupContent = document.querySelector(".popup-content");
       if (popup.classList.contains("active") && !popupContent.contains(event.target) && !closePopup.contains(event.target))
       {
           popup.classList.remove("active");
       }
   });

});