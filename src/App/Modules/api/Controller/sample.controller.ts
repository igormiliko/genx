
import Controller from "../../../Core/Controller";
import { sample } from "@prisma/client";

/**
 * @note The controller's responsibility is to receive the request, respond 
 * to it, and handle errors from underlying layers to respond correctly
 */
class _ extends Controller<sample> {}

export default new _()
