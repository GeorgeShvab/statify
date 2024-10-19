import { ObjectShape, object } from "yup"

const schema = <T extends ObjectShape>(shape: T) => object().shape(shape)

export default schema
