async function setNavBarOnScroll() {
	const headerNavbar = document.querySelector('.navbar-area');
	const sticky = headerNavbar?.offsetTop;
	if (window.scrollY > sticky) {
		headerNavbar?.classList.add('sticky');
	} else {
		headerNavbar?.classList.remove('sticky');
	}
}

export { setNavBarOnScroll };
