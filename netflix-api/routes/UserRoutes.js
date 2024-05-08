const { addToLikedMovies, getLikedMovies, removeFormLikedMovies } = require("../controllers/UserController")

const router = require("express").Router()

router.post("/add", addToLikedMovies)
router.get("/liked/:email",getLikedMovies)
router.put("/delete",removeFormLikedMovies)
module.exports = router;