import { pb } from '../pb';

function getImageSize(url: string): Promise<{ w: number; h: number }> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve({ w: img.width, h: img.height });
		img.onerror = reject;
		img.src = url;
	});
}

export async function tilesetComponent(li: pb.Tileset[]): Promise<HTMLDivElement> {
	const o = document.createElement('div');
	o.classList.add('tileset');

	for (const t of li) {
		const { w, h } = await getImageSize(`asset/${t.path}`);
		const { w: sw, h: sh } = pb.Size.fromObject(t.size || { w: 32, h: 32 });

		const box = document.createElement('div');
		box.style.width = `${w + 2 * (w / sw)}px`;
		box.style.height = `${h + 2 * (w / sw)}px`;

		for (let y = 0; y < h; y += sh) {
			for (let x = 0; x < w; x += sw) {
				const te = document.createElement('div');
				te.classList.add('tile');
				te.style.width = `${sw}px`;
				te.style.height = `${sh}px`;
				te.style.backgroundImage = `url(asset/${t.path})`;
				te.style.backgroundPosition = `-${x}px -${y}px`;
				box.appendChild(te);
				console.log(te);
			}
		}
		o.appendChild(box);
	}
	return o;
}
