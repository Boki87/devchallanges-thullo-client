import { merge, namespaced } from "overmind/config";
import { createOvermind } from "overmind";
import { createHook } from "overmind-react";

import * as user from "./user";

const config = merge(
  namespaced({
    user,
  })
);

export const overmind = createOvermind(config);

export const useOvermind = createHook();
