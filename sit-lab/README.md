# SIT Lab — scrolling editorial redesign

This package updates the existing `sit-lab/` website in `Octopolugal/Octopolugal.github.io`.

The new design includes a long homepage, an aerial landscape opening, alternating light and dark sections, staggered project stories, student photo grids, publications with expandable abstracts, and presentations. It keeps five pages and the same editable content file.

## Preview

Open `index.html` from the extracted folder in a browser. No installation, account, build step, or server is required. The separate `SIT-Lab-preview.html` download is a self-contained preview of all five pages.

## Update your GitHub Pages site

1. Extract `SIT-Lab-Full-Website.zip`. The enclosed folder must remain named `sit-lab`.
2. Open your repository at https://github.com/Octopolugal/Octopolugal.github.io on the `main` branch.
3. Choose **Add file → Upload files** at the repository root.
4. Drag in the whole `sit-lab` folder. Check that paths begin with `sit-lab/`, such as `sit-lab/index.html`. The new files replace files with the same paths.
5. Enter a message such as `Add publications and full-color student photos` and choose **Commit changes**.
6. Wait for the Pages deployment in the **Actions** tab, then visit https://octopolugal.github.io/sit-lab/.

This package does not alter the existing root homepage, Jekyll configuration, or Pages settings. Do not upload the ZIP itself or move its HTML files to the repository root. This update includes the current student profiles from the main branch at commit `3a26b2c` and the 26 supplied publication records. If you make further edits after October 2, 2026, merge those edits into this package before uploading.

## Change lab content

Edit `sit-lab/assets/content.js` on GitHub using the pencil icon, then commit your changes. The homepage and the relevant archive page update from the same records.

The publication section contains **26 records** from the supplied Google Scholar BibTeX export. Existing student profiles, photos, presentations, and projects are preserved. Remaining records with `sample: true` still display an example label; replace their details and change `sample` to `false` when ready.

- **Lab:** Edit `name`, `fullName`, `tagline`, and `description`. Optional institution, location, email, Scholar, and GitHub links appear only when filled in.
- **Students:** Photos now appear in full color, including before hover. Edit names, roles, and interests; upload photos into `assets/students/`, then set `photo: "assets/students/full-name.jpg"`. Portraits around 800 × 1000 pixels work well. Use `photoPosition: "top"` or `"center"` to adjust the crop. Missing or broken photos show a clear placeholder.
- **Publications:** Edit title, authors, venue, and year. Use `year: "2026"`; entries sort newest first. Add `paperUrl`, `codeUrl`, or `dataUrl` for resource links. PDF paths can be relative, such as `assets/papers/paper.pdf`.
- **Presentations:** Edit title, speaker, event, and summary. Use dates such as `date: "2026-09-30"`. Add `slidesUrl`, `videoUrl`, and `eventUrl` when available. Entries sort newest first.
- **Projects:** Edit title, category, status, summary, question, and approach. Optional team, funding, project website, and code links appear when provided. You may add `image: "assets/images/project-photo.jpg"` and `imageAlt: "A description of the image"` to any project.

To add entries, duplicate an object in the relevant list. Keep commas between objects and quotes around text. Use `[]` for an empty list. Optional links are hidden until a real URL is supplied.

## Change design or page headings

- `index.html`: homepage headline, introductory framing, and section headings.
- `students.html`, `publications.html`, `presentations.html`, `projects.html`: individual page headings and introductions.
- `assets/styles.css`: colors, typography, layout, spacing, responsive rules, and transitions. The main colors are defined at the top.
- `assets/site.js`: content rendering, menu, scroll progress, and motion.

The original supplied PDF logo is included unchanged. Its extracted JPEG appears in the footer. The landscape is a locally stored AI-generated conceptual illustration, not a satellite image of a claimed location or research output. Replace it with your own research imagery whenever available.

## Motion and accessibility

The site uses one-time section reveals, subtle desktop parallax, hover image movement, and a reading-progress line. It does not take over scrolling. The short scroll indicator animation stops after two cycles. A **Reduce motion** control in the footer disables movement and remembers the choice on that browser; the operating system's reduced-motion preference is also respected. The phone layout omits parallax.

Navigation supports keyboard use and includes a skip link. The mobile menu closes on selection or Escape. The editable lists need JavaScript; page headings, navigation, and framing remain available without it.

All scripts, styles, and images are local. There are no external font requests, analytics, trackers, or build dependencies.

## Package contents

| File | Purpose |
| --- | --- |
| `index.html` | Long scrolling homepage |
| `students.html` | Student photo gallery |
| `publications.html` | Published work and abstracts |
| `presentations.html` | Talks, posters, slides, and recordings |
| `projects.html` | Project details |
| `assets/content.js` | Routine content updates |
| `assets/styles.css` | Visual design |
| `assets/site.js` | Rendering and interactions |
| `assets/images/` | Original logo, PDF, and landscape illustration |

The redesign has been packaged for GitHub Pages. Uploading and committing the files publishes the changes; generating or opening the preview does not change the live site.


## Publication import — October 2, 2026

All 26 supplied entries are included. The homepage displays the three newest
entries; the Published work page groups the complete list by year. The supplied
export is preserved at `assets/papers/scholar-export.bib`; the website reads the
formatted records in `assets/content.js`. Editing the BibTeX alone will not change
the page.

- Direct publisher, proceedings, repository, and arXiv links were added for 25 records.
- LocDiff uses the published NeurIPS 2025 record and its final author order:
  https://proceedings.neurips.cc/paper_files/paper/2025/hash/011864a6ed5c1e1c8f580f2578985109-Abstract-Conference.html
- The KnowWhereGraph Ontology: A Showcase is identified as a JOWO 2023 workshop
  paper, distinct from the 2025 journal article:
  https://ceur-ws.org/Vol-3637/paper46.pdf
- The TorchSpatial benchmark uses the published NeurIPS 2024 author list:
  https://proceedings.neurips.cc/paper_files/paper/2024/hash/9449c2d5b0cc8c9a445752f3ff195a1c-Abstract-Datasets_and_Benchmarks_Track.html
- The Place2Vec spelling and AI/model-name capitalization were normalized.
- Diverse data! Diverse schemata? retains the export's 2021 online-publication year,
  with its 2022 issue noted in the venue:
  https://doi.org/10.3233/SW-210453
- The AGU entry is labeled Conference abstract. No paper link is invented.
- SSIF is under Undated / Manuscript because its export omits the year and venue.
  Its OpenReview manuscript is linked without claiming conference acceptance.
  Supply the intended citation year and publication venue to complete this record.
- Entries ending in “et al.” retain the export's truncated author lists unless a
  complete list was checked against the proceedings. No abstracts were invented.

Your original logo PDF and both current student photo files are included unchanged.
