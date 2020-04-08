import { msdfGenerator } from '../src/index';

msdfGenerator({
  fontID: 'noto-sans-cjk-jp',
  charset: 'abcdef',
  textureSize: 128,
  ttfFile: './example/noto-sans-cjk-jp/ttf/NotoSansCJKjp-Regular.ttf',
  output: './example/noto-sans-cjk-jp'
});