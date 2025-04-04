document.addEventListener("DOMContentLoaded", function ()
{

    let popupItemVariantColor = document.querySelectorAll(".popup-item-variant-color");
    if (popupItemVariantColor.length > 0) {
        popupItemVariantColor.forEach(function (item) {
            item.addEventListener("click", function () {
                var activeItem = document.querySelector(".popup-item-variant-color.active");
                if (activeItem) {
                    activeItem.classList.remove("active");
                }
                this.classList.add("active");
            });
        });
    }
});
