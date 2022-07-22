const Sequelize = require("sequelize");
const imagenes = require("../models").imagenes;
const Formidable = require("formidable");
const bluebird = require("bluebird");
var fs = require("fs");
var fs = bluebird.promisifyAll(require("fs"));
var { join } = require("path");

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "matumolise", //reemplazar con sus credenciales
  api_key: "459727726443978",
  api_secret: "ajD55usk6179CJuw1cldjtcYxmc",
});

// Async Controller function to get the To do List

module.exports = {
  async createUserImg(req, res) {
    //subir imagen a cloudinary
    let newUserImg;
    let imagen = "imagenes/" + req.body.nombreImagen;
    await cloudinary.uploader.upload(imagen, function (result) {
      newUserImg = {
        mail: req.body.email,
        date: new Date(),
        nombreImagen: result.url,
      };
      // Creating a new Mongoose Object by using the new keyword

      if (newUserImg.nombreImagen !== null) {
        let resp = savedUserImg(newUserImg, req.body.receta_id);
      }
    });
  },

  async uploadImage(req, res) {
    let form = new Formidable.IncomingForm();
    const uploadsFolder = "imagenes/";
    form.multiples = true;
    form.uploadDir = uploadsFolder;
    form.maxFileSize = 50 * 1024 * 1024; // 50 MB
    const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder);
    if (!folderCreationResult) {
      return res.json({
        ok: false,
        msg: "The uploads folder couldn't be created",
      });
    }
    form.parse(req, async (err, fields, files) => {
      console.log(files)
      let myUploadedFiles = [];
      if (err) {
        console.log("Error parsing the incoming form", err);
        return res.json({ ok: false, msg: "Error passing the incoming form" });
      }
      // If we are sending only one file:
      if (!files.files.length) {
        const file = files.files;

        console.log("erdkljnerkljferg",file);
        if (!checkAcceptedExtensions(file)) {
          console.log("The received file is not a valid type");
          return res.json({
            ok: false,
            msg: "The sent file is not a valid type",
          });
        }
        const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
        myUploadedFiles.push(fileName);
        try {
          console.log("holaaaaaaaaa",file.path)
          console.log(join(uploadsFolder, fileName))
          await fs.renameAsync(file.path, join(uploadsFolder, fileName));
        } catch (e) {
          console.log("Error uploading the file");
          try {
            await fs.unlinkAsync(file.path);
          } catch (e) {}
          return res.json({ ok: false, msg: "Error uploading the file" });
        }
      } else {
        for (let i = 0; i < files.files.length; i++) {
          const file = files.files[i];
          if (!checkAcceptedExtensions(file)) {
            console.log("The received file is not a valid type");
            return res.json({
              ok: false,
              msg: "The sent file is not a valid type",
            });
          }
          const fileName = encodeURIComponent(
            file.name.replace(/&. *;+/g, "-")
          );
          myUploadedFiles.push(fileName);
          try {
            await fs.renameAsync(file.path, join(uploadsFolder, fileName));
          } catch (e) {
            console.log("Error uploading the file");
            try {
              await fs.unlinkAsync(file.path);
            } catch (e) {}
            return res.json({ ok: false, msg: "Error uploading the file" });
          }
        }
      }
      res.json({
        ok: true,
        msg: "Files uploaded succesfully!",
        files: myUploadedFiles,
      });
    });
  },
};

async function savedUserImg(newUserImg, receta_id) {
  console.log("newUserImg", newUserImg);
  console.log("receta_id", receta_id);
  try {
    console.log("los datossssssssss", newUserImg, receta_id);
    //Saving the Control
    // return imagenes
    //     .create({
    //         receta_id: receta_id,
    //         link: newUserImg.nombreImagen
    //     })
    //     .catch((error) => res.status(404).send(error));
  } catch (e) {
    console.log(e);
    throw Error("Error while Creating Imagen User");
  }
}

async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.statAsync(uploadsFolder);
  } catch (e) {
    if (e && e.code == "ENOENT") {
      try {
        await fs.mkdirAsync(uploadsFolder);
      } catch (err) {
        console.log("Error creating the uploads folder 1");
        return false;
      }
    } else {
      console.log("Error creating the uploads folder 2");
      return false;
    }
  }
  return true;
}

function checkAcceptedExtensions(file) {
  console.log("####### checkAcceptedExtensions", true);

  return true;
}
