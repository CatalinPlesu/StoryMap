.PHONY: publish

publish:
	rm -rf ./publish
	dotnet publish -c Release -r linux-x64 --self-contained true -o ./publish/linux
	cd ./publish && zip -r linux.zip linux
	dotnet publish -c Release -r win-x64 --self-contained true -o ./publish/windows
	cd ./publish && zip -r windows.zip windows
