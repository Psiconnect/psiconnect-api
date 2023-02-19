import {
    commentsDTOSchema,
    punctualityDTOSchema,
    treatmentDTOSchema,
    scoreDTOSchema,
    generalDTOSchema
  } from "../typeDTO.js";
  
  import { Type } from "@sinclair/typebox";
  import Ajv from "ajv";
  import addErrors from "ajv-errors";
  
  const ReviewDTOSchema = Type.Object(
    {
      comments: commentsDTOSchema,
      punctuality: punctualityDTOSchema,
      treatment: treatmentDTOSchema,
      score: scoreDTOSchema,
      general: generalDTOSchema
    },
    {
      additionalProperties: false,
      errorMessage: {
        additionalProperties: "El formato del review no es válido",
      },
    }
  );
  
  const ajv = new Ajv({ allErrors: true }).addKeyword("kind").addKeyword("modifier");
  
  addErrors(ajv);
  
  const validateSchema = ajv.compile(ReviewDTOSchema);
  
  const validateReviewDTO = (req, res, next) => {
    try {
      const isDTOValid = validateSchema(req.body);
  
      if (!isDTOValid) {
        return res.status(400).send({
          errors: validateSchema.errors.map((error) => error.message),
        });
      }
  
      next();
    } catch (error) {
      return res.status(error.status).json(error.message);
    }
  };
  
  export default validateReviewDTO;