const express = require("express")
const cors = require("cors")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const app = express()

app.get("/", (req, res) => {
	res.send("hello express")
})
app.get("/upload", cors(), upload.single("file"), (req, res) => {
	let filename = req.file.filename
	let object = { id: filename }
	res.send(JSON.stringify(object))
})
app.post("/preview/:key", cors(), (req, res) => {
	res.sendFile(
		`uploads/${req.params.key}`,
		{
			root: __dirname,
			headers: {
				"Content-Type": "image/jpeg",
			},
		},
		(error) => {
			console.log(error)
		},
	)
})
var port = process.env.PORT || 3000
console.log(port)
app.listen(port)
