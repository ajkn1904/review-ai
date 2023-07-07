const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(configuration);

/**
    * @api (POST) / get the review via product URL
    * @apiDescription - this is the
    * @apiPermission -All user.
    * @apiHeader -{String} authorised user only.
    * @apiParam - NO params.
    *
    * @apiSuccess {Object[]} all the review.
    *
    * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the route.
    * @apiError (Forbidden 403)     Forbidden     Only authenticted users can access the route. 
    */
app.post("/review-generate", async (req, res) => {
    try {
         const { url } = req.body;

        const prompt = [
            `Generate a review of '${url}' this product and return it in a JSON format. The JSON will contain only the "ProductName", "ProductURL", "ProductPrice": website price, "ProductRating": website rating and it must be in number format, "ReviewBody", "SimilarItems": recommend 3 similar products, and your "Recommendation": do you recommend it or highly recommended or not recommended? If there is no review or the rating is less than 3 then don't recommend.`, "The review should include a clear recommendation, either recommending or not recommending the product."
          ];
          

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 500,
        });

        const review = response.data.choices[0].text;

        const parsedReview = JSON.parse(review);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(parsedReview));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred. Try again!" });
    }
    finally {

    }
});




app.get('/', async (req, res) => res.send('Server is running'));

app.listen(port, () => console.log(`Server running on port ${port}`));
