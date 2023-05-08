/*!
 *   Hugo Theme Stack
 *
 *   @author: Jimmy Cai
 *   @website: https://jimmycai.com
 *   @link: https://github.com/CaiJimmy/hugo-theme-stack
 */
import StackColorScheme from './functions/colorScheme';
import { setNavBarOnScroll } from './functions/onScrollElemnts';

let Stack = {
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
