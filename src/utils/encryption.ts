import shajs from "sha.js";

export const toSha256 = (v: string) => {
  return shajs("sha256").update(v).digest("hex");
};
