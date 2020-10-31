import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: {
    class: LinkTool,
    config: {
      // endpoint: 'http://localhost:5000/api/articles',
    },
  },
  image: {
    class: Image,
    endpoints: {
      byFile: 'http://localhost:5000/article/upload',
      // Your backend file uploader endpoint
      byUrl: 'http://localhost:5000/article/upload',
      // Your endpoint that provides uploading by Url
    },
  },
  raw: Raw,
  header: {
    class: Header,
    config: {
      placeholder: 'Enter a header',
      levels: [2, 3, 4],
      defaultLevel: 3,
    },
  },
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
}
