export default async function handler(req, res) {
    // remnove null and undefined values
    req.body = Object.entries(req.body).reduce(
      (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
      {}
    );

    const huggingfaceUrl = `https://huggingface.co/${req.body.modelName}`
  
    console.log('Sending huggingface GET request');

    const response = await fetch(huggingfaceUrl);

    console.log('Received huggingface GET response');
  
    if (response.status == 400 || response.status == 500) {
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }

    console.log('Response is reasonable');
  
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  }
