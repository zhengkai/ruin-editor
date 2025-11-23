import { dumpMap } from './map.ts';

export function opComponent(): HTMLDivElement {
	const o = document.createElement('div');
	o.classList.add('op');

	const dl = document.createElement('button');
	dl.classList.add('download');
	dl.textContent = 'Download';
	dl.onclick = dumpMap;
	o.appendChild(dl);

	return o;
}
