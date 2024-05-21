import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    if (
      !fs.existsSync(
        `${__dirname}/../uploads/products`
      )
    ) {
      fs.mkdirSync(
        `${__dirname}/../uploads/products`,
        {
          recursive: true,
        }
      );
    }
    cb(
      null,
      `${__dirname}/../uploads/products`
    );

  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];

    cb(null, 0 + "-" + uniqueSuffix + `.${ext}`);
  },
});
const allowedFiles = (req, file, cb) => {
  if (
    !file.originalname.match(
      /\.(jpg|JPG|jpeg|JPEG|png|PNG)$/
    )
  ) {
    req.fileValidationError =
      "Only jpg|JPG|jpeg|JPEG|png|PNG file type are allowed!";
    return cb(
      new multer.MulterError(
        "Only jpg|JPG|jpeg|JPEG|png|PNG file type  are allowed!"
      ),
      false
    );
  } else cb(null, true);
};
const ProductImagesUploader = multer({
  storage: productImagesStorage,
  fileFilter: allowedFiles,
  limits: { fileSize: 1024 * 1024 * 3 },
})

const uploadProductImages = () => {
  return (req, res, next) => {
    const file = ProductImagesUploader.array("images" , 6);

    file(req, res, function (err) {


      if (err instanceof multer.MulterError) {
        res.status(400).send({
          message:
            "Error while uploading media :( Make sure you are uploading a PNG, JPG or JPEG file with less than 3 MBs of space",
        });
      } else if (err) {
        res.status(503).send({
          message:
            "Server Error while uploading media :(",
        });
      } else next();
    });
  };
};

export default uploadProductImages;
