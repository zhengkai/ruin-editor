import { pb } from './pb';

export async function loadRes(): Promise<void> {

	let re = {};
	try {
		re = await (await fetch('/asset/manifest.json')).json();
	} catch (_) {
	}

	console.log(pb.AssetManifest.fromObject(re));
};
