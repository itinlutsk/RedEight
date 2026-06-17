#!/bin/bash
set -e

cd RedEight
dotnet restore --nologo
dotnet build --nologo --no-restore -c Release
