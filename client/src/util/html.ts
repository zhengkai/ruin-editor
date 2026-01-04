export function htmlNew<K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	cls?: string
): HTMLElementTagNameMap[K] {
	const el = document.createElement(tagName);
	if (cls) {
		el.classList.add(cls);
	}
	return el;
}
