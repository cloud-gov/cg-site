# 18F cloud.gov website

This repository contains the code and content for the [cloud.gov website](https://cloud.gov/).

cloud.gov is a Platform as a Service based on the Cloud Foundry project, which provides its own [Cloud Foundry documentation](http://docs.cloudfoundry.org/).

## Contributing

Hugo uses Markdown to build the pages. Add your page to the section you want inside the content folder.

### Basic install

1. Install [Python](https://www.python.org/) 2, if it's not on your system already. (Required for [node-sass](https://github.com/sass/node-sass)->[node-gyp](https://github.com/nodejs/node-gyp#installation).)
1. Install [Hugo](https://gohugo.io).

### Running the site locally

1. Run `npm install` to download all the dependencies.
1. Run `npm start` and browse to [http://localhost:1313](http://localhost:1313).

### Process tips for cloud.gov team members

We usually use branches to write updates. After you merge a PR, click GitHub's button to delete that branch. (We don't need it anymore.)

### Links

To link to another page within cg-site, use `relref` to create [relative links](https://gohugo.io/extras/crossreferences/). Examples:

* `[Example text]({{< relref "directory/filename.md" >}})`
* `[What is cloud.gov?]({{< relref "overview/overview/what-is-cloudgov.md" >}})`
* `[Sharing secret keys]({{< relref "docs/ops/secrets.md#sharing-secret-keys" >}})`

### Add Diagrams to Documentation pages

To add a diagram to a documentation page, use the `{{< diagrams
id-prefix="title-for-diagram" >}}` shortcode to create them inline for the
documentation pages. Use the [Mermaid language syntax](https://github.com/knsv/mermaid)
to create diagrams in the same way diagrams are made for [cg-diagrams](https://github.com/18F/cg-diagrams). 
Try the [Mermaid live editor](https://mermaidjs.github.io/mermaid-live-editor/)!

> If you find you have a need to create these diagrams on pages outside of the
> documentation pages, please open a PR to discuss what other pages it should
> apply to.

Example:

```
{{< diagrams id-prefix="sample-diagram" >}}
graph LR;
    A[Square Rect] -- Link text --> B((Circle));
    A --> C(Round Rect);
    B --> D{Rhombus};
    C --> D;
{{< /diagrams >}}

```

<details>
<summary>Image preview of the above command :eyes: :camera:</summary>

<img width="726" alt="screen shot 2017-09-28 at 8 51 50 am" src="https://user-images.githubusercontent.com/706004/30970271-541e1b92-a42a-11e7-9586-2673603f7aad.png">
</details>

The `id-prefix` is used to create a custom #id for the Mermaid API to attach to.
Please make sure that this value is syntactically correct for [HTML #ids](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). It is also reused to give a title to your diagram.
It appears above the diagram inside a `<p>` block and uses Hugo's `humanize`
function to convert it from it's dashed value.

> Note: Using characters except ASCII letters, digits, '_', '-' and '.' may
> cause compatibility problems, as they weren't allowed in HTML 4. Though this
> restriction has been lifted in HTML 5, an ID should start with a letter for
> compatibility.
> [source](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)

### Redirects

If you delete or rename a page, make a redirect to avoid breaking links from other sites: [make an alias](https://gohugo.io/extras/aliases/) (use the "YAML frontmatter" style).

### Images and static assets

If you want to include an image in a page on the site, put it in `/static/img/`. Images there will show up at `https://cloud.gov/img/example.png`. When you're editing a page, embed them as `
![alt text](/img/example.png)`

If you want to link to a file, such as a PDF or spreadsheet, put it in `/static/resources/`. Resources there will show up at `https://cloud.gov/resources/example.pdf`. When you're editing a page, link to them as `[link text](/resources/example.pdf)`.

### Search

Our search feature is powered by [DigitalGov Search](http://search.digitalgov.gov/), which has a [Help Manual](http://search.digitalgov.gov/manual/index.html) with documentation about configuring it. [DigitalGov Search for Power Users](http://search.digitalgov.gov/blog/power-users-recap.html) is also useful.

We use [its default Bing indexing](http://search.digitalgov.gov/manual/content-overview.html), so our search may show outdated results if Bing hasn't recently reindexed our docs site.

### Style development

This site uses a shared cloud.gov style, [cg-style](https://github.com/18F/cg-style). This means any styling code has to be developed in *cg-style*.

1. Download or clone the *cg-style* repository, `git clone git@github.com:18F/cg-style.git`
2. Run `npm link` in *cg-style*.
3. Run the watching build task in the *cg-style* repository: `npm run watch`
4. Run `npm link cloudgov-style` in *cg-site*.
5. Run `npm install` in the *cg-site* repository.
6. Run the watching build task in *cg-site* repository: `npm run watch`
7. Edit code in the *cg-style* directory and they will propagate down to *cg-site*

## Acknowledgment

The theme for the site has been "forked" from the [Hugo documentation](https://gohugo.io/overview/introduction/).
