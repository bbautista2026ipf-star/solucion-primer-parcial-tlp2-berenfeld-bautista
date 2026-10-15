// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ProjectTechnologyModel = sequelize.define(
  "ProjectTechnology",
  {
    // TODO: 1. id: entero, clave primaria y autoincremental.
    // La consigna pide clave primaria compuesta (project_id + technology_id), por eso no se define un id propio.
    // TODO: 2. project_id: entero, obligatorio, clave foránea hacia Project.
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Projects",
        key: "id",
      },
    },
    // TODO: 3. technology_id: entero, obligatorio, clave foránea hacia Technology.
    technology_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Technologies",
        key: "id",
      },
    },
  },
  {
    // TODO: 4. Desactivar las columnas createdAt y updatedAt.
    timestamps: false,
  },
);
