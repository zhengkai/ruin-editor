import { pb } from '../pb';

export interface Tile {
	id: number;
	pos: string;
	w: number;
	h: number;
}

export interface TileSet {
	name: pb.Tileset.Name;
	url: string;
	w: number;
	h: number;
	sizeW: number;
	sizeH: number;
	list: Tile[];
}

export const tilePool = new Map<pb.Tileset.Name, TileSet>();

function getImageSize(url: string): Promise<{ w: number; h: number }> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve({ w: img.width, h: img.height });
		img.onerror = reject;
		img.src = url;
	});
}

export async function tilesetInit(li: pb.ITileset[]) {

	for (const t of li.map(t => pb.Tileset.create(t))) {

		let s = tilePool.get(t.name);
		if (!s) {
			s = {
				name: t.name,
				url: `asset/${t.path}`,
				w: 0,
				h: 0,
				sizeW: 0,
				sizeH: 0,
				list: [{ id: 0, pos: '', w: 0, h: 0 }],
			};
			tilePool.set(t.name, s);
		}

		const { w: sw, h: sh } = pb.Size.fromObject(t.size || { w: 32, h: 32 });
		({ w: s.w, h: s.h } = await getImageSize(s.url));

		let id = 0;
		for (let y = 0; y < s.h; y += sh) {
			for (let x = 0; x < s.w; x += sw) {
				id++;
				s.list.push({ id, pos: `-${x}px -${y}px`, w: sw, h: sh });
			}
		}
	}
};

export async function setTileBg(name: pb.Tileset.Name, id: number, e: HTMLDivElement) {

	const s = tilePool.get(name);
	if (!s) {
		console.warn(`unknown tileset ${name}`);
		return;
	}

	const t = s.list[id];
	if (!t) {
		console.warn(`unknown tile ${name}.${id}`);
		return;
	}

	e.style.backgroundImage = `url("${s.url}")`;
	e.style.backgroundPosition = t.pos;
}

export async function tilesetComponent(): Promise<HTMLDivElement> {
	const o = document.createElement('div');
	o.classList.add('tileset');

	for (const [k, s] of tilePool) {

		const box = document.createElement('div');
		box.style.width = `${s.w + 2 * (s.w / s.list[1].w)}px`;
		box.style.height = `${s.h + 2 * (s.h / s.list[1].h)}px`;

		for (const t of s.list) {
			if (!t.id) {
				continue;
			}
			const et = document.createElement('div');
			et.classList.add('tile');
			et.style.width = `${t.w}px`;
			et.style.height = `${t.h}px`;
			et.style.backgroundImage = `url("${s.url}")`;
			et.style.backgroundPosition = t.pos;
			box.appendChild(et);

			et.dataset.id = t.id.toString();
			et.dataset.name = k.toString();
		}
		o.appendChild(box);
	};
	return o;
}
