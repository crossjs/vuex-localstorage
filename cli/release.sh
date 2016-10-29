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
  VERSION=$VERSION npm run build

  # commit
  git add -A
  git commit -m "build $VERSION"
  npm version $VERSION --message "bump $VERSION"

  # publish
  git push
  npm publish
fi
