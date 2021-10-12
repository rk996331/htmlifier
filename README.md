# htmlifier

The HTMLifier "converts" Scratch 3.0 projects to an HTML file by putting all the
project data and the entire Scratch engine into one enormous file.

It does this by making Scratch VM fetch a project, and in doing so, it tracks
the assets it fetches from the project.json. It converts the fetched assets and
project.json into a base64 data URI. It also fetches the code for the Scratch
VM. It inserts all this in a template HTML file, which has been set up to load
the project from the base64 data URIs and do other things that the Scratch VM
doesn't take of, which is normally handled by
[scratch-gui](https://github.com/LLK/scratch-gui/), such as variable/list
monitors and ask and wait prompts.

The HTMLifier is also available as an [npm
package](https://www.npmjs.com/package/@sheeptester/htmlifier).

## Credits

CSS by [Mr. Cringe Kid](https://scratch.mit.edu/users/mrcringekidyt/).

The Scratch engine is from [scratch-vm](https://github.com/LLK/scratch-vm/).

[JSZip](https://stuk.github.io/jszip/) for downloading as a zip.

