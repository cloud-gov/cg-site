#!/bin/sh	

set -e	
set -x	

# build a list of files to ignore. This is purely to make commenting sane
file_ignore=""
# ignore blog posts, because we don't want to update them, maybe
file_ignore="/_site\/20\d\d/,${file_ignore}"
# ignore the index of blog posts, for the same reason
file_ignore="/_site\/updates\/page/,${file_ignore}"
# ignore the rotation docs. This should be temporary. These are more broken than I can fix right now.
file_ignore="/_site\/docs\/ops\/runbook\/rotating-/,${file_ignore}"

url_ignore=""
# ignore google docs because most require logging in
url_ignore="/docs.google.com/,${url_ignore}"
# ignore our vpn-only sites
url_ignore="/(ci|logs-platform|prometheus|alertmanager|grafana).fr.cloud.gov/,${url_ignore}"
# ignore private github repos
url_ignore="/github.com\/18[fF]\/security-incidents/,${url_ignore}"
# icann seems to block us
url_ignore="/icann.org/,${url_ignore}"
# nist also seems to block us
url_ignore="/nist.gov/,${url_ignore}"

npm install	
bundle install
npm run build --incremental
htmlproofer --file-ignore "${file_ignore}" --url-ignore "${url_ignore}" --alt-ignore "/.*/" _site
