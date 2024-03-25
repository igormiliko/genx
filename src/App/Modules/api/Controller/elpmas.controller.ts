
import Controller from "../../../Core/Controller";
import { elpmas } from "@prisma/client";

/**
 * @note The controller's responsibility is to receive the request, respond 
 * to it, and handle errors from underlying layers to respond correctly
 */
class _ extends Controller<elpmas> {}

export default new _()
