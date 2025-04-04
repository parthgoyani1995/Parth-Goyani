document.addEventListener("DOMContentLoaded", function ()
{
    // menu-burger click open close .ecom-banner-text-wrapper
    const menuBurger = document.querySelector('.menu-burger');
    const ecomBannerTextWrapper = document.querySelector('.ecom-banner-text-wrapper');
    const openMenu = document.querySelector('.open-menu');
    const closeMenu = document.querySelector('.close-menu');
    menuBurger.addEventListener('click', function ()
    {
        if (ecomBannerTextWrapper.classList.contains('active'))
        {
            ecomBannerTextWrapper.classList.remove('active');
            openMenu.style.display = 'block';
            closeMenu.style.display = 'none';
        }
        else
        {
            ecomBannerTextWrapper.classList.add('active');
            openMenu.style.display = 'none';
            closeMenu.style.display = 'block';
        }
    });

});
