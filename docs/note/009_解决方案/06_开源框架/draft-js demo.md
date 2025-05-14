---
slug: /note/draft-js-demo
title: draft-js demo
---
```jsx
import { Editor, EditorState, RichUtils } from "draft-js";
import React, { Component } from "react";

import "draft-js/dist/Draft.css";
export default class ExampleEditor extends Component {
  state = { editorState: EditorState.createEmpty() };

  onChange = (editorState) => {
    this.setState({ editorState });
  };

  setEditorRef = (editorRef) => (this.editorRef = editorRef);

 // 点击按钮，将选中的文本设置为加粗
  handleButtonClick = () => {
    const newState = RichUtils.toggleInlineStyle(
      this.state.editorState,
      "BOLD"
    );
    this.onChange(newState);
  };

  render() {
    const containerStyle = {
      border: "1px solid #ccc",
      padding: "1em",
      minHeight: "10em",
      cursor: "text"
    };

    return (
      <div style={containerStyle}>
        <button onClick={this.handleButtonClick}>bold</button>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Enter some text"
        />
      </div>
    );
  }
}

```
