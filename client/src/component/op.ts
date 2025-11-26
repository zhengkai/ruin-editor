import { dumpMap } from './map.ts';

const download = (content: string, filename: string, contentType: string = 'application/json') => {

	const blob = new Blob([content], { type: contentType });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();

	URL.revokeObjectURL(url);
}

export function opComponent(): HTMLDivElement {
	const o = document.createElement('div');
	o.classList.add('op');

	const dl = document.createElement('button');
	dl.classList.add('download');
	dl.textContent = 'Download';
	dl.onclick = () => {
		const s = dumpMap();
		download(s, 'map.json');
	}
	o.appendChild(dl);

	return o;
}
