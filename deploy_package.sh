if [ -f libraries.h5p ]; then
  if [ -d /var/www/bigbluebutton-default/assets/plugins/h5p ]; then
    sudo cp -r /var/www/bigbluebutton-default/assets/plugins/h5p /var/www/bigbluebutton-default/assets/plugins/h5p-backup
    sudo rm -rf /var/www/bigbluebutton-default/assets/plugins/h5p
  fi 
  sudo mkdir -p /var/www/bigbluebutton-default/assets/plugins/h5p
  sudo cp libraries.h5p /var/www/bigbluebutton-default/assets/plugins/h5p
  cd /var/www/bigbluebutton-default/assets/plugins/h5p/
  sudo unzip libraries.h5p
  sudo rm libraries.h5p
else
  echo "No libraries.h5p found, either download one, or make one via the following command:"
  echo "    ./pack_dependencies.sh"
fi
