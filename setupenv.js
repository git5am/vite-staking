require("fs").writeFileSync("./.env", `REACT_APP_NAME=$npm_package_name
REACT_APP_VERSION=$npm_package_version

REACT_APP_NETWORKS=1
REACT_APP_DEFAULT_NETWORK=1
PUBLIC_URL=
REACT_APP_IS_DEV=false`)