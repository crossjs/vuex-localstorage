set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # test
  npm run test

  # build
  rm -rf dist
  mkdir dist
  npm run build

  # commit
  git add -A
  git commit -m "* :tada: build $VERSION"
  npm version $VERSION --message "* :bookmark: bump $VERSION"

  # publish
  git push origin refs/tags/v$VERSION
  git push
  npm publish
fi
