'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import yaml from 'js-yaml';
import * as vscode from 'vscode';
import TreeDataProvider from './TreeDataProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // tslint:disable-next-line:no-console
  console.log('Congratulations, your extension "l-yaml" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const openTextBeside = async () => {
    if (vscode.window.activeTextEditor) {
      const text = vscode.window.activeTextEditor.document.getText();
      vscode.window.registerTreeDataProvider('l-yaml-view-outline', new TreeDataProvider(context));
      const content = JSON.stringify(yaml.load(text));
      vscode.window.showTextDocument(
        await vscode.workspace.openTextDocument({
          content,
          language: 'plain'
        }),
        vscode.ViewColumn.Beside,
        true
      );
    }
  };
  const disposable = vscode.commands.registerCommand(
    'l-yaml.viewTree',
    openTextBeside
  );

  context.subscriptions.push(disposable);

  // disposable = vscode.window.onDidChangeTextEditorSelection(openTextBeside);

  // context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
  //
}
