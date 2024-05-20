
# gitrepo_reset_to_root
function gitrepo_root {
   # set "REPO_ROOT" env variable for you
   # Navigates to your main project directory
   # Sets directory context to the root of the git repository
   # git rev-parse --show-toplevel
   local _prev_dir_=$(pwd)
   local SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
   cd $SCRIPT_DIR # wrong, no point in exporting this!
   export REPO_ROOT=$(git rev-parse --show-toplevel)
   # cd $REPO_ROOT
   cd $_prev_dir_

   export REPO_ROOT

   # Without `export`, these wouldn't automatically become an environment variable visible to subprocesses unless explicitly exported
}
export -f gitrepo_root

# [1] from /home/ephemssss/novorender/ifc2brep-0/scripts/bash-stub.bash
