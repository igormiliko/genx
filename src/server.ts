import App from "./App";
import express from "express"

const app = new App(express())

app.init()

exports.start = app