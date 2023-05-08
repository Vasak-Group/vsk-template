import StackColorScheme from './functions/colorScheme';
import { setNavBarOnScroll } from './functions/onScrollElemnts';
import { scrollTo } from './functions/scrollTo';
// @ts-ignore
import * as WOW from './libs/wow.min.js';
// @ts-ignore
import * as counterUp from './libs/counterUp.min.js';

const Stack = {
	init: () => {
		/**
		 * Add copy button to code block
		 */
		const highlights = document.querySelectorAll(
			'.article-content div.highlight'
		);
		const copyText = `Copiar`,
			copiedText = `Copiado!`;

		highlights.forEach((highlight) => {
			const copyButton = document.createElement('button');
			copyButton.innerHTML = copyText;
			copyButton.classList.add('copyCodeButton');
			highlight.appendChild(copyButton);

			const codeBlock = highlight.querySelector('code[data-lang]');
			if (!codeBlock) return;

			copyButton.addEventListener('click', () => {
				navigator.clipboard
					.writeText(codeBlock.textContent as string)
					.then(() => {
						copyButton.textContent = copiedText;

						setTimeout(() => {
							copyButton.textContent = copyText;
						}, 1000);
					})
					.catch((err) => {
						alert(err);
					});
			});
		});

		new StackColorScheme(
			document.getElementById('dark-mode-toggle') as HTMLElement
		);

		// Add navbar toggler EventListener
		const navbarToggler = document.querySelector('.navbar-toggler');
		navbarToggler?.addEventListener('click', function () {
			navbarToggler?.classList.toggle('active');
		});

		// Init WoW.js
		new WOW().init();

		// Init counterUp.js
		const cu = new counterUp({
			start: 0,
			duration: 2000,
			intvalues: true,
			interval: 100,
		});
		cu.start();

		// Add Scroll to Top
		const scrollTop = document.querySelector('.scroll-top') as HTMLElement;
		scrollTop.onclick = function () {
			scrollTo(document.documentElement as HTMLElement);
		};
	},
};

window.addEventListener('load', () => {
	setTimeout(function () {
		Stack.init();
	}, 0);
});

declare global {
	interface Window {
		createElement: any;
		Stack: any;
	}
}
window.Stack = Stack;
window.onscroll = function () {
	setNavBarOnScroll();
};
