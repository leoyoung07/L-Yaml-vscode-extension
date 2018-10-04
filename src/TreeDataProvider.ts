import * as vscode from 'vscode';
import TreeDataItem from './TreeDataItem';
export default class TreeDataProvider implements vscode.TreeDataProvider<TreeDataItem> {
  public onDidChangeTreeData?: vscode.Event<TreeDataItem>;

  constructor(
    private context: vscode.ExtensionContext
  ) {

  }
  public getTreeItem(
    element: TreeDataItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }
  public getChildren(
    element?: TreeDataItem
  ): vscode.ProviderResult<TreeDataItem[]> {
    return [
      new TreeDataItem(
        'Todo List',
        vscode.TreeItemCollapsibleState.None, {
        command: 'l-yaml.viewTree',
        title: 'Todo List'
      }, {
        dark: this.context.asAbsolutePath('assets/yaml.svg'),
        light: this.context.asAbsolutePath('assets/yaml.svg')
      })
    ];
  }
}
