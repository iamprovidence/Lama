for /R %~dp0.. %%f in (*.csproj) do dotnet restore %%f

ECHO.Press any key to exit.
pause > nul