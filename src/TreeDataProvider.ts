import yaml from 'js-yaml';
import * as vscode from 'vscode';
import TreeDataItem from './TreeDataItem';
export default class TreeDataProvider
  implements vscode.TreeDataProvider<TreeDataItem> {
  public onDidChangeTreeData?: vscode.Event<TreeDataItem>;

  private changeTreeDataEmitter: vscode.EventEmitter<TreeDataItem>;

  constructor(private context: vscode.ExtensionContext) {
    this.changeTreeDataEmitter = new vscode.EventEmitter<TreeDataItem>();
    this.onDidChangeTreeData = this.changeTreeDataEmitter.event;
    vscode.window.onDidChangeTextEditorSelection(e => {
      this.changeTreeDataEmitter.fire();
    });
  }
  public getTreeItem(
    element: TreeDataItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  public getChildren(
    element?: TreeDataItem
  ): vscode.ProviderResult<TreeDataItem[]> {
     if (element) {
      return null;
    } else {
      if (vscode.window.activeTextEditor) {
        const text = vscode.window.activeTextEditor.document.getText();
        const content = yaml.load(text) as any[];
        return content ? content.map(item => {
          return new TreeDataItem(
            item,
            vscode.TreeItemCollapsibleState.None,
            {
              command: 'l-yaml.viewTree',
              title: item
            },
            {
              dark: this.context.asAbsolutePath('assets/yaml.svg'),
              light: this.context.asAbsolutePath('assets/yaml.svg')
            }
          );
        }) : [];
      } else {
        return [];
      }
    }
  }
}
