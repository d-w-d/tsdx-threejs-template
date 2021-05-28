# Tsdx Threejs Template

## What is this?

This is a template repo for creating threejs 'widgets' that you publish to npm and then consume in vanilla, react or ngx projects. By 'widget', I mean js code that, when fired, will modify a specified div by injecting a threejs canvas and exposing an API to the underlying threejs scene.

## Quick Start

```
git clone https://github.com/d-w-d/tsdx-threejs-template.git
npm i
./_library_manager --dev
```

## Creating a publishable library

- Clone the repo to a dir for the name of your widget, e.g. 'my-cool-widget'
- Open the script `./_name_replacer`

## Dev Notes

- If you want to run `npm run analyze`, you must first run tsdx build without any fancy options, or it will mess up.
