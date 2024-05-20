
function export_func {
   # Usage: export_func export_env pid_from_psaux gitrepo_reset_to_root
   # They don't have to be `export -f` ed before calling this function
   if [[ -z "$1" ]]; then
     echo "Error: specify at least one function name as argument. Hint: run: 'delcare -f'" >&2
     exit 1
   fi

   # Create a regular expression pattern from the argument
   local fnames=$(printf " %s" "$@")
   _debug_echo "function names=$fnames"

   function _post_process {
      # awk '{print "export " $0}'
      awk '{print "" $0 ""}'
   }
   # Function attributes: "f" & "x"
   # * f:  functions, not env variables  # does not append the declare -fx
   # * x:  exported envs (and functions?):   `declare -x CC="/usr/bin/clang"` also functions
   # * fx: Would list all functions that are both declared and exported.
   # * none: both (but does not append the `declare -fx myfuncname` after each)

   #  "declare -fx pid_from_psaux" both declared and exported
   #      exported: making it available to child processes.

   # my_functions.source
   # source.myfunctions
   # source.env

   declare -f $fnames \
      | _post_process

}
export -f export_func

# [1] from /home/ephemssss/novorender/ifc2brep-0/scripts/bash-stub.bash
