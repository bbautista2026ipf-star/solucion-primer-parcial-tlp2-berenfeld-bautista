// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import {
  ProjectModel,
  TechnologyModel,
  UserModel,
} from "../../models/index.js";

const statusList = ["planning", "in_progress", "paused", "finished"];

// findByPk respeta paranoid: no encuentra a los usuarios eliminados lógicamente
const activeLeader = async (leader_id) => {
  const user = await UserModel.findByPk(leader_id);
  if (!user) throw new Error("El líder debe ser un usuario existente y activo");
  return true;
};

const existingTechnologies = async (technologies) => {
  if (new Set(technologies).size !== technologies.length)
    throw new Error("No se pueden repetir technologies");

  for (const id of technologies) {
    const technology = await TechnologyModel.findByPk(id);
    if (!technology) throw new Error(`La technology con id ${id} no existe`);
  }
  return true;
};

export const createProjectValidation = [
  // TODO: 1. Validar code: obligatorio y único (ProjectModel).
  body("code")
    .trim()
    .notEmpty()
    .withMessage("El código es obligatorio")
    .matches(/^PRJ-\d{4}$/)
    .withMessage("El código debe tener el formato PRJ-0000")
    .custom(async (code) => {
      const found = await ProjectModel.findOne({ where: { code } });
      if (found) throw new Error("Ya existe un proyecto con ese código");
      return true;
    }),
  // TODO: 2. Validar name y description como obligatorios.
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
  // TODO: 3. Validar status: opcional y limitado a los estados permitidos.
  body("status")
    .optional()
    .isIn(statusList)
    .withMessage("El estado debe ser planning, in_progress, paused o finished"),
  // TODO: 4. Validar start_date como fecha válida y budget como número positivo, ambos obligatorios.
  body("start_date")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria")
    .isDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
  body("budget")
    .notEmpty()
    .withMessage("El presupuesto es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El presupuesto debe ser un número positivo"),
  // TODO: 5. Validar leader_id: debe existir y pertenecer a un usuario activo (UserModel).
  body("leader_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El líder debe indicarse con un id numérico")
    .bail()
    .custom(activeLeader),
  // TODO: 6. Validar technologies: lista de ids que existan (TechnologyModel).
  body("technologies")
    .optional()
    .isArray()
    .withMessage("Las technologies deben enviarse en un array de ids")
    .bail()
    .custom(existingTechnologies),
  // ? Un usuario eliminado lógicamente no puede ser líder: comprobar que la búsqueda lo deje afuera.
];

export const updateProjectValidation = [
  // TODO: 7. Validar code como opcional y único, excluyendo el propio proyecto que se edita.
  body("code")
    .optional()
    .trim()
    .matches(/^PRJ-\d{4}$/)
    .withMessage("El código debe tener el formato PRJ-0000")
    .custom(async (code, { req }) => {
      const found = await ProjectModel.findOne({ where: { code } });
      if (found && found.id !== Number(req.params.id))
        throw new Error("Ya existe otro proyecto con ese código");
      return true;
    }),
  // TODO: 8. Validar name y description como opcionales y no vacíos.
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
  // TODO: 9. Validar status, start_date y budget como opcionales, con las mismas reglas que al crear.
  body("status")
    .optional()
    .isIn(statusList)
    .withMessage("El estado debe ser planning, in_progress, paused o finished"),
  body("start_date")
    .optional()
    .isDate()
    .withMessage("La fecha de inicio debe ser una fecha válida (YYYY-MM-DD)"),
  body("budget")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El presupuesto debe ser un número positivo"),
  // TODO: 10. Validar leader_id como opcional, existente y de un usuario activo.
  body("leader_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El líder debe indicarse con un id numérico")
    .bail()
    .custom(activeLeader),
  // TODO: 11. Validar technologies como opcional, con ids que existan.
  body("technologies")
    .optional()
    .isArray()
    .withMessage("Las technologies deben enviarse en un array de ids")
    .bail()
    .custom(existingTechnologies),
  // ? Para saber qué proyecto se edita, el id se obtiene de los parámetros de la ruta (req.params).
];
