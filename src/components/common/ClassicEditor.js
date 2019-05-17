"use strict";

import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import AutoformatPlugin from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import HeadingPlugin from "@ckeditor/ckeditor5-heading/src/heading";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
  EssentialsPlugin,
  AutoformatPlugin,
  BoldPlugin,
  ItalicPlugin,
  HeadingPlugin,
  ParagraphPlugin
];

ClassicEditor.defaultConfig = {
  toolbar: ["heading", "|", "bold", "italic"],

  // This value must be kept in sync with the language defined in webpack.config.js.
  language: "en"
};
