import { z } from "zod";

export const addWorkspaceMemberSchema = z.object({
  email: z.email(),
});