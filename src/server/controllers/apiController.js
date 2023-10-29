import { query } from "express";
import { db } from "../models/sqlModel";

const apiController = {};

apiController.fetchData = async(_req, res, next) => {
    try {
        const data = await fetch('');
        const parsedData = data.map();
        res.locals.data = parsedData;
        return next();
    } catch (error) {
        return next({
            log: 'Error caught in apiController fetchData',
            error,
            status: 500,
            message: {
              err: 'An error occured when fetching data from the external API',
            },
          });
    }
}

export default apiController;
