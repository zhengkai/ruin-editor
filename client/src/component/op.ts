import { htmlNew } from '../util/html.ts';
import { pb } from '../pb';
import { dumpMap } from './map.ts';

const download = (content: string, filename: string, contentType: string = 'application/json') => {

	const blob = new Blob([content], { type: contentType });
	const url = URL.createObjectURL(blob);

	const a = htmlNew('a');
	a.href = url;
	a.download = filename;
	a.click();

	URL.revokeObjectURL(url);
}

export function opComponent(ml: pb.IMap[], mapCb: (idx: number) => void): HTMLDivElement {

	const o = htmlNew('div', 'op');

	const dl = htmlNew('button', 'download');
	dl.textContent = 'Download';
	dl.onclick = () => {
		const s = dumpMap();
		download(s, 'map.json');
	}
	o.appendChild(dl);

	const select = htmlNew('select');
	ml.forEach((v, i) => {
		const option = htmlNew('option');
		option.value = '' + i;
		if (i === 0) {
			option.selected = true;
		}
		option.textContent = `${v.name}`;
		select.appendChild(option);
	});
	select.onchange = () => {
		const idx = parseInt(select.value, 10);
		mapCb(idx);
	};
	o.appendChild(select);
	mapCb(0);

	return o;
}
