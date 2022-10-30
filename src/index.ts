import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.get("/artists", async (req, res) => {
  const artists = await prisma.artist.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(artists);
});

app.post("/artists", async (req, res) => {
  const artist = await prisma.artist.create({
    data: {
      name: 'artist1'
    },
  });

  return res.json(artist);
});

app.get("/artists/:id", async (req, res) => {
  const id = req.params.id;
  const artist = await prisma.artist.findUnique({
    where: { id },
  });

  return res.json(artist);
});

app.put("/artists/:id", async (req, res) => {
  const id = req.params.id;
  const artist = await prisma.artist.update({
    where: { id },
    data: req.body,
  });

  return res.json(artist);
});

app.delete("/artists/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.artist.delete({
    where: { id },
  });

  return res.send({ status: "ok" });
});

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
