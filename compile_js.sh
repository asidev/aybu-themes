#!/bin/bash

realpath=$(which realpath)
yuicompressor=$(which yui-compressor 2>/dev/null)
if [ $? -eq 1 ]; then
   yuicompressor=$(which yuicompressor 2>/dev/null)
   [ $? -eq 1 ] && echo "Error: you must install yuicompressor" && exit 1
fi

[ -z $realpath ] && echo "You need to install realpath." && exit 1

function compile() {
	script=$1
	#[ ! -e $script ] && return  #removed
	case $script in
		*min.js)
			continue ;;
		*)
			echo -e "\t* $script"
			$yuicompressor -o ${script/.js/.min.js} $script
			;;
	esac
}

function compile_all_in_dir() {
	dir=$1
	pushd $dir &> /dev/null
	rm -f *.min.js
	for js in *.js
	do
		[[ $js == "*Packed**" ]] && continue
		compile $js
	done
	popd &> /dev/null
}

root=$(dirname $(realpath $0))
pushd $root &>/dev/null

time_start=$(date +%s)
if [ -z $1 ]; then
	for script in $(hg st | grep ".js$" | cut -d' ' -f2)
	do
		compile $script
	done
elif [[ $1 == "all" ]]; then
	pushd $root/aybu/themes &>/dev/null
	for theme in *; do
		[ ! -d $root/aybu/themes/$theme/ ] && continue
		[[ $theme == "base" ]] && continue
		[ ! -d $root/aybu/themes/$theme/static/js ] && continue
		echo "Entering «$theme»"
		compile_all_in_dir $root/aybu/themes/$theme/static/js 
	done
	popd &>/dev/null
	pushd $root/aybu/themes/base/static/js &>/dev/null
	echo "Compiling base/admin js"
	base=$root/aybu/themes/base/static/js
	compile_all_in_dir $base
	compile_all_in_dir $base/filesmanager
	compile_all_in_dir $base/imagemanager
	compile_all_in_dir $base/mediacollection
	compile_all_in_dir $base/settings
	compile_all_in_dir $base/structure
	compile_all_in_dir $base/app
else
	echo "invalid mode «$1»"
fi
time_end=$(date +%s)
time_elapsed=$((time_end - time_start))
echo "Finished $(( time_elapsed / 60 ))m $(( time_elapsed % 60 ))s"
popd &>/dev/null
