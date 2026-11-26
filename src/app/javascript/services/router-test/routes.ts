import Parts1 from "./vue/parts/Parts1.vue";
import Parts2 from "./vue/parts/Parts2.vue";

import { RouterComponentInfos } from "./types";

export const components = { Parts1, Parts2 };

export const componentInfos: RouterComponentInfos = {
  Parts1: {
    sort: 1,
  },
  Parts2: {
    sort: 2,
  },
};
