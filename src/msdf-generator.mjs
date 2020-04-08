import fs from 'fs';
import path from 'path';
import generateBMFont from 'msdf-bmfont-xml';

import { CHARSET_ALPHABET,CHARSET_HIRAGANA,CHARSET_KATAKANA,CHARSET_JYOUYOU_KANJI,CHARSET_JINMEI_KANJI } from './charset.constant';

const DEFAULT_FONTID = 'noto-sans-cjk-jp';
const DEFAULT_FONT_PATH = `fonts/${DEFAULT_FONTID}`;
const DEFAULT_TTF_FONT_PATH = `${DEFAULT_FONT_PATH}/ttf/NotoSansCJKjp-Regular.ttf`;
const DEFAULT_TEXTURE_SIZE = 1024;

const DEFAULT_CHARSET = `${CHARSET_ALPHABET}${CHARSET_HIRAGANA}${CHARSET_KATAKANA}${CHARSET_JYOUYOU_KANJI}${CHARSET_JINMEI_KANJI}`;

/**
 * @param {Object} option.fontID 引数
 * @param {Object} option.charset 引数
 * @param {Object} option.textureSize 引数
 * @param {Object} option.ttfFile 引数
 * @param {Object} option.output 引数
 */
export async function msdfGenerator(option) {
  const dirname = path.dirname(new URL(import.meta.url).pathname);

  const fontID = (option && option.fontID) ? option.fontID : DEFAULT_FONTID;
  const charset = (option && option.charset) ? option.charset : DEFAULT_CHARSET;
  const textureSize = (option && option.textureSize) ? option.textureSize : DEFAULT_TEXTURE_SIZE;
  const ttfFilePath =  (option && option.ttfFile) ? option.ttfFile : DEFAULT_TTF_FONT_PATH;
  const output = (option && option.output) ? option.output : DEFAULT_FONT_PATH;

  try {
    const fontFile = fs.readFileSync(path.join(dirname, ttfFilePath))
    const result = await createJsonAndTexture(fontID, fontFile, charset, textureSize);
    fs.writeFileSync(path.join(dirname, `${output}/${fontID}-msdf.json`), JSON.stringify(result.json));
    fs.writeFileSync(path.join(dirname, `${output}/${fontID}-msdf.png`), result.textures[0].texture);
    console.log('ok', result.textures);
  } catch (e) {
    console.error(e);
    console.error({ error: 'Sorry, something went wrong.' });
  }
}

async function createJsonAndTexture(fontID, fontFile, charset, textureSize) {
  const fontOptions = {
    filename: fontID,
    outputType: 'json',
    charset: charset,
    textureSize: [textureSize, textureSize],
    pot: true,
  };

  const { json, textures } = await new Promise((resolve, reject) => {
    generateBMFont(fontFile, fontOptions, async (e, textures, font) => {
      e ? reject(e) : resolve({ textures, json: JSON.parse(font.data) });
    });
  });

  return { json, textures };
}
