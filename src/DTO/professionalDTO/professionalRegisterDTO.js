import {
  emailDTOSchema,
  dniDTOSchema,
  nameDTOSchema,
  surnameDTOSchema,
  passwordDTOSchema,
} from "../typeDTO.js";

import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

const RegisterProfessionalDTOSchema = Type.Object(
  {
    email: emailDTOSchema,
    DNI: dniDTOSchema,
    name: nameDTOSchema,
    lastName: surnameDTOSchema,
    password: passwordDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del register no es válido-en este",
    },
  }
);

const ajv = new Ajv({ allErrors: true })
  .addKeyword("kind")
  .addKeyword("modifier");

ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
ajv.addFormat("DNI", /^[0-9]{8}$/);

addFormats(ajv, ["email"]);
addErrors(ajv);

const validateSchema = ajv.compile(RegisterProfessionalDTOSchema);

const professionalRegisterDTO = (req, res, next) => {
  try {
    const isDTOValid = validateSchema(req.body);

    if (!isDTOValid)
      return res.status(400).send({
        errors: validateSchema.errors.map((error) => error.message),
      });

    next();
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};


export default professionalRegisterDTO;
