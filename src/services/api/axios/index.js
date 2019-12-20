/*
  Connection of files with axios requests to the server
*/

import * as get from "./get";
import * as put from "./put";
import * as create from "./create";
import * as del from "./del";
import * as auth from "./auth"

export default { ...get, ...put, ...create, ...del, ...auth };
