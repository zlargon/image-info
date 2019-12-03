const assert = require('assert');
const ImageInfo = require('.');
const testCases = [
  ['img/bw_rabbit.jpg', true],
  ['img/bw_square.jpg', true],
  ['img/color_bush.jpg', false],
  ['img/color_chocolate.jpg', false],
  ['img/color_cloud.jpg', false],
  ['img/color_racing.jpg', false]
];

const test = async () => {
  for (const [file, bw] of testCases) {
    console.log('\n' + file);
    const img = await ImageInfo(file);
    console.log(img);
    assert(bw === img.isBlackAndWhite);
  }

  console.log('\nAll Pass!!');
};

// test
test().catch(console.log);
