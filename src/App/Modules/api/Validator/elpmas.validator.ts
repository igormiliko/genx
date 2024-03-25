import Validator from "../../../Core/Validator";

class Elpmas extends Validator {
    public entityPrimaryKey: string = "id";
    public validColumns = { 
		"id": "Int",
		"hit": "BigInt"
	}
}

export default new Elpmas()
