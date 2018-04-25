// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const changeCase = require('change-case');

/**
 *
 * @param {*} window
 */
function formatCaseTemplate(doc) {
  // The template string to detect case
  const caseTemplateRegex = /<case((?::[a-z]+)+)>(.+?)<\/case>/g;

  return doc.replace(caseTemplateRegex, (match, caseStringsMatch, text) => {
    // The rest is case strings
    const caseStrings = caseStringsMatch.split(':');

    // Transform the text into the cases defined
    const newText = caseStrings.reduce((transformedText, strCase) => {
      // Skip empty string
      if (!strCase) return transformedText;

      // Update the case of the text by calling the method that has the same name in changeCase module
      return changeCase[strCase].call(changeCase, transformedText);
    }, text);
    return newText;
  });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "format-case-template" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerTextEditorCommand(
    'extension.formatCaseTemplating',
    () => {
      const editor = vscode.window.activeTextEditor;
      const doc = editor.document;

      // Edit the document
      editor.edit((edit) => {
        const text = doc.getText();

        // Format case
        const newText = formatCaseTemplate(text);

        // Get the range of the whole document
        const fullRange = new vscode.Range(doc.positionAt(0), doc.positionAt(text.length - 1));

        // Replace the whole document with the new text
        edit.replace(fullRange, newText);
      });
    },
  );
  context.subscriptions.push(disposable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

exports.formatCaseTemplate = formatCaseTemplate;
