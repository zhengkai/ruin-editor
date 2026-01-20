import { pb } from '../pb';
import { htmlNew } from '../util/html.ts';
import { setTileBg } from './tileset.ts';

const cellSize = 32;

export let mapPool = pb.Map.fromObject({});

export const mapInit = async (m: pb.IMap) => {

	let d = pb.Map.fromObject(m);
	const p: { [key: number]: pb.MapCell } = {};

	for (const c of d.terrain) {
		if (!c?.tile) {
			continue;
		}
		p[c?.id || 0] = pb.MapCell.fromObject(c);
	}

	mapPool = pb.Map.fromObject(m);
	mapPool.terrain.length = 0;

	for (let y = d.h - 1; y >= 0; y--) {
		for (let x = 0; x < d.w; x++) {
			const id = y * d.w + x;
			mapPool.terrain.push(p[id] || pb.MapCell.fromObject({ id }));
		}
	}
	console.log('mapPool', d.name, mapPool);
}

export const dumpMapTerrain = () => {
	const pool = pb.Map.fromObject(mapPool.toJSON());
	pool.terrain = pool.terrain.filter((c: pb.IMapCell) => c?.tile);
	return JSON.stringify(pool.terrain);
}

const createTile = (p: pb.IMapCell) => {

	const m = mapPool;

	const et = htmlNew('div');
	const id = p?.id || 0;
	et.title = `id: ${id}, x: ${id % m.w}, y: ${Math.floor(id / m.w)}`;
	const tilePut = (e: CustomEvent<{ name: pb.Tileset.Name; id: number }>) => {
		const name = e.detail.name | 0;
		const id = e.detail.id | 0;
		et.dataset.name = name.toString();
		et.dataset.id = id.toString();
		setTileBg(name, id, et);
		p.tile = pb.MapCellTile.fromObject({ name, id });
		// console.log(`${name}.${id} on ${p.id}`);
	};

	for (const tr of m.trigger) {
		if (tr?.id === id) {
			et.classList.add('trigger');
			return et;
		}
	};

	et.addEventListener('contextmenu', e => {
		Object.keys(et.dataset).forEach(k => delete et.dataset[k]);
		et.style.backgroundImage = '';
		p.tile = null;
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	et.addEventListener('tilePut', tilePut as EventListener);
	if (p.tile) {
		const tile = pb.MapCellTile.fromObject(p.tile);
		tilePut(new CustomEvent('tilePut', { detail: { name: tile.name, id: tile.id } }));
	}

	return et;
}

export const mapComponent = () => {

	const m = mapPool;
	const o = htmlNew('div', 'map');
	o.style.width = `${(cellSize + 2) * m.w}px`;
	o.style.height = `${(cellSize + 2) * m.h}px`;

	for (const p of mapPool.terrain) {

		o.appendChild(createTile(p));
	}

	return o;
}
