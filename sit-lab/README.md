# SIT Lab website

A responsive, five-page website for **SIT Lab — Spatial-Info(rmation)-(in)Telligence**.

## Preview on your computer

Unzip the package, then double-click `index.html`. The complete website works locally, including navigation, the mobile menu, and expandable publication abstracts. No installation, account, build process, or web server is required.

The site includes Home, Students, Published work, Presentations, and Projects. Its navy and slate palette follows your supplied logo. The JPEG is extracted directly from the original PDF; the PDF is included unchanged.

## Replace the sample content

**All student profiles, publication entries, presentation entries, and projects are explicitly labeled examples.** The homepage research descriptions are proposed introductory copy, not verified statements about the lab. No real students, publications, affiliations, funding claims, or contact details have been invented.

Open `assets/content.js` in a text editor. This is the only file needed for routine content updates.

1. Fill in the optional lab institution, location, email, Google Scholar URL, and GitHub URL.
2. Replace the student, publication, presentation, and project records with your real content.
3. Set `sample: false` on each completed record. Each page's preview notice disappears automatically when all its entries are real.
4. Save the file and refresh the page. Use a hard refresh if your browser is caching older content.

You can duplicate records to add more entries or delete them to remove entries. Keep commas between objects and put text in double quotes. Escape any double quotes inside text as `\"`, or use apostrophes instead. Empty lists, such as `students: []`, display a clean empty state.

### Student photos

Copy photos into `assets/students/`, then set the student's `photo` to a relative path:

```javascript
{
  name: "Full student name",
  role: "Ph.D. student",
  interests: "Spatial reasoning · Geospatial AI",
  photo: "assets/students/student-name.jpg",
  photoPosition: "center",
  website: "",
  email: "",
  sample: false
}
```

Portrait photos around 800 × 1000 pixels work well. Use `photoPosition: "top"` if the crop needs to favor the face. The layout also supports `center`, `bottom`, `left`, and `right`. If a photo is absent or fails to load, the card shows a labeled photo placeholder.

### Papers and presentations

- Add a paper's PDF to `assets/papers/` and set `paperUrl: "assets/papers/paper-name.pdf"`, or paste a full DOI/publisher/preprint URL.
- Optional `codeUrl` and `dataUrl` fields add resource links.
- Put slide PDFs in `assets/slides/` and set `slidesUrl` accordingly.
- Use a full recording URL for `videoUrl` and an event URL for `eventUrl`.
- Presentation dates use `YYYY-MM-DD`, for example `2026-09-29`.
- Publication years use `"2026"`. Papers group by year, newest first; presentations sort by date, newest first.
- Empty URL fields hide their links. There are no pretend downloads or inactive resource buttons.

### Projects

Each project supports a title, topic, status, summary, research question, approach, optional team, funding acknowledgement, project website, and code link. Keep the example label until the details have been replaced.

### Design and page text

- Change colors and layout in `assets/styles.css`.
- Edit each page's heading, introductory copy, title, and search description in its corresponding HTML file.
- The home headline is in `index.html`.
- The optional footer contact details appear after you fill them in under `lab` in `assets/content.js`.
- All fonts and images are local or system-provided; the site makes no third-party font, analytics, or tracking requests.

## Publish in your existing GitHub repository

The target repository is `Octopolugal/Octopolugal.github.io`. GitHub Pages is already serving the existing site. This package adds a separate `sit-lab/` folder; it does not replace the existing homepage or Jekyll configuration.

**SIT Lab has not been uploaded or published yet.** The connected integration could read the repository but GitHub rejected its upload with `Resource not accessible by integration` (403).

### Upload from your own browser

1. Extract `SIT-Lab-GitHub-Pages.zip`. It contains a folder named `sit-lab`.
2. Open https://github.com/Octopolugal/Octopolugal.github.io and select the `main` branch.
3. Choose **Add file → Upload files**.
4. Drag the entire `sit-lab` folder into the upload area. Keep the enclosing folder: the uploaded paths should start with `sit-lab/`, for example `sit-lab/index.html`. Do not upload the ZIP or place the HTML files at the repository root.
5. Enter the commit message `Add SIT Lab website`, select **Commit directly to the main branch**, and click **Commit changes**.
6. GitHub Pages should publish the addition using the repository's existing settings. When deployment finishes, the intended URL is https://octopolugal.github.io/sit-lab/.

Do not change the existing root `_config.yml`, homepage, or Pages settings. There is no root `.nojekyll` file in this package. If publishing does not run or fails, share the status from the repository's Actions tab so the cause can be checked.

### Let the connected GitHub app upload the files

The integration needs repository access before it can write. In GitHub, review the installed app associated with the connection and its repository selection. If it is installed, use **Configure** and grant access to `Octopolugal.github.io`. If no matching installation is present, complete repository authorization through the GitHub connection's setup. Repository selection alone does not add write permissions if the app does not request them.

GitHub's official guides:

- [Adding a file to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Reviewing and modifying installed GitHub Apps](https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps)

## Files

| File or folder | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `students.html` | Student photo gallery |
| `publications.html` | Published work and expandable abstracts |
| `presentations.html` | Talks, posters, slides, and recordings |
| `projects.html` | Ongoing research projects |
| `assets/content.js` | Editable lab content |
| `assets/site.js` | Content rendering and mobile menu |
| `assets/styles.css` | Responsive design |
| `assets/images/` | Your original PDF logo and its extracted JPEG |
| `assets/students/` | Student photos |
| `assets/papers/` | Paper PDFs |
| `assets/slides/` | Slide PDFs |

The website uses JavaScript to render its editable content. Navigation, page headings, and homepage framing remain available without JavaScript; the lists include a notice to enable it.
