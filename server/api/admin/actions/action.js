const AdminBro = require("admin-bro");
var bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response) => {
  if (response.record && response.record.errors) {
    response.record.errors.plainPassword = response.record.errors.password;
  }
  return response;
};
/** @type {AdminBro.Before} */
const before = async (request) => {
  if (request.method === "post") {
    const { plainPassword, ...otherParams } = request.payload;
    if (plainPassword) {
      const password = await bcrypt.hash(plainPassword, 10);
      const avatar = gravatar.url(request.payload.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm", //Default
      });
      return {
        ...request,
        payload: {
          ...otherParams,
          password,
          avatar,
        },
      };
    }
  }
  return request;
};
module.exports = { after, before };
