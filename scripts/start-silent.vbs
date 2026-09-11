' WhatsAuto Silent Background Runner
' Runs the WhatsApp Automation server in the background with zero terminal windows

Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get project root directory
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectDir = fso.GetParentFolderName(scriptDir)

' Change directory to project root and run node server.js silently
WshShell.CurrentDirectory = projectDir
WshShell.Run "node server.js", 0, False

Set WshShell = Nothing
Set fso = Nothing
