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
- Open the script `_name_replacer` and enter the name of your library into the variables `NEW_NAME` and `NEW_CAMEL_NAME`. For example, `my-cool-widget` and `MyCoolWidget`. Then run `./_name_replacer`, which will perform find-and-replace operations throughout the repo.
- Develop your widget by editing code in `/src/` with `/src/index.tsx` as the entry point and running the development server with `./_library_manager --dev`.
- Periodically check that your library builds correclty and can be run by vanilla, react and ngx apps by running `./_library_manager --build` and then running `./_demo_manager` to test these different frameworks.
- When you are ready to publish, sign into npm with `npm login` and then run `npm publish`

## Threejs Development

This repo is set up with the efficient development and consumption of threejs widgets specifically in mind.

All of the threejs logic is sectioned into `src/threejs`. This repo uses a class-based approach to organizing the threejs scene. In `/src/threejs/abstract-scene` are definitions of two abstract classes that define the "essential" ingredients of a threejs scene:

- `src/threejs/abstract-scene/abstract-scene-manager.ts`
- `src/threejs/abstract-scene/abstract-scene-entity.ts`

The AbstractSceneManager class defines an abstract class with the essential properties and methods for creating, stopping, and starting a threejs scene. In `/src/threejs/scene-manager.ts` is defined a SceneManager class that extends the abstract scene. The idea here is that, in theory, you only need to modify the `scene-manager.ts` file in order to implement the details of your widget.

Likewise, in order to add entities to the scene in a controlled/systematic/updatable fashion, this repo provides a `SceneEntity` class that extends an abstract class with the essential ingredients that all such entities need. In theory, you will not need to modify the `abstract-scene-entity.ts` file. To add a new type of entity to the scene, you need to add a file to the dir containing several examples of entities already called `/src/threejs/scene-entities`.

This repo uses the convention that class methods and properties that are:

1. defined in the abstract classes, and
2. are not public

... begin with an underscore.
