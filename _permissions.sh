
# make all files group-readable and executable:
chmod -R g+rx ./*

# remove special attributes (like macOs sometimes adds) that can create issues on the server:
xattr -rc .

# make result folders writable for group:
chmod g+w  experiment # necessary so studylog can be written
chmod g+w  experiment/data
chmod g+w  experiment/dataSound


