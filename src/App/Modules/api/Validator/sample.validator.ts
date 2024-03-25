import Validator from "../../../Core/Validator";

class Sample extends Validator {
    public entityPrimaryKey: string = "id";
    public validColumns = { 
		"id": "Int",
		"data": "Json?"
	}
}

export default new Sample()
