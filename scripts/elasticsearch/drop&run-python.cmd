REM drop python file on this script to run it
REM multiple files are allowed

@ECHO off

:loop
	FOR %%a IN (%*) DO python %%a
	
	PAUSE
	CLS
GOTO loop