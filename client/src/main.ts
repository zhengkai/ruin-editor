import './style/index.scss'
import { loadAsset } from './config.ts';
import { tilesetInit, tilePool, tilesetComponent } from './component/tileset.ts';
import { mapInit, mapComponent } from './component/map.ts';
import { opComponent } from './component/op.ts';
import { setAllDrag } from './effect/drag.ts';

(async () => {

	const a = await loadAsset();
	console.log('asset manifest', a);

	await tilesetInit(a.tileset);
	await mapInit(80, 20);

	console.log(tilePool);

	document.body.appendChild(mapComponent());

	const ht = await tilesetComponent();
	document.body.appendChild(ht);

	const op = opComponent();
	ht.appendChild(op);

	setAllDrag(".tile")
})();
