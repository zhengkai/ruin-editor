import { setTileBg } from './tileset.ts';

export interface CellTile {
	name: string;
	id: number;
}

export interface MapCell {
	id: number;
	tile?: CellTile;
}

export interface RuinMap {
	list: MapCell[];
	w: number;
	h: number;
	pw: number;
	ph: number;
}

export const mapPool: RuinMap = {
	list: [],
	w: 0,
	h: 0,
	pw: 32,
	ph: 32,
};

export function mapInit(w: number, h: number) {
	let id = 0;
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			mapPool.list.push({ id });
			id++;
		}
	}
	mapPool.w = w;
	mapPool.h = h;
}

export const dumpMap = () => {
	const pool = JSON.parse(JSON.stringify(mapPool));
	pool.list = pool.list.filter((c: MapCell) => c.tile);
	console.log(pool);
	console.log(mapPool);
}

export function mapComponent(): HTMLDivElement {

	const m = mapPool;
	const o = document.createElement('div');
	o.classList.add('map');
	o.style.width = `${(m.pw + 2) * m.w}px`;
	o.style.height = `${(m.ph + 2) * m.h}px`;

	for (const p of mapPool.list) {
		const et = document.createElement('div');
		const tilePut = (e: CustomEvent<{ name: string; id: number }>) => {
			const name = e.detail.name;
			const id = e.detail.id | 0;
			et.dataset.name = name;
			et.dataset.id = id.toString();
			setTileBg(name, id, et);
			p.tile = { name, id };
			console.log(`${e.detail.name}.${e.detail.id} on ${p.id}`);
		};
		et.addEventListener('tilePut', tilePut as EventListener);
		o.appendChild(et);
	}
	return o;
}
