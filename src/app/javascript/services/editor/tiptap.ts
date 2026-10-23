import { format } from 'prettier/standalone';
import * as htmlPlugin from 'prettier/plugins/html';

export const formatHtml = async (val: string) => {
  return await format(val, {
    parser: 'html',
    plugins: [htmlPlugin],
    printWidth: 80,
  });
};
