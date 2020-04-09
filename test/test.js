const fs = require('fs-extra');
const assert = require('assert');

const msdfGenerator = require('../lib/index.js').msdfGenerator;

describe('msdfGenerator', function() {
  const output = './test/noto-sans-cjk-jp';
  
  beforeEach(function() {
    fs.removeSync(output);
  });

  it('creates json and png', async function() {
    await msdfGenerator({
      fontID: 'noto-sans-cjk-jp',
      charset: 'abcdef',
      textureSize: 128,
      ttfFile: './example/noto-sans-cjk-jp/ttf/NotoSansCJKjp-Regular.ttf',
      output
    });
  
    const expectedOutput1 = `${output}/noto-sans-cjk-jp-msdf.json`;
    const expectedOutput2 = `${output}/noto-sans-cjk-jp-msdf.png`;
    fs.exists(expectedOutput1, function (ex) {
      assert.equal(ex, true);
    })
    fs.exists(expectedOutput2, function (ex) {
      assert.equal(ex, true);
    })
  });

  afterEach(function() {
    fs.removeSync(output);
  });
})
