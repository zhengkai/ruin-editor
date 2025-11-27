import { pb } from '../pb';
import { setTileBg } from './tileset.ts';

const cellSize = 32;

export const mapPool = pb.Map.fromObject({});

export const mapInit = async (w: number, h: number) => {

	let d: pb.Map | null = null;
	const p: { [key: number]: pb.MapCell } = {};

	try {
		const s = await (await fetch('asset/map.json')).json();
		d = pb.Map.fromObject(s);
		w = d.w;
		h = d.h;
		for (const c of d.list) {
			if (!c?.id || !c?.tile) {
				continue;
			}
			p[c.id] = pb.MapCell.fromObject(c);
		}
	} catch (x) {
	}
	console.log(p);

	mapPool.w = w;
	mapPool.h = h;
	mapPool.list.length = 0;

	let id = 0;
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			mapPool.list.push(p[id] || pb.MapCell.fromObject({ id }));
			id++;
		}
	}
	console.log('mapPool', mapPool);
}

export const dumpMap = () => {
	const pool = pb.Map.fromObject(mapPool.toJSON());
	pool.list = pool.list.filter((c: pb.IMapCell) => c?.tile);
	return JSON.stringify(pool.toJSON());
}

export const mapComponent = () => {

	const m = mapPool;
	const o = document.createElement('div');
	o.classList.add('map');
	o.style.width = `${(cellSize + 2) * m.w}px`;
	o.style.height = `${(cellSize + 2) * m.h}px`;

	for (const p of mapPool.list) {
		const et = document.createElement('div');
		const tilePut = (e: CustomEvent<{ name: pb.Tileset.Name; id: number }>) => {
			const name = e.detail.name;
			const id = e.detail.id | 0;
			et.dataset.name = name.toString();
			et.dataset.id = id.toString();
			setTileBg(name, id, et);
			p.tile = pb.MapCellTile.fromObject({ name, id });
			console.log(`${name}.${id} on ${p.id}`);
		};
		et.addEventListener('tilePut', tilePut as EventListener);
		if (p.tile) {
			const tile = pb.MapCellTile.fromObject(p.tile);
			tilePut(new CustomEvent('tilePut', { detail: { name: tile.name, id: tile.id } }));
		}
		o.appendChild(et);
	}
	return o;
}
