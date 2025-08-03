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

## Options

To further customize the behavior of the library, you can pass an object to the `all` method. The object can contain a number of callback functions that will be invoked at different stages of the code fetching process. The available options are:

- `onReady: () => {...}`
A callback function that will be executed once all quotes have been fetched.
*Default*: do nothing.

- `onFetchStart: (element) => {...}`
A callback function that will be executed when a quote fetch starts.
*Default*: display `Loading code...` text.

- `onError: (element, error) => {...}`
A callback function that will be executed if an error occurs while fetching a quote.
*Default*: log the error to the console and display `Failed to fetch code` text.

- `onFetch: (element, code) => {...}`
A callback function that will be executed when a quote is successfully fetched.
*Default*: replace the code element's text content with the fetched code.

Here is an example:

```html
<script>
    codequote.all({
        onReady: () => console.log("Done!"),
        onFetchStart: (element) => (element.textContent = "⏳"),
        onError: (element, error) => (element.textContent = `💥 ${error.message}`),
        onFetch: (element, code) => (element.textContent = code)
    });
</script>
```
