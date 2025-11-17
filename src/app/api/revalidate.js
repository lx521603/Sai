    // This API route handles manual revalidation for Incremental Static Regeneration (ISR).
    // It allows updating a specific page path (like a blog post) without rebuilding the entire site.

    // IMPORTANT: Never expose the secret token in public code or frontend.
    const SECRET_TOKEN = process.env.REVALIDATE_SECRET_TOKEN;

    /**
     * @param {import('next').NextApiRequest} req
     * @param {import('next').NextApiResponse} res
     */
    export default async function handler(req, res) {
      // 1. Validate the secret token to prevent unauthorized access
      if (req.query.secret !== SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // 2. Validate the path parameter
      const path = req.query.path;

      if (!path) {
        return res.status(400).json({ message: 'Missing path parameter' });
      }

      try {
        // 3. Trigger the revalidation for the specified path
        await res.revalidate(path);

        console.log(`Revalidated path: ${path}`);
        return res.json({ revalidated: true, path });

      } catch (err) {
        console.error('Error during revalidation:', err);
        return res.status(500).send({ revalidated: false, message: `Error revalidating path: ${path}`, error: err.message });
      }
    }
    

