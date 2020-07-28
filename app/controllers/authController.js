// import _ from 'lodash'
// import moment from 'moment'
import { Responder } from '../lib';
import logger from '../lib/logger';
import {HttpStatus} from '../config/enums'
import jwt from 'jsonwebtoken' 
import { jwtSecret } from '../config/secrets'
import jsonpatch from 'jsonpatch'
const resize = require('./concerns/resize')

//var jwt = require('jsonwebtoken');
// import http from 'http'


const generateToken = async (req, res) => { // Public Endpoint. Generates the token
  try {
    let {userName, password} = req.body 
    if (!userName || !password) throw new Error('Username / password not provided')
    const token = jwt.sign({ id: userName}, jwtSecret, {
            expiresIn: process.env.tokenExpiration, // expires in 60 Days
        })
    console.log("token generated", token)
    return Responder.success(res, {token})
  } catch (error) {
    return Responder.operationFailed(res, { status: HttpStatus.BAD_REQUEST, error });
  }
}

const jsonPatch = async (req, res) => { // Generates the JSON patch.
    try {
    const { mydoc } = req.body
    const thepatch = req.body.thepatch.key
    const patcheddoc = jsonpatch.apply_patch(mydoc, thepatch);
    return Responder.success(res, patcheddoc)
  } catch (error) {
    console.error(error)
    return Responder.operationFailed(res, { status: HttpStatus.BAD_REQUEST, error });
  }
}

const resizeImg = async (req, res) => {
    try {
    const widthString = req.body.width
    const heightString = req.body.height
    const format = req.body.format
    let width, height
    if (widthString) {
        width = parseInt(widthString)
    }
    if (heightString) {
        height = parseInt(heightString)
    }
    // Set the content-type of the response
    res.type(`image/${format || 'png'}`)
    resize('nodejs.png', format, width, height).pipe(res)
    
    //return Responder.success(res, patcheddoc)
  } catch (error) {
    console.error(error)
    return Responder.operationFailed(res, { status: HttpStatus.BAD_REQUEST, error });
  }

}

module.exports = {
  generateToken,
  jsonPatch,
  resizeImg,
};
