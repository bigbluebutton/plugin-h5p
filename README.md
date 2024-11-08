# H5P Plugin

Contents:
- [Running the Plugin from Source](#running-the-plugin-from-source);
- [Building and installing the Plugin](#building-and-installing-the-plugin);
- [How to use the plugin?](#how-to-use-it);


## What is it?

What it does is basically expand type of activities that Bigbluebutton supports by adding H5P into them.

Moreover, this plugin has its specific libraries to properly render the h5p-content, so pay attention to the instructions ahead.

### Currently supported activities:

- Crossword Puzzle (https://github.com/otacke/h5p-crossword);
- Drag-and-drop (https://github.com/h5p/h5p-drag-n-drop);


## Running the Plugin from Source

1. Build and deploy necessary libraries (make sure this is done inside the BBB's docker server):

```bash
cd $HOME/src/h5p-plugin # Directory under which this plugin is placed in your computer. 
./pack_dependencies.sh # This will fetch every library this plugin needs
./deploy_package.sh
```

These few lines will prepare the environment.

After you done that, if you run the following command:

```bash
ls /var/www/bigbluebutton-default/assets/plugins/h5p/
```

you should get:

```log
FontAwesome-4.5		     H5P.Question-1.5		  cypress.config.d.ts
H5P.AdvancedText-1.1	     H5P.Transition-1.0		  fonts
H5P.Crossword-0.6	     H5PEditor.ColorSelector-1.3  frame.bundle.js
H5P.DragNBar-1.5	     H5PEditor.DragQuestion-1.10  frame.js.map
H5P.DragNDrop-1.1	     H5PEditor.RangeList-1.0	  jQuery.ui-1.10
H5P.DragNResize-1.2	     H5PEditor.ShowWhen-1.0	  main.bundle.js
H5P.DragQuestion-1.14	     H5PEditor.TableList-1.0	  main.js.map
H5P.FontIcons-1.0	     H5PEditor.VerticalTabs-1.3   src
H5P.Image-1.1		     H5PEditor.Wizard-1.2	  styles
H5P.JoubelUI-1.3	     assets
H5P.MaterialDesignIcons-1.0  content
```

Or something similar.

2. Start the development server (outside of the BBB's docker server):

```bash
cd $HOME/bbb/bigbluebutton/h5p-plugin
npm install
npm start
```

3. Send create call with the following parameter:

```
pluginManifests=[{"url":"http://172.17.0.1:4701/manifest.json"}]
```

## Building and installing the Plugin

To build the plugin for production use, follow these steps:

1. Build and deploy necessary libraries (make sure this is done inside the BBB's server):

```bash
cd $HOME/src/h5p-plugin # Directory under which this plugin is placed in your computer. 
./pack_dependencies.sh # This will fetch every library this plugin needs
./deploy_package.sh
```

2. Build and deploy the plugin itself:

```bash
cd $HOME/src/h5p-plugin
npm install
npm run build-bundle
```

The above commands will generate the `dist` folder containing the bundled JavaScript file named `H5pPlugin.js`. This file can be hosted on any HTTPS server.

Preferebly, that bundled js file is placed into the Bigbluebutton's assets portion of the server, so for that, do the following: 

```bash
mkdir -p /var/www/bigbluebutton-default/assets/plugins/plugin-h5p/
cp H5pPlugin.js /var/www/bigbluebutton-default/assets/plugins/plugin-h5p/
```

This will make this plugin available on `https://<your-host>/plugins/plugin-h5p/H5pPlugin.js`

To use the plugin with BigBlueButton, add the plugin's manifest URL to the parameter as shown below:

```
pluginManifests=[{"url":"http://<yourdomain>/path/to/manifest.json"}]
```

## How to use it?

Once it is inside your server and all the settings are correctly placed, it is already running in any meeting you create. But there are a couple of things you need to pay attention when running this plugin, so here I will let a step-by-step on how to properly run the activity:

### Prepare a presentation

The basic concept is that the H5P activity will be placed inside a presentation, and once the plugin reads the presentation, it will make a button available for you to play the H5P activity. So a question that arises: "How can I prepare a presentation to render the H5P?".

1. Get a `.h5p` archive:

The `.h5p` archive is available for you to download whenever you create an h5p activity. One way to do this is:
- Go to https://h5p.org/ (or a Learning Management System that supports H5P activity creation like self-hosted moodle or Drupal. I will follow the steps from `h5p.org`);
- Log into your account or create a new one;
- If you have some activities already, click on any of them (and jump to later instructions with a "*"), if you don't have click "Try out H5P";
- On the H5P activity creation page select you activity type, which in our case is Crossword (But you can choose any of the supported ones here in the Bigbluebutton integration, see section [Currently supported activities](#currently-supported-activities));
- Create your activity;
- *Once the activity is created, open it and you'll see on the bottom of it two buttons: "Reuse" and "Embed", click the "Reuse" one and click to download it.

Done, there you have the `.h5p` archive.

2. Build the Activity JSON:

Once you have the `.h5p` archive in hands, just unzip it and you'll see a folder in which there are a lot of files and folders.
Inside the unzipped folder, search for 2 files:

- `h5p.json`;
- `content/content.json`;

Copy the contents of those 2 files and create a JSON in the following structure:
```JSON
{
  "contentAsJson": {}, // <Paste here the content of the second file, i.e. `content/content.json`> 
  "h5pAsJson": {} // <Paste here the content of the first file, i.e. `h5p.json`> 
}
```

You now have the activity json, to finish up, prepend the word `H5P` to this content you just created, the end result should look something like:

```JSON
H5P{
  "contentAsJson": {}, // <Paste here the content of the second file, i.e. `content/content.json`> 
  "h5pAsJson": {} // <Paste here the content of the first file, i.e. `h5p.json`> 
}
```

Copy all that string and store it somewhere.

3. Create the presentation:

Now create a `.pptx` and within a slide of your choice, paste the content you create on the previous item (this slide can have other stuff written in it, but we advise you to just keep it to a title and this content).

Done, you have the prepared presentation.

We highly recommend to already convert to `.pdf` since it is a more stable format.

### Play an activity

1. Play around:

With that presentation in hands, just upload it to Bigbluebutton and go to the prepared slide, you'll see a button labeled "Play H5P" on the toolbar of the presentation (bottom of the presentation). When you click that button you'll have the activity running for any non-presenter user.

2. Minor detail:

There are some activities that need assets such as images and videos, which come insed of the `.h5p` archive under the `content/` directory, for instance, `content/images` (Drag-and-drop is one of them). If that's the case for you, you need to copy all those asset files over to `/var/www/bigbluebutton-default/assets/plugins/h5p/content/`, so for instance:

```bash
cp -r content/images /var/www/bigbluebutton-default/assets/plugins/h5p/content/
```



