export default async function handler(req, res) {
    // remnove null and undefined values
    req.body = Object.entries(req.body).reduce(
      (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
      {}
    );

    const huggingfaceUrl = `https://huggingface.co/${req.body.modelName}`
  
    if (req.body.mask) {
      req.body.mask = addBackgroundToPNG(req.body.mask);
    }
  
    const response = await fetch(huggingfaceUrl, {
      method: "GET",
    });
  
    if (response.status !== 201) {
      let error = await response.json();
      res.statusCode = 500;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  
    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
  }