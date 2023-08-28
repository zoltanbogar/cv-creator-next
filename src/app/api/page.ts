import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

const saveFile = async (file) => {
  return "asdsa";
  /*const data = fs.readFileSync(file.path);
  console.log({data})
  fs.writeFileSync(`./public/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;*/
  console.log({file});
  const formData = new FormData();
  formData.append("file", file);
  /*return this.instance
    .post(`/users/${userId}/upload`, formData, {
      headers: getAuthorizationHeader(),
    })
    .then((res) => {
      return {
        newAvatar: res.data.data.url,
      };
    });*/
};

export default (req, res) => {
  console.log(req)
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
      ? console.log("PUT")
      : req.method === "DELETE"
        ? console.log("DELETE")
        : req.method === "GET"
          ? console.log("GET")
          : res?.status(404).send("");
};
