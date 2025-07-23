# codequote.js

A tiny JavaScript library to retrieve code snippets from external sources 🌎.

Quoting a snippet is as simple as adding a `code` element with a `data-src` attribute pointing to the source URL:

```html
<pre>
    <code data-src="https://somewebsite/code.c"></code>
</pre>
```

Optionally, you can provide a `data-lines` attribute specifying the range of lines to quote:

```html
<pre>
    <code data-src="https://somewebsite/code.c" data-lines="714-729"></code>
</pre>
```

## Usage

To use the library, you can either download the `codequote.js` file and include it in your project, or link it from a CDN.

To include the library using [jsDelivr](https://www.jsdelivr.com/) and retrieve the source for all `code` blocks you can use the following code snippet:

```html
<script src="https://cdn.jsdelivr.net/gh/lorenzocelli/codequote.js@1.0.0/codequote.js"></script>
<script>codequote.all();</script>
```

It is also possible to provide a callback function that will be executed once all code snippets have been fetched. This is especially useful when using codequote.js in combination with libraries for syntax highlighting such as [highlight.js](https://highlightjs.org/):

```html
<script>
codequote.all(() => {
    hljs.highlightAll();
})
</script>
```
