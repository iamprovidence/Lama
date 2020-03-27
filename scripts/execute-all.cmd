@ECHO off
IF NOT "%1"=="" GOTO :execute
ECHO "No params" 
PAUSE
GOTO :eof

:execute

setlocal enabledelayedexpansion enableextensions

SET commandName=%1

FOR /r %~dp0.. %%f IN (!commandName!.bat) DO (
	IF EXIST "%%f" (
		SET batFilePath="%%f"
		CALL :directory_from_full_path directoryPath !batFilePath!
		CD !directoryPath!
		START !commandName!.bat
	)
)
PAUSE

:directory_from_full_path <resultVar> <pathVar>
(
    set "%~1=%~dp2"
    exit /b
)

endlocal
