---
slug: /note/eslint-vscode-configuration
title: eslint vscode 配置
---
![image.png](http://images.leyla.top/note/20250328170430991.png)

```
{
    "editor.tabSize": 2,
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit",
        "source.fixAll.eslint": "explicit"
    },
    "files.autoSave": "onWindowChange",
    "explorer.compactFolders": false,
    "[python]": {
        "diffEditor.ignoreTrimWhitespace": false,
        "gitlens.codeLens.symbolScopes": [
            "!Module"
        ],
        "editor.formatOnType": true,
        "editor.wordBasedSuggestions": "off"
    },
    "editor.formatOnSave": true,
    "editor.pasteAs.preferences": [],
    "editor.fontSize": 14,
    "eslint.useFlatConfig": false, // 关键配置
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.minimap.enabled": false
}
```
