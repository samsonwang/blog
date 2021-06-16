#!/bin/sh -e


NEEDED_PACKAGES="cl-lib let-alist org"

INIT_PACKAGE_EL="(progn \
  (require 'package) \
  (push '(\"melpa\" . \"https://melpa.org/packages/\") package-archives) \
  (package-initialize) \
  (unless package-archive-contents \
     (package-refresh-contents)) \
  (dolist (pkg '(${NEEDED_PACKAGES})) \
    (unless (package-installed-p pkg) \
      (package-install pkg))))"

echo "--emacs--"
emacs --version
emacs -Q -batch \
      --eval "$INIT_PACKAGE_EL"

echo "--python2--"
python --version

echo "--python3--"
python3 --version

echo "--install Nikola--"
pip3 install --upgrade Nikola[extras]

echo "--nikola--"
nikola --version

echo "--nikola build--"
nikola build
