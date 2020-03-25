for /R %~dp0.. %%f in (*.csproj) do dotnet build %%f

ECHO.Press any key to exit.
pause > nul