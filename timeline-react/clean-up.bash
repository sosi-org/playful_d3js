#!/bin/bash
set -eux
export PS4="🗣️  "
# SCRIPT_DIR=$(dirname "${BASH_SOURCE[0]}")
# timeline-react/clean-up.bash
INCLUDES="$(dirname "${BASH_SOURCE[0]}")/../scripts"
echo "INCLUDES=$INCLUDES"
source $INCLUDES/gitrepo_root.bash
source $INCLUDES/export_env.bash
source $INCLUDES/export_func.bash

### MAIN ###
gitrepo_root

# clean
cd $REPO_ROOT/timeline-react
rm -rf node_modules
rm -rf .next
rm -f package-lock.json

# and run?
npm install
npm run dev

# The end
exit 0

function export_common_essentials {
   echo "dont run this"
   exit 4
   # OUTPUTFILEN=$(mktemp)
   OUTPUTFILEN="env_common.env"

   cp /dev/null $OUTPUTFILEN
   echo "# env variables" >> $OUTPUTFILEN
   export_env >> $OUTPUTFILEN \
      SCRIPT_DIR REPO_ROOT
      # no point in saving "INCLUDES"

   echo >> $OUTPUTFILEN
   echo "# functions" >> $OUTPUTFILEN

   export_func  >> $OUTPUTFILEN \
      export_env gitrepo_reset_to_root

   # pid_from_psaux
   cat $OUTPUTFILEN
}

