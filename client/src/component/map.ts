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

export function mapComponent(): HTMLDivElement {

	const m = mapPool;
	const o = document.createElement('div');
	o.classList.add('map');
	o.style.width = `${(m.pw + 2) * m.w}px`;
	o.style.height = `${(m.ph + 2) * m.h}px`;
	for (let y = 0; y < m.h; y++) {
		for (let x = 0; x < m.w; x++) {
			const et = document.createElement('div');
			o.appendChild(et);
		}
	}
	return o;
}
