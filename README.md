Slatebox Dist
===============

This repository enabled the publication of the slatebox.min.js file to S3, for use in embedding.

1. `ln -s PATH_TO_YOUR_SLATEBOX_REPOSITORY/packages/slatebox/lib lib`

PATH_TO_YOUR_SLATEBOX_REPOSITORY might be: `/Users/tim/Projects/OS/SB/slatebox.com` for instance

2. `npm install`

3. `grunt`

4. This will produce a `dist/gzipped/slatebox.min.js` file that should be manually copied to the s3 1.0.0 slatebox directory.