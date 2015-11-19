# State Buddy

Adds state management directly to Chrome

![Preview](./docs/console-admin-preview-small.gif?at=master&raw)

## User Installation

1. Download the `.crx` file

2. Open Chrome Extension Manager

3. Find the downloaded `.crx` file in Finder

4. Drag the `.crx` file over Chrome and into the Extension Manager

## Developer Installation

1. Clone the source

	```bash
	git clone ssh://git@stash.corp.appnexus.com:7999/~tsanteford/state-buddy.git
	```

2. Build the extension by typing the following in the project root:

	```bash
	gulp build
	```

3. Open Chrome Extension Manager

4. Click "Load unpacked extension"

5. Navigate to the project root folder and select the `build` folder.

## Developing

Once installed in Chrome run the following command to auto build changes:

```bash
gulp dev
```

Changes will be reloaded in Chrome everytime the extension is dropped down in the UI and or `cmd-r` is pressed while inspecting the source.

Note: Some files, such as the manifest, popup.html, and img folder, will not auto update and `gulp dev` will need to be restarted manually when those change.
