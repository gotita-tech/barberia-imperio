// Ejecutar con Sharp disponible: node scripts/prepare-images.cjs
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const sources = path.join(root, 'assets/_archivo/originales');
const output = path.join(root, 'assets/images');
const photos = [
  {name: 'fade-perfil', top: 24, role: 'hero'},
  {name: 'fade-lineas', top: 24, role: 'galeria'},
  {name: 'diseno-ondas', top: 14, role: 'galeria'},
  {name: 'corte-frontal', top: 24, role: 'galeria'}
];
(async () => {
  await fs.mkdir(output, {recursive: true});
  const manifest = [];
  for (const photo of photos) {
    const original = await fs.readFile(path.join(sources, photo.name + '.webp'));
    const meta = await sharp(original).metadata();
    const crop = {left: Math.floor((meta.width - 240) / 2), top: photo.top, width: 240, height: 320};
    if (crop.left < 0 || crop.top + crop.height > meta.height) throw new Error('Recorte fuera del original: ' + photo.name);
    const variants = [];
    for (const width of [120, 160, 240]) {
      const file = photo.name + '-' + width + '.webp';
      await sharp(original).extract(crop).resize({width, withoutEnlargement: true}).webp({quality: 88}).toFile(path.join(output, file));
      variants.push({file, width, height: Math.round(width * 4 / 3)});
    }
    manifest.push({name: photo.name, role: photo.role, source: 'assets/_archivo/originales/' + photo.name + '.webp', sha256: crypto.createHash('sha256').update(original).digest('hex'), original: {width: meta.width, height: meta.height}, crop, variants});
  }
  await fs.writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('4 recortes y 12 variantes listos; originales intactos.');
})().catch(error => {console.error(error.message); process.exit(1);});
