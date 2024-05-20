
function export_env {
   # Usage: export_env DISPLAY WINEPREFIX WINEARCH

   # local stub_env_filename="env2.env"

   # Create a regular expression pattern from the argument
   # env_vars_rexpr
   local names_rexpr=$(printf "|%s" "$@")
   names_rexpr="^(${names_rexpr:1})="
   # '^(DISPLAY|WINEPREFIX|WINEARCH)='

   function _prepend_export {
      # Prepend 'export ' prefix to each line
      # awk '{print "export " $0}'
      sed 's/^/export /'
   }

   _debug_echo "names_rexpr=$names_rexpr"
   printenv \
      | grep -E "$names_rexpr" \
      | _prepend_export \
      # | tee $stub_env_filename \
      # | grep -E '^(DISPLAY|WINEPREFIX|WINEARCH)=' \
      :

}
export -f export_env

# [1] from /home/ephemssss/novorender/ifc2brep-0/scripts/bash-stub.bash
