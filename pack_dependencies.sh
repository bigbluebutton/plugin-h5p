declare -a listOfLibraries=$(python3 scripts/list_libraries.py lib/libraries.json)

h5pCommand=$(which h5p)
if [ -f "$h5pCommand" ]; then
  mkdir temp

  cd temp
  # Fetching each h5p libraries
  for libraryUrl in $listOfLibraries; do
    libName=$(echo ${libraryUrl##*/})
    git clone $libraryUrl $libName
    cd $libName
    if [ -f "package.json" ]; then
      npm i
      npm run build
    fi
    cd ..
    h5p utils pack $libName "$libName.h5p"
    unzip "$libName.h5p"
    rm -rf $libName
    rm "$libName.h5p"
  done
  cd ..

  # Fetching h5p-standalone
  cd lib
  if [ ! -d h5p-standalone ]; then
    git clone https://github.com/bigbluebutton/h5p-standalone
  fi
  cd h5p-standalone
  npm install
  npm run build
  cd ../../
  cp -r lib/h5p-standalone/dist/* temp/
  
  # Now, packing everything
  echo "Packing libraries..."
  cd temp
  zip -r libraries.h5p .
  cd ..
  mv temp/libraries.h5p ./
  rm -rf temp
else
  echo "Please install the h5p command with (It might need super user permissions):"
  echo "    npm install -g h5p-cli"
  echo ""
fi
