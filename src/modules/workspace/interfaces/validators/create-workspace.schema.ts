import { z } from "zod";


export const createWorkspaceSchema =
z.object({

  name:
    z.string()
     .min(3)
     .max(100),


  description:
    z.string()
     .max(500)
     .nullable()
     .optional(),

});