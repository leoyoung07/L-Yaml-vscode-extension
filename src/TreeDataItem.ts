import * as vscode from 'vscode';
export default class TreeDataItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
    public readonly iconPath?: string | vscode.Uri | { light: string | vscode.Uri; dark: string | vscode.Uri }
  ) {
    super(label, collapsibleState);
  }

}
