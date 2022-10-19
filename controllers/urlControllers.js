import fs from 'fs';
import Url from '../models/url.js';
// import Response from '../response.js';
import { countTime, Response } from '../helpers/generalHelpers.js';

export const getUrl = async (req, res) => {
    var start = new Date();
    var response;
    var short = req.params.short
    try {
        const url = await Url.findOne({ shortUrl: short }).lean();
        
        if (url) {
            response = new Response(200, "OK", countTime(start, new Date()), url.length, url)
        } else {
            response = new Response(404, "NOT FOUND", countTime(start, new Date()))
        }
        
        res.writeHead(response.code, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))

    } catch (err) {
        response = new Response(500, err.message)

        res.writeHead(response.code, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))
    }
}


export const Insert = async (req, res) => {
    var start = new Date();
    var response;
    var values = req.body;

    try {
        var exist = await Url.exists({ shortUrl: values.shortUrl });

        if (exist) {
            throw new Error('Your Short URL already used :(')
        }

        const newUrl = new Url(values)
        await newUrl.save();

        response = new Response(200, "OK", countTime(start, new Date()), undefined, values)

        res.writeHead(response.code, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))

    } catch (err) {
        if (err.message == 'Your Short URL already used :(') {
            response = new Response(406, err.message)
        } else {
            response = new Response(500, err.message)
        }

        res.writeHead(response.code, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))
    }
}

export const Home = async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./views/index.html', null, function(err, data) {
        if (data) {
            res.write(data);
        } else {
            res.writeHead(404)
            res.write(err.message);
        }
        res.end();
    })
}

export const Result = async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./views/result.html', null, function(err, data) {
        if (data) {
            res.write(data);
        } else {
            res.writeHead(404)
            res.write(err.message);
        }
        res.end();
    })
}

export const Redirect = async (req, res) => {
    var url = req.params.url
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./views/redirect.html', null, function(err, data) {
        if (data) {
            res.write(data);
        } else {
            res.writeHead(404)
            res.write(err.message);
        }
        res.end();
    })
}

export const NotFound = async (req, res) => {
    var url = req.params.url
    res.writeHead(404, { 'Content-Type': 'text/html' });
    fs.readFile('./views/notFound.html', null, function(err, data) {
        if (data) {
            res.write(data);
        } else {
            res.writeHead(404)
            res.write(err.message);
        }
        res.end();
    })
}