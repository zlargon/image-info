const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const isBlackAndWhite = (image) => {
  for (let x = 0; x < image.bitmap.width; x++) {
    for (let y = 0; y < image.bitmap.height; y++) {
      const hex = image.getPixelColor(x, y);
      const rgb = Jimp.intToRGBA(hex);

      const { r, g, b } = rgb;
      if (r !== g || g !== b) {
        console.log(`Pixel (${x}, ${y}) is colorful: `, rgb);
        return false;
      }
    }
  }
  return true;
}

const fileStats = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (err) reject(err);
      else     resolve(stats);
    });
  });
}

module.exports = ImageInfo = async (file) => {
  const stats = await fileStats(file);
  const image = await Jimp.read(file);

  return {
    name: path.basename(file),
    type: image._originalMime,
    size: stats.size,
    width: image.bitmap.width,
    height: image.bitmap.height,
    isBlackAndWhite: isBlackAndWhite(image)
  };
}
