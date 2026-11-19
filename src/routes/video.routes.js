import { Router } from "express";
import { 
    publishAVideo , 
    getAllVideos , 
    getAllUserVideos , 
    deleteVideoById , 
    VideoDataById , 
    viewsIncrement 
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();


const videoUpload = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videoFile', maxCount: 1 },
    // { name: 'avatar', maxCount: 1 } // Add this if you are uploading avatar
  ]);



router.route("/publish").post(verifyJWT, videoUpload, publishAVideo)
router.route("/allVideo").get(getAllVideos)
router.route("/allUserVideo/:owner").get(getAllUserVideos)
router.route("/delete/:id").delete(verifyJWT, deleteVideoById)
router.route("/videoData/:id").get(VideoDataById)
router.route("/incrementView/:id").put(viewsIncrement)

export default router;