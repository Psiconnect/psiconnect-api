import { descriptionDTOSchema, linkedinDTOSchema, skillDTOSchema } from "../typeDTO.js";

import { Type } from "@sinclair/typebox";

const PostRegisterProfessionalDTOSchema = Type.Object(
  {
    description: descriptionDTOSchema,
    skills: skillDTOSchema,
    linkedin: linkedinDTOSchema,
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

  ajv.addFormat('skills',/(Winter|Summer|Spring|Autumn)\b/)
