import { Type } from "@sinclair/typebox";

export const dniDTOSchema = Type.String({
  minLength: 8,
  maxLength: 10,
  errorMessage: {
    minLength: "DNI no valido",
    maxLength: "DNI no valido",
  },
});

export const nameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    minLength: "name debe tener al menos 2 caracteres de longitud",
    maxLength: "name debe tener como máximo 20 caracteres de longitud",
  },
});

export const surnameDTOSchema = Type.String({
  minLength: 4,
  maxLength: 50,
  errorMessage: {
    minLength: "surname debe tener al menos 4 caracteres de longitud",
    maxLength: "surname debe tener como máximo 50 caracteres de longitud",
  },
});



export const skillDTOSchema =Type.Array({
    minLength: 1,
    maxLength: 12,
    errorMessage: {
      minLength: "Skill debe tener al menos 1 elemento de longitud",
      maxLength: "Skill debe tener como máximo 12 elementos de longitud"
    },
}
)
export const areasDTOSchema =Type.Array({
    minLength: 1,
    maxLength: 12,
    errorMessage: {
      minLength: "Area debe tener al menos 1 elemento de longitud",
      maxLength: "Area debe tener como máximo 12 elementos de longitud",
    },
}
)

export const descriptionDTOSchema = Type.String({
    minLength: 10,
    maxLength: 1500,
    errorMessage: {
      minLength: "la descripcion debe tener al menos 10 caracteres de longitud",
      maxLength: "la descripcion debe tener como máximo 1500 caracteres de longitud",
    },
  });

  export const linkedinDTOSchema = Type.String({
    minLength: 20,
    maxLength: 200,
    errorMessage: {
      minLength: "el linkedin debe tener al menos 20 caracteres de longitud",
      maxLength: "el linkedin debe tener como máximo 200 caracteres de longitud",
    },
  });


export const emailDTOSchema = Type.String({
  format: "email",
  errorMessage: {
    type: "El tipo del email no es válido, debe ser un string",
    format: "El formato del email no es válido, debe cumplir el RFC 5322",
  },
});

export const passwordDTOSchema = Type.String({
  format: "password",
  minLength: 10,
  maxLength: 25,
  errorMessage: {
    type: "El tipo de la password no es válido, debe ser un string",
    format:
      "El formato de la password, debe contener una mayúscula, una minúcula y un número",
    minLength: "password debe tener al menos 10 caracteres de longitud",
    maxLength: "password debe tener como máximo 25 caracteres de longitud",
  },
});

export const commentsDTOSchema = Type.String({
  maxLength: 400,
  errorMessage: {
    maxLength: "La review no puede tener más de 400 caracteres",
  },
});

export const punctualityDTOSchema = Type.Number({
  minimum: 1,
  maximum: 5,
  errorMessage: {
    type: "El tipo de puntualidad no es válido, debe ser un número",
    minimum: "La puntualidad debe ser mayor o igual a 1",
    maximum: "La puntualidad debe ser menor o igual a 5",
  },
});

export const treatmentDTOSchema = Type.Number({
  minimum: 1,
  maximum: 5,
  errorMessage: {
    type: "El tipo de trato no es válido, debe ser un número",
    minimum: "El trato debe ser mayor o igual a 1",
    maximum: "El trato debe ser menor o igual a 5",
  },
});

export const scoreDTOSchema = Type.Number({
  minimum: 1,
  maximum: 10,
  errorMessage: {
    type: "El tipo del score no es válido, debe ser un número",
    minimum: "El score debe ser mayor o igual a 0",
    maximum: "El score debe ser menor o igual a 5",
  },
});

export const generalDTOSchema = Type.Number({
  minimum: 0,
  maximum: 5,
  errorMessage: {
    type: "El tipo de general no es válido, debe ser un número",
    minimum: "El valor general debe ser mayor o igual a 0",
    maximum: "El valor general debe ser menor o igual a 5",
  },
});

export const priceDTOSchema = Type.String({
  minimum: 1,
  maximum: 3,
  errorMessage: {
    type: "El tipo de precio no es válido, debe ser un número",
    minimum: "El precio debe tener al menos 1 caracteres de longitud",
    maximum: "El precio debe tener al menos 3 caracteres de longitud",
  },
});