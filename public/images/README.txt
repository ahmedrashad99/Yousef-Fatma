PUT YOUR PHOTOS HERE
====================

The website looks for these files (paths are set in src/data/wedding.js):

  public/images/couple.jpg              -> Opening (hero) photo   - portrait, about 4:5, ~1600px tall
  public/images/story.jpg               -> "Our Story" photo      - portrait, about 4:5
  public/images/gallery/photo-1.jpg     -> Gallery photos         - portrait works best (4:5)
  public/images/gallery/photo-2.jpg
  ...

Until a file exists, the site shows an elegant monogram placeholder
with the exact path where the photo should go.

Tips
- Use .jpg (or .webp) and keep each file under ~500 KB for fast loading on phones.
- File names are case-sensitive once the site is online: "Photo-1.JPG" is not "photo-1.jpg".
- To add/remove gallery photos, edit the "gallery" list in src/data/wedding.js.
