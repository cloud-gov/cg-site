# This script uses the cf cli to do the most basic provisioning of
# a new Cloud Foundry user.
USER_EMAIL=$1

# Strip the host portion of the email supplied.
USER_NAME="${USER_EMAIL%%@*}"
USER_ORG=$2

# Generate a password.
USER_PASS=`openssl rand -base64 15`

# What we expect to see back from the CLI.
RETURN_PASS='OK'
RETURN_FAIL='FAILED'
RETURN_EXISTS='already exists'

# Can't get users with cf and don't want to worry about having
# current uaac auth so just and try and create.
echo "Creating user:" $USER_EMAIL
RETURN_CREATE=`cf create-user $USER_EMAIL $USER_PASS`
if [[ $RETURN_CREATE =~ $RETURN_EXISTS ]]
then
  echo "User already exists"
elif [[ $RETURN_CREATE =~ $RETURN_PASS ]]
then
  echo "Success!"
  echo "New User:" $USER_EMAIL
  echo "Password:" $USER_PASS
else
  echo "Something's wrong" + $RETURN_CREATE
fi

# Target testing.
RETURN_TARGET=`cf target -o testing`
if [[ $RETURN_TARGET =~ $RETURN_FAIL ]]
then
  echo "Something went wrong!"
  echo $RETURN_TARGET
fi

# If the org doesn't exist, create it.
echo "Creating personal space:" $USER_NAME
if [[ ! `cf spaces` =~ $USER_NAME ]]
then
  cf create-space $USER_NAME
else
  echo "Space already exists."
fi 

# Set user permissions.
cf set-space-role $USER_EMAIL testing $USER_NAME SpaceDeveloper
cf set-space-role $USER_EMAIL testing $USER_NAME SpaceManager

# Create the org if supplied and give the user perms.
if [[ ! $USER_ORG == '' ]]
then
  # If the org doesn't exist, create it.
	echo "Creating org:" $USER_ORG
	if [[ ! `cf orgs` =~ $USER_ORG ]]
	then
	  cf create-org $USER_ORG
	else
	  echo "Org already exists."
	fi 
  
  # Make the user a manager. Should this add permissions to org spaces
  # as well?
  cf set-org-role $USER_EMAIL $USER_ORG OrgManager
fi