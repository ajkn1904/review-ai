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


app.get("/review-generate", async (req, res) => {
    try {
        // const { url } = req.body;

        //wrong
        //const prompt = "Generate a JSON structure for a review of 'https://www.amazon.com/Razer-Ornata-Chroma-Mecha-Membrane-Individually/dp/B01LVTI3TO/ref=pd_bxgy_vft_none_sccl_2/144-2702299-6553355?pd_rd_w=PKnfq&content-id=amzn1.sym.26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_p=26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_r=YSHG77ZXEEBY93KQP2GW&pd_rd_wg=ZLQLW&pd_rd_r=50474f97-eeb3-49e7-8f7c-aa4c22f04614&pd_rd_i=B01LVTI3TO&psc=1' this product . The review should have a title, rating, and multiple sections covering aspects like design and features, size and comfort, overall performance, and a recommendation do you recommend it or not. The review should include a clear recommendation, either recommending or not recommending the product. The product information should include the name and URL";

        /* Correct */
        /* const prompt = [
            "Generate a JSON structure for a review of 'https://www.amazon.com/Razer-Ornata-Chroma-Mecha-Membrane-Individually/dp/B01LVTI3TO/ref=pd_bxgy_vft_none_sccl_2/144-2702299-6553355?pd_rd_w=PKnfq&content-id=amzn1.sym.26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_p=26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_r=YSHG77ZXEEBY93KQP2GW&pd_rd_wg=ZLQLW&pd_rd_r=50474f97-eeb3-49e7-8f7c-aa4c22f04614&pd_rd_i=B01LVTI3TO&psc=1' this product.",
            "The review should have a title, rating, and multiple sections covering aspects like design and features, size and comfort, overall performance, and a recommendation verdict: do you recommend it or not?",
            "The review should include a clear recommendation, either recommending or not recommending the product.",
            "The product information should include the name and URL."
          ]; */

        //testing
        const prompt = [
            "Generate a JSON structure for a review of 'https://www.amazon.com/Razer-Ornata-Chroma-Mecha-Membrane-Individually/dp/B01LVTI3TO/ref=pd_bxgy_vft_none_sccl_2/144-2702299-6553355?pd_rd_w=PKnfq&content-id=amzn1.sym.26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_p=26a5c67f-1a30-486b-bb90-b523ad38d5a0&pf_rd_r=YSHG77ZXEEBY93KQP2GW&pd_rd_wg=ZLQLW&pd_rd_r=50474f97-eeb3-49e7-8f7c-aa4c22f04614&pd_rd_i=B01LVTI3TO&psc=1' this product.",
            "The review should have a title, rating, and multiple sections covering aspects like design and features, size and comfort, overall performance, and a recommendation: do you recommend it or not?",
            "The review should include a clear recommendation, either recommending or not recommending the product.",
            "The product information should include the name and URL.",
            'Return the review with the following structure:{"name": "here should be the product name", "productUrl": "here should be the product URL","rating": here should be the rating, "reviewText": "here should be the review", "summary": "here should be the review summary", "recommendation": "here should be the recommendation"}'
          ];
          

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 500,
        });

        const review = response.data.choices[0].text;
        const jsonStartIndex = review.indexOf('{');
        const jsonEndIndex = review.lastIndexOf('}') + 1;
        const reviewJson = review.substring(jsonStartIndex, jsonEndIndex);
        const generatedReview = JSON.parse(reviewJson);

        res.json(generatedReview);
        //wrong
        //res.send(review);

        /* res.json({
            status: "success",
           message: "response is generated",
           response: JSON.parse(review),
        }); */

        /* const parsedReview = JSON.parse(review);
        res.json(parsedReview); */

        //correct
        /* const parsedReview = JSON.parse(review);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(parsedReview)); */
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
    finally {

    }
});




app.get('/', async (req, res) => res.send('Server is running'));

app.listen(port, () => console.log(`Server running on port ${port}`));