import './style/index.scss'
import { loadAsset } from './config.ts';
import { tilesetInit, tilePool, tilesetComponent } from './component/tileset.ts';
import { mapInit, mapComponent } from './component/map.ts';
import { setAllDrag } from './effect/drag.ts';

(async () => {

	const a = await loadAsset();
	console.log('asset manifest', a);

	await tilesetInit(a.tileset);
	mapInit(80, 20);

	console.log(tilePool);

	const hm = mapComponent();
	document.body.appendChild(hm);
	console.log(hm);

	const ht = await tilesetComponent();
	document.body.appendChild(ht);

	setAllDrag(".tile")
})();
