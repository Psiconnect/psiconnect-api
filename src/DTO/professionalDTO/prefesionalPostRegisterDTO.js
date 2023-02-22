import { areasDTOSchema, descriptionDTOSchema, linkedinDTOSchema, skillDTOSchema, priceDTOSchema } from "../typeDTO.js";
import addErrors from "ajv-errors";
import { Type } from "@sinclair/typebox";
import Ajv from "ajv";

const PostRegisterProfessionalDTOSchema = Type.Object(
  {
    description: descriptionDTOSchema,
    areas: areasDTOSchema,
    skills: skillDTOSchema,
    linkedin: linkedinDTOSchema,
    price:priceDTOSchema
  },
  {
    additionalProperties: true,
    errorMessage: {
      additionalProperties: "El formato del register no es válido-en este",
    },
  }
);



const ajv = new Ajv({ allErrors: true })
  .addKeyword("kind")
  .addKeyword("modifier");

 

  addErrors(ajv);

const validateSchema = ajv.compile(PostRegisterProfessionalDTOSchema);

const professionalPostRegisterDTO = (req, res, next) => {
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
  
  
  export default professionalPostRegisterDTO;
  
